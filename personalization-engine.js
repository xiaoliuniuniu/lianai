// 完整的千人千面引擎 - 优化修复版
class PersonalizationEngine {
    constructor() {
        this.usedContent = new Map();
        this.userProfile = this.generateDetailedProfile();
        this.sessionId = this.generateSessionId();
        this.deepSeekAPI = new DeepSeekAPI('sk-c4b18ec8d5234f4aa8d78c9f8ade4727');
    }

    // 生成详细用户画像
    generateDetailedProfile() {
        return {
            gender: Math.random() > 0.5 ? 'male' : 'female',
            ageGroup: ['18-22', '23-27', '28-35', '36-45', '46+'][Math.floor(Math.random() * 5)],
            relationshipStatus: ['single', 'dating', 'married', 'divorced', 'complicated'][Math.floor(Math.random() * 5)],
            personalityType: ['thinker', 'feeler', 'balanced', 'intuitive', 'practical'][Math.floor(Math.random() * 5)],
            emotionalStyle: ['reserved', 'expressive', 'balanced', 'sensitive', 'stoic'][Math.floor(Math.random() * 5)],
            conflictStyle: ['avoidant', 'confrontational', 'compromising', 'collaborative', 'adaptive'][Math.floor(Math.random() * 5)],
            careerStage: ['student', 'early-career', 'mid-career', 'established', 'retired'][Math.floor(Math.random() * 5)],
            socialActivity: ['low', 'medium', 'high', 'very-high', 'extreme'][Math.floor(Math.random() * 5)],
            relationshipHistory: ['inexperienced', 'few', 'moderate', 'experienced', 'very-experienced'][Math.floor(Math.random() * 5)],
            attachmentStyle: ['secure', 'anxious', 'avoidant', 'disorganized', 'balanced'][Math.floor(Math.random() * 5)]
        };
    }

    // 从数组中随机选择内容，避免重复
    selectContent(array, type) {
        if (!array || array.length === 0) return '';
        const used = this.usedContent.get(type) || [];
        const available = array.filter(item => !used.includes(item));
        
        if (available.length === 0) {
            this.usedContent.set(type, []);
            return array[Math.floor(Math.random() * array.length)];
        }
        
        const selected = available[Math.floor(Math.random() * available.length)];
        used.push(selected);
        this.usedContent.set(type, used);
        return selected;
    }

    // 等级名称模板
    getLevel(score) {
        const levels = [
            '青铜级',    // 0-16分
            '白银级',    // 17-33分  
            '黄金级',    // 34-50分
            '钻石级',    // 51-66分
            '至尊级',    // 67-83分
            '王者级',    // 84-100分
        ];
        
        if (score <= 16) return levels[0];
        if (score <= 33) return levels[1];
        if (score <= 50) return levels[2];
        if (score <= 66) return levels[3];
        if (score <= 83) return levels[4];
        return levels[5];
    }

    // AI生成解释部分 - 优化版
    async getInterpretation(score, times, answers) {
        try {
            console.log('🤖 开始AI生成个性化解读...');
            
            const prompt = this.generateInterpretationPrompt(
                { normalizedTotalScore: score },
                this.userProfile,
                times,
                answers
            );

            const messages = [
                { 
                    role: "system", 
                    content: "你是一位专业的心理学专家，请用简洁温暖的语言为用户提供情感关系建议。回复控制在100字左右，直接给出分析建议，不要客套话。" 
                },
                { role: "user", content: prompt }
            ];

            const aiContent = await this.deepSeekAPI.callDeepSeekAPI(messages);
            
            if (aiContent) {
                console.log('✅ AI解读生成成功');
                // 确保内容简洁
                return this.ensureShortContent(aiContent, 100);
            } else {
                throw new Error('AI生成失败');
            }
        } catch (error) {
            console.log('❌ AI解读生成失败，使用本地模板:', error);
            return this.getLocalInterpretation(score, times, answers);
        }
    }

