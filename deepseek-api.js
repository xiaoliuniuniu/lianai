// deepseek-api.js - 安全修复版
class DeepSeekAPI {
    constructor(apiKey) {
        this.apiKey = apiKey;
        // 使用可靠的API端点
        this.baseURLs = [
            'https://api.deepseek.com/v1/chat/completions',
            'https://api.deepseek.com/chat/completions'
        ];
        this.currentURLIndex = 0;
        console.log('DeepSeekAPI 初始化完成，API Key:', this.apiKey ? '已设置' : '未设置');
    }

    async callDeepSeekAPI(messages, temperature = 0.7) {
        // 安全检查：只检查是否为空，不检查具体内容
        if (!this.apiKey || this.apiKey.trim() === '') {
            console.error('❌ API密钥未设置');
            return null;
        }

        // 如果所有URL都试过了，返回失败
        if (this.currentURLIndex >= this.baseURLs.length) {
            console.error('❌ 所有API端点都失败了');
            return null;
        }

        const currentURL = this.baseURLs[this.currentURLIndex];
        
        try {
            console.log(`🔗 正在调用DeepSeek API [${this.currentURLIndex + 1}/${this.baseURLs.length}]...`);
            
            const response = await fetch(currentURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`
                },
                body: JSON.stringify({
                    model: "deepseek-chat",
                    messages: messages,
                    temperature: temperature,
                    max_tokens: 2000,
                    stream: false
                })
            });
            
            if (!response.ok) {
                console.log(`⚠️ 端点 ${currentURL} 返回 ${response.status}`);
                
                // 如果是404或401错误，尝试下一个URL
                if (response.status === 404 || response.status === 401) {
                    this.currentURLIndex++;
                    return await this.callDeepSeekAPI(messages, temperature);
                }
                
                const errorText = await response.text();
                console.error(`API请求失败详情: ${response.status} - ${errorText}`);
                throw new Error(`API请求失败: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('✅ DeepSeek API响应成功');
            
            return data.choices[0].message.content;
        } catch (error) {
            console.error(`❌ API调用失败:`, error);
            
            // 如果是网络错误或404，尝试下一个URL
            if (error.message.includes('Failed to fetch') || error.message.includes('404')) {
                this.currentURLIndex++;
                if (this.currentURLIndex < this.baseURLs.length) {
                    console.log(`🔄 尝试下一个API端点`);
                    return await this.callDeepSeekAPI(messages, temperature);
                }
            }
            
            return null;
        }
    }

    // 测试连接
    async testConnection() {
        console.log('🧪 开始测试DeepSeek API连接...');
        const testMessages = [
            {
                role: "user",
                content: "请简单回复'API连接测试成功'，证明连接正常"
            }
        ];
        
        const result = await this.callDeepSeekAPI(testMessages);
        return result;
    }

    // 重置URL索引（在重新测试时使用）
    resetURLIndex() {
        this.currentURLIndex = 0;
    }
}

// 确保在浏览器环境中可用
if (typeof window !== 'undefined') {
    window.DeepSeekAPI = DeepSeekAPI;
    console.log('🌐 DeepSeekAPI 已注册到 window 对象');
}

// 导出供其他文件使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DeepSeekAPI;
}

console.log('✅ deepseek-api.js 文件加载完成');