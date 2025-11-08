// deepseek-api.js
class DeepSeekAPI {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseURL = 'https://api.deepseek.com/v1/chat/completions';
    }

    async callDeepSeekAPI(messages, temperature = 0.7) {
        try {
            console.log('正在调用DeepSeek API...');
            
            const response = await fetch(this.baseURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`
                },
                body: JSON.stringify({
                    model: "deepseek-chat",
                    messages: messages,
                    temperature: temperature,
                    max_tokens: 1000
                })
            });
            
            if (!response.ok) {
                throw new Error(`API请求失败: ${response.status} ${response.statusText}`);
            }
            
            const data = await response.json();
            console.log('DeepSeek API响应:', data);
            
            return data.choices[0].message.content;
        } catch (error) {
            console.error('DeepSeek API调用失败:', error);
            return null;
        }
    }

    // 测试连接
    async testConnection() {
        const testMessages = [
            {
                role: "user",
                content: "请回复'连接成功'，测试API是否正常工作"
            }
        ];
        
        return await this.callDeepSeekAPI(testMessages);
    }
}

// 导出供其他文件使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DeepSeekAPI;
} else {
    window.DeepSeekAPI = DeepSeekAPI;
}