    // 生成简洁的解读提示词
    generateInterpretationPrompt(scoreData, userProfile, times, answers) {
        const avgTime = times && times.length > 0 ? times.reduce((a,b)=>a+b,0)/times.length : 5000;
        let speedDesc = '思考节奏';
        if (avgTime < 2000) speedDesc = '快速直觉型';
        else if (avgTime < 4000) speedDesc = '平衡思考型';
        else speedDesc = '谨慎分析型';

        return `用户得分：${scoreData.normalizedTotalScore}/100，${speedDesc}。
用户特征：${userProfile.gender === 'male' ? '男性' : '女性'}，${userProfile.ageGroup}岁，${this.getChineseStatus(userProfile.relationshipStatus)}，${this.getChinesePersonality(userProfile.personalityType)}人格。

请用100字左右简洁分析用户的恋爱脑程度，直接给出核心洞察和建议，避免客套话。`;
    }

    // 本地模板降级方案 - 优化版
    getLocalInterpretation(score, times, answers) {
        const avgTime = times && times.length > 0 ? times.reduce((a,b)=>a+b,0)/times.length : 5000;
        
        let levelDesc = '';
        if (score < 20) levelDesc = '理性冷静，情感独立';
        else if (score < 40) levelDesc = '平衡理性，收放自如';
        else if (score < 60) levelDesc = '适度投入，健康平衡';
        else if (score < 80) levelDesc = '情感丰富，用心投入';
        else levelDesc = '全心投入，情感深厚';

        let speedDesc = '';
        if (avgTime < 2000) speedDesc = '决策果断直觉强';
        else if (avgTime < 4000) speedDesc = '思考平衡节奏稳';
        else speedDesc = '谨慎分析考虑周';

        return `测试显示您${levelDesc}。${speedDesc}，在感情中能找到适合自己的节奏。保持自我觉察，享受健康的情感关系。`;
    }

    // AI生成分析部分 - 修复版
    async getAnalysis(scores) {
        try {
            console.log('🤖 开始AI生成维度分析...');
            
            const prompt = this.generateAnalysisPrompt(scores, this.userProfile);
            
            const messages = [
                { 
                    role: "system", 
                    content: "你是一位资深的心理咨询师，请为每个情感维度提供具体分析。每个维度分析控制在30字以内，直接给出专业洞察。" 
                },
                { role: "user", content: prompt }
            ];

            const aiContent = await this.deepSeekAPI.callDeepSeekAPI(messages);
            
            if (aiContent) {
                console.log('✅ AI分析生成成功');
                return this.parseAnalysisResponse(aiContent);
            } else {
                throw new Error('AI生成失败');
            }
        } catch (error) {
            console.log('❌ AI分析生成失败，使用本地模板:', error);
            return this.getLocalAnalysis(scores);
        }
    }

    // 生成分析提示词
    generateAnalysisPrompt(scores, userProfile) {
        let prompt = `请为以下9个情感维度提供简洁分析（每个30字内）：\n`;
        
        const dimensionMap = {
            'dependency': '情感依赖',
            'selfworth': '自我价值',
            'boundary': '边界意识',
            'conflict': '冲突处理',
            'investment': '关系投入',
            'idealization': '理想化程度',
            'sacrifice': '牺牲倾向',
            'jealousy': '嫉妒心理',
            'anxiety': '关系焦虑'
        };

        Object.entries(scores).forEach(([dim, score]) => {
            const chineseName = dimensionMap[dim];
            prompt += `\n${chineseName}: ${score}分`;
        });

        prompt += `\n\n用户背景：${userProfile.ageGroup}岁${userProfile.gender === 'male' ? '男性' : '女性'}，${this.getChineseStatus(userProfile.relationshipStatus)}`;
        prompt += `\n请直接给出每个维度的具体分析，不要模板化回复。`;

        return prompt;
    }

