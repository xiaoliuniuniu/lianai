// prompts.js - DeepSeek AI提示词模板库

const PROMPT_TEMPLATES = {
    // 总体解读提示词
    interpretation: `
你是一位专业的心理学专家和情感关系顾问。请根据以下测试数据为用户生成个性化的恋爱脑测试结果解读：

【用户测试数据】
- 总分：{score}/100分
- 等级：{level}
- 答题平均时间：{avgTime}毫秒
- 总题数：{totalQuestions}题

【用户画像】
- 性别：{gender}
- 年龄阶段：{ageGroup}
- 感情状态：{relationshipStatus}
- 人格类型：{personalityType}
- 情感风格：{emotionalStyle}
- 冲突处理风格：{conflictStyle}

【要求】
1. 用温暖、专业、鼓励的语气
2. 结合用户画像特点进行个性化分析
3. 分析分数背后的心理学意义
4. 指出用户的优势和改进空间
5. 包含答题速度对决策风格的影响分析
6. 输出长度在200-300字之间
7. 使用自然流畅的中文，避免专业术语堆砌

请生成个性化解读：
    `,

    // 维度分析提示词
    analysis: `
你是一位资深的心理咨询师，擅长情感关系分析。请针对用户的9个恋爱特质维度进行详细分析：

【各维度得分】
{categoryScores}

【用户背景信息】
- 性别：{gender}
- 年龄：{ageGroup} 
- 感情状态：{relationshipStatus}
- 人格类型：{personalityType}

【分析要求】
对每个维度提供：
1. 该维度的心理学含义解释
2. 用户在该维度的表现分析
3. 结合用户背景的个性化解读
4. 该维度对感情生活的影响
5. 用生活化的语言，避免学术化

请按以下格式为每个维度提供分析：
【维度名称】分析内容...

请开始分析：
    `,

    // 解决方案提示词
    solutions: `
作为情感关系专家，请为用户提供针对性的改善建议：

【用户情况】
- 总分：{score}/100
- 等级：{level}
- 主要问题维度：{mainIssues}

【用户特征】
- 性别：{gender}
- 年龄：{ageGroup}
- 人格类型：{personalityType}
- 情感风格：{emotionalStyle}

【要求】
1. 提供4个最迫切的改善建议
2. 每个建议包含具体行动步骤
3. 结合用户的人格特点和情感风格
4. 建议要实用、可操作
5. 语气要积极鼓励
6. 用"标题：具体描述"的格式

请提供个性化建议：
    `,

    // 综合报告提示词（备用）
    comprehensive: `
你是一位专业的心理测评师，请为用户生成一份完整的恋爱脑测试报告：

【测试数据】
- 总分：{score}/100
- 等级：{level}
- 各维度得分：{categoryScores}

【用户画像】
{userProfile}

【报告要求】
1. 开头：总体评价和等级说明
2. 主体：各维度详细分析
3. 结尾：具体改善建议
4. 风格：专业但亲切，鼓励性语言
5. 长度：500-800字
6. 包含具体的行动建议

请生成完整报告：
    `
};

// 提示词工具函数
class PromptEngine {
    // 填充模板变量
    static fillTemplate(template, data) {
        let result = template;
        for (const [key, value] of Object.entries(data)) {
            const placeholder = `{${key}}`;
            result = result.replace(new RegExp(placeholder, 'g'), value);
        }
        return result;
    }

    // 生成解读提示词
    static generateInterpretationPrompt(scoreData, userProfile, times, answers) {
        const avgTime = times && times.length > 0 ? 
            Math.round(times.reduce((a, b) => a + b, 0) / times.length) : 5000;
        
        const data = {
            score: scoreData.normalizedTotalScore,
            level: this.getLevelByScore(scoreData.normalizedTotalScore),
            avgTime: avgTime,
            totalQuestions: answers.length,
            gender: userProfile.gender,
            ageGroup: userProfile.ageGroup,
            relationshipStatus: userProfile.relationshipStatus,
            personalityType: userProfile.personalityType,
            emotionalStyle: userProfile.emotionalStyle,
            conflictStyle: userProfile.conflictStyle
        };

        return this.fillTemplate(PROMPT_TEMPLATES.interpretation, data);
    }

    // 生成分析提示词
    static generateAnalysisPrompt(categoryScores, userProfile) {
        const scoresText = Object.entries(categoryScores)
            .map(([dim, score]) => `${this.getDimensionChineseName(dim)}: ${score}%`)
            .join('\n');

        const data = {
            categoryScores: scoresText,
            gender: userProfile.gender,
            ageGroup: userProfile.ageGroup,
            relationshipStatus: userProfile.relationshipStatus,
            personalityType: userProfile.personalityType
        };

        return this.fillTemplate(PROMPT_TEMPLATES.analysis, data);
    }

    // 生成解决方案提示词
    static generateSolutionsPrompt(totalScore, categoryScores, userProfile) {
        // 找出得分最高的3个问题维度
        const mainIssues = Object.entries(categoryScores)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 3)
            .map(([dim]) => this.getDimensionChineseName(dim))
            .join('、');

        const data = {
            score: totalScore,
            level: this.getLevelByScore(totalScore),
            mainIssues: mainIssues,
            gender: userProfile.gender,
            ageGroup: userProfile.ageGroup,
            personalityType: userProfile.personalityType,
            emotionalStyle: userProfile.emotionalStyle
        };

        return this.fillTemplate(PROMPT_TEMPLATES.solutions, data);
    }

    // 工具函数：根据分数获取等级
    static getLevelByScore(score) {
        if (score <= 16) return '青铜级';
        if (score <= 33) return '白银级';
        if (score <= 50) return '黄金级';
        if (score <= 66) return '钻石级';
        if (score <= 83) return '至尊级';
        return '王者级';
    }

    // 工具函数：维度英文名转中文名
    static getDimensionChineseName(englishName) {
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
        return dimensionMap[englishName] || englishName;
    }
}

// 导出供其他文件使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PROMPT_TEMPLATES, PromptEngine };
} else {
    window.PROMPT_TEMPLATES = PROMPT_TEMPLATES;
    window.PromptEngine = PromptEngine;
}