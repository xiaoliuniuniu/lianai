// Supabase配置 - 使用你的实际信息
const SUPABASE_URL = 'https://mlcvmeqferbrxgtcayvq.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1sY3ZtZXFmZXJicnhndGNheXZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI1ODM1MDMsImV4cCI6MjA3ODE1OTUwM30._zFyRhFhVLRhW0aP830pTYcNJyoJqlPWAEhONpLR5rk';
const supabase = window.supabase ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;

// 测试逻辑 - 恋爱脑测试
class TestLogic {
    constructor() {
        this.currentIndex = 0;
        this.totalScore = 0;
        this.questions = [];
        this.answers = [];
        this.times = [];
        this.categoryScores = {};
        this.categoryCounts = {};
        this.categories = ["情感依赖", "自我价值", "边界意识", "冲突处理", "关系投入", "理想化程度", "牺牲倾向", "嫉妒心理", "关系焦虑"];
        this.anonymousUserId = this.getOrCreateAnonymousId();
        
        this.initializeCategories();
        this.bindEvents();
        
        // 新增：测试DeepSeek API连接（页面加载时自动测试）
        this.testDeepSeekConnection();
    }

    // 新增：测试DeepSeek API连接的方法
    async testDeepSeekConnection() {
        console.log('🧪 开始测试DeepSeek API连接...');
        
        // 请将 '你的API密钥' 替换为你的真实DeepSeek API密钥
        const api = new DeepSeekAPI('sk-c4b18ec8d5234f4aa8d78c9f8ade4727');
        
        try {
            const result = await api.testConnection();
            if (result) {
                console.log('✅ DeepSeek API连接成功:', result);
                // 在页面上显示连接状态（可选）
                this.showAPIConnectionStatus('success', 'DeepSeek API连接成功！');
            } else {
                console.log('❌ DeepSeek API连接失败');
                this.showAPIConnectionStatus('error', 'DeepSeek API连接失败，将使用本地模板');
            }
        } catch (error) {
            console.log('❌ DeepSeek API测试出错:', error);
            this.showAPIConnectionStatus('error', 'API测试出错: ' + error.message);
        }
    }

    // 新增：显示API连接状态（可选功能）
    showAPIConnectionStatus(type, message) {
        // 只在开发时显示，正式版本可以移除
        if (console && console.log) {
            console.log(`API状态 [${type}]: ${message}`);
        }
    }

    // 初始化分类分数
    initializeCategories() {
        this.categories.forEach(c => {
            this.categoryScores[c] = 0;
            this.categoryCounts[c] = 0;
        });
    }

    // 绑定事件
    bindEvents() {
        document.getElementById('start-btn').addEventListener('click', () => {
            this.startTest();
        });

        document.getElementById('restart-btn').addEventListener('click', () => {
            this.restartTest();
        });
    }

    // 生成或获取匿名用户ID
    getOrCreateAnonymousId() {
        let anonymousId = localStorage.getItem('anonymous_user_id');
        if (!anonymousId) {
            anonymousId = 'anon_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('anonymous_user_id', anonymousId);
        }
        return anonymousId;
    }

    // 提交用户数据到Supabase - 修复版
    async submitUserData(resultData, personalizedResult) {
        // 检查Supabase是否可用
        if (!supabase) {
            console.log('Supabase未配置，跳过数据提交');
            return;
        }
        
        // 确保数据格式正确
        const submitData = {
            anonymous_id: this.anonymousUserId,
            browser_fingerprint: navigator.userAgent + '|' + navigator.language + '|' + screen.width + 'x' + screen.height,
            total_score: resultData.scores.normalizedTotalScore,
            level: personalizedResult.level,
            answers: JSON.stringify(this.answers), // 明确转换为JSON字符串
            category_scores: JSON.stringify(resultData.categoryAverages), // 明确转换为JSON字符串
            time_patterns: JSON.stringify(this.times), // 明确转换为JSON字符串
            test_duration: Math.round(this.times.reduce((a, b) => a + b, 0)),
            created_at: new Date().toISOString()
        };
        
        try {
            console.log('准备提交数据到Supabase:', submitData);
            
            const { data, error } = await supabase
                .from('test_results')
                .insert([submitData])
                .select(); // 添加select()来获取返回数据
            
            if (error) {
                console.error('❌ 数据提交失败:', error);
                console.error('错误详情:', error.message);
            } else {
                console.log('✅ 数据提交成功!');
                console.log('返回数据:', data);
                console.log('数据已存储到Supabase，ID:', data[0]?.id);
            }
        } catch (error) {
            console.log('❌ 数据提交异常:', error);
        }
    }