    // 解析AI返回的分析结果 - 修复版
    parseAnalysisResponse(aiContent) {
        const result = {};
        const dimensionMap = {
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

        // 按行解析，寻找包含维度名称的行
        const lines = aiContent.split('\n').filter(line => line.trim());
        
        Object.entries(dimensionMap).forEach(([chineseName, englishName]) => {
            let found = false;
            for (const line of lines) {
                if (line.includes(chineseName)) {
                    // 提取分析内容（去除维度名称部分）
                    let content = line.replace(chineseName, '').replace(':', '').replace('：', '').trim();
                    if (content && content.length > 5) {
                        result[englishName] = content;
                        found = true;
                        break;
                    }
                }
            }
            
            // 如果没有找到，使用降级内容
            if (!found) {
                result[englishName] = this.getSingleDimensionAnalysis(englishName, 50);
            }
        });

        return result;
    }

    // 本地分析模板降级 - 优化版
    getLocalAnalysis(scores) {
        const result = {};
        const dimensions = ['dependency','selfworth','boundary','conflict','investment','idealization','sacrifice','jealousy','anxiety'];
        
        dimensions.forEach(dim => {
            const score = scores[dim] || 50;
            result[dim] = this.getSingleDimensionAnalysis(dim, score);
        });
        
        return result;
    }

    // 单个维度分析
    getSingleDimensionAnalysis(dimension, score) {
        const analyses = {
            'dependency': {
                low: '情感独立，享受个人空间',
                medium: '需要陪伴但保持自我',
                high: '较依赖伴侣获得安全感'
            },
            'selfworth': {
                low: '自我价值感稳定独立',
                medium: '在关系中寻找平衡',
                high: '较需要通过关系确认价值'
            },
            'boundary': {
                low: '边界清晰，懂得拒绝',
                medium: '在亲密与独立间平衡',
                high: '有时会模糊个人边界'
            },
            'conflict': {
                low: '直面冲突，善于沟通',
                medium: '选择性地处理分歧',
                high: '倾向于回避矛盾'
            },
            'investment': {
                low: '投入适度，保持理性',
                medium: '愿意为关系付出',
                high: '全身心投入感情'
            },
            'idealization': {
                low: '对关系有现实认知',
                medium: '保持适度浪漫期待',
                high: '容易理想化伴侣'
            },
            'sacrifice': {
                low: '重视自我需求平衡',
                medium: '愿意为爱适当妥协',
                high: '容易为关系牺牲自我'
            },
            'jealousy': {
                low: '信任感强，心态平和',
                medium: '偶尔会有不安情绪',
                high: '容易产生嫉妒心理'
            },
            'anxiety': {
                low: '关系安全感较充足',
                medium: '偶尔担心关系稳定',
                high: '容易焦虑关系变化'
            }
        };

        let level = 'medium';
        if (score < 30) level = 'low';
        else if (score > 70) level = 'high';

        return analyses[dimension]?.[level] || '这个维度表现较为均衡。';
    }

    // AI生成解决方案 - 修复版
    async getSolutions(totalScore, categoryScores, userProfile) {
        try {
            console.log('🤖 开始AI生成解决方案...');
            
            const prompt = this.generateSolutionsPrompt(totalScore, categoryScores, userProfile);
            
            const messages = [
                { 
                    role: "system", 
                    content: "你是一位情感关系专家，请提供4个具体可行的改善建议。每个建议包含标题和30字内的具体做法，用中文冒号分隔。" 
                },
                { role: "user", content: prompt }
            ];

            const aiContent = await this.deepSeekAPI.callDeepSeekAPI(messages);
            
            if (aiContent) {
                console.log('✅ AI解决方案生成成功');
                return this.parseSolutionsResponse(aiContent);
            } else {
                throw new Error('AI生成失败');
            }
        } catch (error) {
            console.log('❌ AI解决方案生成失败，使用本地模板:', error);
            return this.getLocalSolutions(totalScore, categoryScores, userProfile);
        }
    }

    // 生成解决方案提示词
    generateSolutionsPrompt(totalScore, categoryScores, userProfile) {
        // 找出需要改善的维度
        const needImprovement = Object.entries(categoryScores)
            .filter(([_, score]) => score > 60)
            .map(([dim]) => this.getDimensionChineseName(dim))
            .slice(0, 3);

        let prompt = `用户总分：${totalScore}/100，`;
        if (needImprovement.length > 0) {
            prompt += `在${needImprovement.join('、')}方面需要关注。`;
        } else {
            prompt += `整体表现均衡。`;
        }

        prompt += `\n用户背景：${userProfile.ageGroup}岁，${this.getChineseStatus(userProfile.relationshipStatus)}`;
        prompt += `\n\n请提供4个具体可行的情感关系改善建议，每个建议格式：标题：具体做法（30字内）`;

        return prompt;
    }

    // 解析AI返回的解决方案 - 修复版
    parseSolutionsResponse(aiContent) {
        const solutions = [];
        const lines = aiContent.split('\n').filter(line => line.trim());
        
        for (const line of lines) {
            // 匹配 "标题：内容" 或 "数字. 标题：内容" 格式
            const match = line.match(/(?:\d+\.\s*)?([^：]+)[：:]\s*(.+)/);
            if (match) {
                const title = match[1].trim();
                const content = match[2].trim();
                if (title && content && !title.includes('建议') && !title.includes('提示')) {
                    solutions.push(`${title}：${content}`);
                    if (solutions.length >= 4) break;
                }
            }
        }
        
        // 如果解析失败或数量不足，使用默认建议
        if (solutions.length < 4) {
            return this.getLocalSolutions(50, {}, {});
        }
        
        return solutions;
    }

    // 本地解决方案模板降级 - 优化版
    getLocalSolutions(totalScore, categoryScores, userProfile) {
        return [
            '情绪觉察：每天记录情感变化，增强自我认知',
            '边界建立：在亲密关系中保留个人空间和时间',
            '价值独立：培养兴趣爱好，不依赖他人认可',
            '沟通练习：学习表达需求，勇敢面对分歧'
        ];
    }

    // 辅助方法：确保内容简短
    ensureShortContent(content, maxLength = 100) {
        if (content.length <= maxLength) return content;
        
        // 简单截断到合适的长度
        const sentences = content.split(/[。.!?]/);
        let result = '';
        for (const sentence of sentences) {
            if ((result + sentence).length <= maxLength - 10) {
                result += sentence + '。';
            } else {
                break;
            }
        }
        return result || content.substring(0, maxLength) + '...';
    }

    // 获取中文状态描述
    getChineseStatus(status) {
        const map = {
            'single': '单身',
            'dating': '恋爱中',
            'married': '已婚',
            'divorced': '离异',
            'complicated': '关系复杂'
        };
        return map[status] || status;
    }

    // 获取中文人格描述
    getChinesePersonality(type) {
        const map = {
            'thinker': '理性思考',
            'feeler': '感性感受',
            'balanced': '平衡型',
            'intuitive': '直觉型',
            'practical': '务实型'
        };
        return map[type] || type;
    }

    // 获取维度中文名称
    getDimensionChineseName(englishName) {
        const map = {
            'dependency': '情感依赖',
            'selfworth': '自我价值',
            'boundary': '边界意识',
            'conflict': '冲突处理',
            'investment': '关系投入',
            'idealization': '理想化程度',
            'sacrifice': '牺牲倾向',
            'jealousy': '嫉妒心理',
            'anxiety': '关系焦虑'
        };
        return map[englishName] || englishName;
    }

    // 生成会话ID
    generateSessionId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    // 辅助方法
    analyzeAnswerPattern(answers) {
        if (!answers || answers.length === 0) {
            return { consistency: 0.5, extremity: 0.5, variability: 0.5 };
        }
        
        const mean = answers.reduce((a, b) => a + b, 0) / answers.length;
        const variance = answers.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / answers.length;
        const consistency = Math.max(0, 1 - variance / 2);
        
        const extremity = answers.reduce((a, b) => a + Math.abs(b - 2.5), 0) / answers.length / 1.5;
        
        let variability = 0;
        for (let i = 1; i < answers.length; i++) {
            variability += Math.abs(answers[i] - answers[i-1]);
        }
        variability = variability / (answers.length - 1) / 3;
        
        return {
            consistency: Math.min(1, consistency),
            extremity: Math.min(1, extremity),
            variability: Math.min(1, variability)
        };
    }

    // 调试信息
    getDebugInfo() {
        return {
            usedContent: Array.from(this.usedContent.entries()),
            userProfile: this.userProfile,
            sessionId: this.sessionId
        };
    }
}