    // 开始测试
    startTest() {
        // 随机选择题目
        this.questions = [...questionPool].sort(() => Math.random() - 0.5).slice(0, 45);
        
        // 切换到测试页面
        document.getElementById('intro-section').classList.remove('active');
        document.getElementById('test-section').classList.add('active');
        
        // 重置所有数据
        this.currentIndex = 0;
        this.totalScore = 0;
        this.answers = [];
        this.times = [];
        this.initializeCategories();
        
        // 显示第一题
        this.showQuestion();
    }

    // 重新测试
    restartTest() {
        document.getElementById('result-section').classList.remove('active');
        document.getElementById('intro-section').classList.add('active');
        document.getElementById('progress').style.width = '0%';
        document.getElementById('progress-text').textContent = '0%';
        
        // 安全销毁雷达图
        if (window.radarChart && typeof window.radarChart.destroy === 'function') {
            window.radarChart.destroy();
            window.radarChart = null;
        }
    }

    // 显示题目
    showQuestion() {
        if (this.currentIndex >= this.questions.length) {
            this.showResult();
            return;
        }
        
        const startTime = Date.now();
        const q = this.questions[this.currentIndex];
        
        // 构建题目HTML
        document.getElementById('test-section').innerHTML = `
            <div class="question">
                <div class="question-number">问题 ${this.currentIndex + 1}/${this.questions.length} · ${q.category}</div>
                <h3>${q.question}</h3>
                <div class="options">
                    ${q.options.map((o, index) => `
                        <div class="option" data-score="${o.score}" data-index="${index}">
                            <div class="option-marker"></div>
                            <div class="option-text">${o.text}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="navigation">
                <button class="btn" id="prev-btn" ${this.currentIndex === 0 ? 'disabled' : ''}>上一题</button>
                <button class="btn" id="next-btn" disabled>${this.currentIndex === this.questions.length - 1 ? '查看结果' : '下一题'}</button>
            </div>
        `;
        
        // 绑定选项点击事件
        this.bindOptionEvents(startTime);
        
        // 绑定导航按钮事件
        this.bindNavigationEvents();
        
        // 更新进度条
        this.updateProgress();
    }

    // 绑定选项点击事件
    bindOptionEvents(startTime) {
        document.querySelectorAll('.option').forEach(opt => {
            opt.addEventListener('click', () => {
                // 移除其他选项的选中状态
                document.querySelectorAll('.option').forEach(o => o.classList.remove('selected'));
                // 选中当前选项
                opt.classList.add('selected');
                // 启用下一题按钮
                document.getElementById('next-btn').disabled = false;
            });
        });
    }

    // 绑定导航按钮事件
    bindNavigationEvents() {
        // 上一题按钮
        document.getElementById('prev-btn').addEventListener('click', () => {
            this.goToPreviousQuestion();
        });

        // 下一题按钮
        document.getElementById('next-btn').addEventListener('click', () => {
            this.goToNextQuestion();
        });
    }

    // 前往上一题
    goToPreviousQuestion() {
        if (this.currentIndex > 0) {
            // 移除上一题的记录
            this.times.pop();
            const lastScore = this.answers.pop();
            this.totalScore -= lastScore;
            
            // 更新分类分数
            const prevCat = this.questions[this.currentIndex - 1].category;
            this.categoryScores[prevCat] -= lastScore;
            this.categoryCounts[prevCat]--;
            
            this.currentIndex--;
            this.showQuestion();
        }
    }

    // 前往下一题
    goToNextQuestion() {
        const selectedOption = document.querySelector('.option.selected');
        if (selectedOption) {
            const score = parseInt(selectedOption.dataset.score);
            
            // 记录时间和答案
            this.times.push(Date.now() - (window.currentQuestionStartTime || Date.now()));
            this.totalScore += score;
            this.answers.push(score);
            
            // 更新分类分数
            const currentCat = this.questions[this.currentIndex].category;
            this.categoryScores[currentCat] += score;
            this.categoryCounts[currentCat]++;
            
            this.currentIndex++;
            this.showQuestion();
        }
    }

    // 更新进度
    updateProgress() {
        const progress = (this.currentIndex / this.questions.length) * 100;
        document.getElementById('progress').style.width = `${progress}%`;
        document.getElementById('progress-text').textContent = `${Math.round(progress)}%`;
        
        // 记录当前题目开始时间
        window.currentQuestionStartTime = Date.now();
    }

    // 显示结果
    showResult() {
        // 切换到结果页面
        document.getElementById('test-section').classList.remove('active');
        document.getElementById('result-section').classList.add('active');
        
        // 计算各项分数
        const resultData = this.calculateResults();
        
        // 使用千人千面引擎生成个性化结果
        const engine = new PersonalizationEngine();
        const personalizedResult = {
            level: engine.getLevel(resultData.scores.normalizedTotalScore),
            interpretation: engine.getInterpretation(resultData.scores.normalizedTotalScore, this.times, this.answers),
            analysis: engine.getAnalysis(resultData.scores.categoryAverages),
            solutions: engine.getSolutions(resultData.scores.normalizedTotalScore, resultData.scores.categoryAverages, engine.userProfile)
        };
        
        // 显示结果
        this.displayResults(resultData, personalizedResult);
        
        // 创建雷达图
        this.createRadarChart(resultData.categoryAverages);
        
        // 提交数据到Supabase（异步，不阻塞用户）
        this.submitUserData(resultData, personalizedResult);
        
        // 更新进度条到100%
        document.getElementById('progress').style.width = '100%';
        document.getElementById('progress-text').textContent = '100%';
    }

    // 计算结果数据
    calculateResults() {
        const categoryAverages = {};
        const categoryMap = {
            '情感依赖': 'dependency',
            '自我价值': 'selfworth', 
            '边界意识': 'boundary',
            '冲突处理': 'conflict',
            '关系投入': 'investment',
            '理想化程度': 'idealization',
            '牺牲倾向': 'sacrifice',
            '嫉妒心理': 'jealousy',
            '关系焦虑': 'anxiety'
        };
        
        // 计算每个维度的平均分（归一化到0-100）
        for (const [chineseName, englishName] of Object.entries(categoryMap)) {
            const count = this.categoryCounts[chineseName];
            const score = this.categoryScores[chineseName] || 0;
            
            if (count > 0) {
                // 归一化计算：(实际得分 - 最小可能得分) / (最大可能得分 - 最小可能得分) * 100
                const normalized = ((score - count) / (count * 3)) * 100;
                categoryAverages[englishName] = Math.min(100, Math.max(0, Math.round(normalized)));
            } else {
                categoryAverages[englishName] = 25; // 默认值
            }
        }

        // 计算总分（归一化到0-100）
        const normalizedTotal = Math.min(100, Math.max(0, Math.round(((this.totalScore - this.questions.length) / (this.questions.length * 3)) * 100)));
        
        // 计算百分位
        const percentile = this.calculatePercentile(normalizedTotal);
        
        return {
            scores: {
                categoryAverages: categoryAverages,
                normalizedTotalScore: normalizedTotal
            },
            percentile: percentile,
            categoryAverages: categoryAverages
        };
    }

    // 计算百分位
    calculatePercentile(score) {
        // 使用逻辑函数计算百分位，确保在1-99之间
        return Math.min(99, Math.max(1, 50 + 50 * (1 - Math.exp(-0.8 * Math.abs((score - 50) / 15))) * ((score > 50) ? 1 : -1)));
    }

    // 显示结果
    displayResults(resultData, personalizedResult) {
        // 更新总分和百分位
        document.getElementById('score-value').textContent = resultData.scores.normalizedTotalScore;
        document.getElementById('main-score').textContent = resultData.scores.normalizedTotalScore;
        document.getElementById('percentile-value').textContent = Math.round(resultData.percentile);
        
        // 更新等级和解释
        document.getElementById('result-level').textContent = personalizedResult.level;
        document.getElementById('score-interpretation').textContent = personalizedResult.interpretation;
        
        // 更新维度分析
        this.updateDimensionAnalysis(personalizedResult.analysis);
        
        // 更新进度条和数值显示
        this.updateScoreBars(resultData.categoryAverages);
        
        // 更新解决方案
        this.updateSolutions(personalizedResult.solutions);
    }

    // 更新维度分析
    updateDimensionAnalysis(analysis) {
        const dimensions = ['dependency', 'selfworth', 'boundary', 'conflict', 'investment', 'idealization', 'sacrifice', 'jealousy', 'anxiety'];
        
        dimensions.forEach(dimension => {
            const element = document.getElementById(`${dimension}-analysis`);
            if (element && analysis[dimension]) {
                element.textContent = analysis[dimension];
            }
        });
    }

    // 更新分数条和数值显示
    updateScoreBars(categoryAverages) {
        const dimensions = ['dependency', 'selfworth', 'boundary', 'conflict', 'investment', 'idealization', 'sacrifice', 'jealousy', 'anxiety'];
        
        dimensions.forEach(dimension => {
            const score = categoryAverages[dimension] || 0;
            const displayValue = (score / 20).toFixed(1);
            
            // 更新进度条
            const barElement = document.getElementById(`${dimension}-bar`);
            if (barElement) {
                barElement.style.width = `${score}%`;
            }
            
            // 更新数值显示
            const valueElement = document.getElementById(`${dimension}-value`);
            if (valueElement) {
                valueElement.textContent = displayValue;
            }
            
            // 更新百分比显示
            const percentElement = document.getElementById(`${dimension}-percent`);
            if (percentElement) {
                percentElement.textContent = `(${score}%)`;
            }
        });
    }

    // 更新解决方案
    updateSolutions(solutions) {
        const solutionList = document.getElementById('solution-list');
        if (solutionList) {
            solutionList.innerHTML = solutions.map(solution => {
                const [title, desc] = solution.split('：');
                return `
                    <div class="solution-item">
                        <h4>${title}</h4>
                        <p>${desc}</p>
                    </div>
                `;
            }).join('');
        }
    }

    // 创建雷达图
    createRadarChart(categoryAverages) {
        // 安全地销毁之前的图表
        if (window.radarChart && typeof window.radarChart.destroy === 'function') {
            window.radarChart.destroy();
            window.radarChart = null;
        }

        const yourScores = Object.values(categoryAverages).map(score => score / 20);
        const centerValue = Math.round(yourScores.reduce((a, b) => a + b, 0) / yourScores.length * 20);
        
        // 生成对比数据（模拟其他用户数据）
        const comparisonScores = yourScores.map(score => 
            Math.max(0.5, Math.min(4.5, score + (Math.random() - 0.5) * 0.8))
        );
        
        // 更新中心标签
        document.getElementById('centerLabel').textContent = `L: ${centerValue}%`;
        
        // 创建雷达图
        const radarLabels = ['情感依赖','自我价值','边界意识','冲突处理','关系投入','理想化程度','牺牲倾向','嫉妒心理','关系焦虑'];
        const ctx = document.getElementById('radarChart');
        
        // 检查Canvas元素是否存在
        if (!ctx) {
            console.error('找不到雷达图Canvas元素');
            return;
        }
        
        // 检查Chart.js是否已加载
        if (typeof Chart === 'undefined') {
            console.error('Chart.js未正确加载');
            return;
        }
        
        try {
            window.radarChart = new Chart(ctx, {
                type: 'radar',
                data: {
                    labels: radarLabels,
                    datasets: [{
                        label: '你的排名',
                        data: comparisonScores,
                        backgroundColor: 'rgba(54, 162, 235, 0.15)',
                        borderColor: 'rgb(54, 162, 235)',
                        borderWidth: 2,
                        pointBackgroundColor: 'rgb(54, 162, 235)',
                        pointBorderColor: '#fff',
                        pointRadius: 3,
                        order: 2
                    }, {
                        label: '你的分数',
                        data: yourScores,
                        backgroundColor: 'rgba(255, 99, 132, 0.15)',
                        borderColor: 'rgb(255, 99, 132)',
                        borderWidth: 2.5,
                        pointBackgroundColor: 'rgb(255, 99, 132)',
                        pointBorderColor: '#fff',
                        pointRadius: 3,
                        order: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    scales: {
                        r: {
                            beginAtZero: true,
                            min: 0,
                            max: 5,
                            ticks: {
                                stepSize: 1,
                                backdropColor: 'transparent',
                                color: '#999',
                                font: { size: 10 },
                                callback: value => Math.round((value / 5) * 100) + '%'
                            },
                            grid: { color: 'rgba(0,0,0,0.08)', circular: true },
                            pointLabels: { 
                                font: { size: 12, weight: '500' }, 
                                color: '#333', 
                                padding: 8 
                            }
                        }
                    },
                    plugins: {
                        legend: { display: false },
                        tooltip: {
                            callbacks: {
                                label: context => 
                                    `${context.dataset.label}: ${context.parsed.r.toFixed(1)} (${Math.round((context.parsed.r / 5) * 100)}%)`
                            }
                        }
                    }
                }
            });
        } catch (error) {
            console.error('创建雷达图失败:', error);
        }
    }
}

// 页面加载完成后初始化测试逻辑
document.addEventListener('DOMContentLoaded', function() {
    // 初始化测试逻辑
    window.testLogic = new TestLogic();
    
    // 确保Chart.js已加载
    if (typeof Chart !== 'undefined') {
        console.log('Chart.js loaded successfully');
    } else {
        console.error('Chart.js not loaded');
    }
});
