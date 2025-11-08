// 题库数据 - 恋爱脑测试
const questionPool = [
    // 情感依赖维度 - 5题
    {
        category: "情感依赖",
        question: "当伴侣因工作忙碌而暂时无法陪伴你时，你的第一反应是？",
        options: [
            {text: "完全理解，正好利用这段时间做自己的事", score: 1},
            {text: "有点失落，但很快就能调整好心态", score: 2},
            {text: "感到不安，会主动联系确认关系状态", score: 3},
            {text: "非常焦虑，难以集中精力做其他事情", score: 4}
        ]
    },
    {
        category: "情感依赖",
        question: "如果伴侣一整天没有主动联系你，你会？",
        options: [
            {text: "很正常，各自都有忙碌的时候", score: 1},
            {text: "偶尔会想对方在做什么，但不会打扰", score: 2},
            {text: "主动联系询问情况，确认一切正常", score: 3},
            {text: "非常焦虑，反复查看手机等待消息", score: 4}
        ]
    },
    {
        category: "情感依赖",
        question: "伴侣出差一周，你的感受是？",
        options: [
            {text: "正好享受个人时间，安排自己的活动", score: 1},
            {text: "有点想念，但生活照常进行", score: 2},
            {text: "感到孤单，频繁联系保持亲密感", score: 3},
            {text: "极度不适应，情绪低落难以正常工作", score: 4}
        ]
    },
    {
        category: "情感依赖",
        question: "当伴侣与朋友聚会晚归时，你会？",
        options: [
            {text: "完全信任，做自己的事情等待", score: 1},
            {text: "偶尔发消息关心，但不催促", score: 2},
            {text: "频繁联系确认情况，有些担心", score: 3},
            {text: "坐立不安，必须知道具体行踪", score: 4}
        ]
    },
    {
        category: "情感依赖",
        question: "当伴侣情绪低落时，你的反应是？",
        options: [
            {text: "给予空间，相信对方能自我调节", score: 1},
            {text: "适度关心，但不强求对方分享", score: 2},
            {text: "非常关注，努力帮助对方走出情绪", score: 3},
            {text: "感同身受，情绪完全被对方影响", score: 4}
        ]
    },

    // 自我价值维度 - 5题
    {
        category: "自我价值",
        question: "当伴侣对你的某个缺点提出建议时，你会？",
        options: [
            {text: "理性分析建议的合理性，选择性接受", score: 1},
            {text: "会认真考虑，但不会过度在意", score: 2},
            {text: "感到受伤，怀疑自己是否不够好", score: 3},
            {text: "极度不安，担心对方因此不再爱你", score: 4}
        ]
    },
    {
        category: "自我价值",
        question: "当你在工作中取得成就时，你更倾向于？",
        options: [
            {text: "为自己感到骄傲，这是个人能力的体现", score: 1},
            {text: "既为自己高兴，也愿意与伴侣分享", score: 2},
            {text: "很希望得到伴侣的认可和赞美", score: 3},
            {text: "成就的价值主要取决于伴侣的反应", score: 4}
        ]
    },
    {
        category: "自我价值",
        question: "当伴侣取得成功时，你的感受是？",
        options: [
            {text: "真心为对方高兴，不影响自我价值感", score: 1},
            {text: "为对方高兴，但也激发自我进步动力", score: 2},
            {text: "有些压力，担心自己跟不上对方", score: 3},
            {text: "强烈不安，害怕被比下去或抛弃", score: 4}
        ]
    },
    {
        category: "自我价值",
        question: "你如何评价自己的吸引力？",
        options: [
            {text: "基于全面的自我认知，不依赖他人评价", score: 1},
            {text: "主要基于自我认知，也参考重要他人看法", score: 2},
            {text: "很大程度上依赖伴侣的评价", score: 3},
            {text: "完全由伴侣的态度决定自我感受", score: 4}
        ]
    },
    {
        category: "自我价值",
        question: "当伴侣赞美其他人时，你的想法是？",
        options: [
            {text: "很正常，每个人都有自己的优点", score: 1},
            {text: "会稍作比较，但不会影响自信", score: 2},
            {text: "有些在意，会思考自己是否不够好", score: 3},
            {text: "非常敏感，觉得对方在暗示我的不足", score: 4}
        ]
    },

    // 边界意识维度 - 5题
    {
        category: "边界意识",
        question: "你如何看待伴侣与异性朋友的正常交往？",
        options: [
            {text: "完全信任，这是正常的社交需求", score: 1},
            {text: "基本信任，但希望了解具体情况", score: 2},
            {text: "有些介意，会委婉表达自己的担忧", score: 3},
            {text: "非常不安，会明确表示反对或限制", score: 4}
        ]
    },
    {
        category: "边界意识",
        question: "你如何看待伴侣查看你手机的行为？",
        options: [
            {text: "完全不能接受，这是个人隐私", score: 1},
            {text: "可以理解，但需要提前沟通", score: 2},
            {text: "可以接受，这表示对方在乎", score: 3},
            {text: "主动让对方查看，证明自己坦诚", score: 4}
        ]
    },
    {
        category: "边界意识",
        question: "当伴侣询问你的行踪时，你会？",
        options: [
            {text: "觉得被监视，明确表达不适", score: 1},
            {text: "理解关心，但希望保持适度空间", score: 2},
            {text: "详细汇报，避免对方担心", score: 3},
            {text: "主动实时报备，让对方完全放心", score: 4}
        ]
    },
    {
        category: "边界意识",
        question: "你如何对待伴侣的社交账号密码？",
        options: [
            {text: "从不询问，尊重个人隐私", score: 1},
            {text: "知道但不查看，信任对方", score: 2},
            {text: "偶尔查看，确认关系安全", score: 3},
            {text: "必须共享，认为这是真爱的表现", score: 4}
        ]
    },
    {
        category: "边界意识",
        question: "当伴侣为你做决定时，你的态度是？",
        options: [
            {text: "坚持自主决策，这是个人权利", score: 1},
            {text: "参考对方意见，但自己做决定", score: 2},
            {text: "多数情况下会听从对方的建议", score: 3},
            {text: "完全信赖对方的判断，放弃自主权", score: 4}
        ]
    },

    // 冲突处理维度 - 5题
    {
        category: "冲突处理",
        question: "当与伴侣发生争执时，你的典型反应是？",
        options: [
            {text: "冷静沟通，寻求双方都能接受的解决方案", score: 1},
            {text: "会有情绪，但能较快恢复理性讨论", score: 2},
            {text: "情绪波动较大，需要时间平复", score: 3},
            {text: "非常痛苦，觉得关系可能因此结束", score: 4}
        ]
    },
    {
        category: "冲突处理",
        question: "当伴侣的观点与你不同时，你会？",
        options: [
            {text: "理性讨论，尊重不同观点", score: 1},
            {text: "尝试说服，但接受差异存在", score: 2},
            {text: "感到困扰，希望对方能改变", score: 3},
            {text: "非常不安，认为差异会威胁关系", score: 4}
        ]
    },
    {
        category: "冲突处理",
        question: "当伴侣批评你时，你的应对方式是？",
        options: [
            {text: "客观分析，有则改之无则加勉", score: 1},
            {text: "有些防御，但能理性回应", score: 2},
            {text: "情绪激动，容易感到被攻击", score: 3},
            {text: "极度受伤，可能冷战或激烈反驳", score: 4}
        ]
    },
    {
        category: "冲突处理",
        question: "你如何处理关系中的小摩擦？",
        options: [
            {text: "轻松面对，这是正常的生活调味剂", score: 1},
            {text: "稍有不快，但很快释怀", score: 2},
            {text: "比较在意，需要对方安抚", score: 3},
            {text: "非常困扰，可能影响整天情绪", score: 4}
        ]
    },
    {
        category: "冲突处理",
        question: "当伴侣忘记重要纪念日时，你的反应是？",
        options: [
            {text: "理解对方可能忙碌，适时提醒", score: 1},
            {text: "有点失望，但不会过度放大", score: 2},
            {text: "感到受伤，需要对方认真道歉", score: 3},
            {text: "非常难过，怀疑对方不再重视自己", score: 4}
        ]
    },

    // 关系投入维度 - 5题
    {
        category: "关系投入",
        question: "在恋爱关系中，你如何分配个人时间和相处时间？",
        options: [
            {text: "保持原有的生活节奏，恋爱是生活的一部分", score: 1},
            {text: "适当增加相处时间，但保留个人空间", score: 2},
            {text: "大部分空闲时间都留给对方", score: 3},
            {text: "几乎把所有精力都投入在关系维护上", score: 4}
        ]
    },
    {
        category: "关系投入",
        question: "你如何安排与朋友见面的时间？",
        options: [
            {text: "保持原有的社交频率，不受恋爱影响", score: 1},
            {text: "适当调整，但重要聚会都会参加", score: 2},
            {text: "明显减少，更多时间留给伴侣", score: 3},
            {text: "几乎不再单独与朋友见面", score: 4}
        ]
    },
    {
        category: "关系投入",
        question: "当个人计划与伴侣计划冲突时，你会？",
        options: [
            {text: "优先个人计划，这是自我负责的表现", score: 1},
            {text: "权衡重要性，做出合理选择", score: 2},
            {text: "通常调整个人计划配合对方", score: 3},
            {text: "总是放弃个人计划", score: 4}
        ]
    },
    {
        category: "关系投入",
        question: "你如何对待个人职业发展？",
        options: [
            {text: "完全基于个人职业规划", score: 1},
            {text: "主要基于个人，适当考虑关系", score: 2},
            {text: "很大程度上围绕关系需求", score: 3},
            {text: "完全以关系为优先考虑", score: 4}
        ]
    },
    {
        category: "关系投入",
        question: "在消费决策上，你如何考虑伴侣的意见？",
        options: [
            {text: "完全自主决定，这是我的个人事务", score: 1},
            {text: "会参考对方意见，但最终自己决定", score: 2},
            {text: "多数消费决策都会与对方商量", score: 3},
            {text: "几乎所有消费都会考虑对方偏好", score: 4}
        ]
    },

    // 理想化程度维度 - 5题
    {
        category: "理想化程度",
        question: "当你发现伴侣有缺点时，你的反应是？",
        options: [
            {text: "完全接受，人无完人很正常", score: 1},
            {text: "有些失望，但能理性看待", score: 2},
            {text: "试图改变对方，希望更完美", score: 3},
            {text: "非常失望，觉得对方不是理想伴侣", score: 4}
        ]
    },
    {
        category: "理想化程度",
        question: "你对恋爱关系的期待是？",
        options: [
            {text: "现实理性，知道关系需要经营", score: 1},
            {text: "适度理想，但能接受不完美", score: 2},
            {text: "比较理想，希望关系完美无缺", score: 3},
            {text: "极度理想，认为真爱应该完美", score: 4}
        ]
    },
    {
        category: "理想化程度",
        question: "当关系出现问题时，你的想法是？",
        options: [
            {text: "正常现象，任何关系都会有起伏", score: 1},
            {text: "有些担忧，但相信能解决", score: 2},
            {text: "非常焦虑，觉得关系可能不完美", score: 3},
            {text: "极度失望，认为这不是理想的爱情", score: 4}
        ]
    },
    {
        category: "理想化程度",
        question: "你对伴侣的期望是？",
        options: [
            {text: "接受对方的本来样子", score: 1},
            {text: "希望对方变得更好，但不强求", score: 2},
            {text: "期待对方符合我的理想标准", score: 3},
            {text: "要求对方完全符合我的所有期望", score: 4}
        ]
    },
    {
        category: "理想化程度",
        question: "当发现伴侣与你的想象不同时，你会？",
        options: [
            {text: "接受现实差异，这是正常的", score: 1},
            {text: "有些失落，但能调整心态", score: 2},
            {text: "感到失望，希望对方改变", score: 3},
            {text: "非常痛苦，觉得被欺骗或失望", score: 4}
        ]
    },

    // 牺牲倾向维度 - 5题
    {
        category: "牺牲倾向",
        question: "你为关系牺牲个人爱好的程度是？",
        options: [
            {text: "很少牺牲，保持个人兴趣", score: 1},
            {text: "适度调整，寻找平衡", score: 2},
            {text: "较多牺牲，以关系为重", score: 3},
            {text: "完全放弃，全心投入关系", score: 4}
        ]
    },
    {
        category: "牺牲倾向",
        question: "当个人成长机会与关系稳定冲突时，你的选择是？",
        options: [
            {text: "优先个人成长，关系可以调整", score: 1},
            {text: "努力寻找两全其美的方案", score: 2},
            {text: "倾向于选择关系稳定", score: 3},
            {text: "绝对选择关系，放弃个人机会", score: 4}
        ]
    },
    {
        category: "牺牲倾向",
        question: "你在关系中的付出与期待回报的平衡是？",
        options: [
            {text: "付出基于自愿，不期待对等回报", score: 1},
            {text: "希望大致平衡，但不强求", score: 2},
            {text: "期待较多回报，容易感到不平衡", score: 3},
            {text: "完全不计回报，付出就是快乐", score: 4}
        ]
    },
    {
        category: "牺牲倾向",
        question: "当需要为关系做出重大牺牲时，你的态度是？",
        options: [
            {text: "谨慎考虑，确保不会过度牺牲", score: 1},
            {text: "愿意适度牺牲，但有底线", score: 2},
            {text: "愿意较多牺牲，为了关系稳定", score: 3},
            {text: "愿意任何牺牲，只要关系能继续", score: 4}
        ]
    },
    {
        category: "牺牲倾向",
        question: "你如何看待在关系中放弃个人目标？",
        options: [
            {text: "不会放弃，个人目标很重要", score: 1},
            {text: "可能调整，但不完全放弃", score: 2},
            {text: "愿意为了关系调整个人目标", score: 3},
            {text: "完全愿意放弃个人目标", score: 4}
        ]
    },

    // 嫉妒心理维度 - 5题
    {
        category: "嫉妒心理",
        question: "当伴侣与异性正常交往时，你的感受是？",
        options: [
            {text: "完全信任，这是正常的社交", score: 1},
            {text: "稍作留意，但不会过度关注", score: 2},
            {text: "有些在意，会委婉表达关注", score: 3},
            {text: "非常不安，需要对方详细解释", score: 4}
        ]
    },
    {
        category: "嫉妒心理",
        question: "当伴侣赞美其他异性时，你的反应是？",
        options: [
            {text: "完全不在意，这是正常交流", score: 1},
            {text: "稍有不快，但很快释怀", score: 2},
            {text: "比较在意，会询问具体情况", score: 3},
            {text: "非常嫉妒，可能引发争执", score: 4}
        ]
    },
    {
        category: "嫉妒心理",
        question: "你查看伴侣社交媒体的频率是？",
        options: [
            {text: "几乎不看，尊重对方隐私", score: 1},
            {text: "偶尔查看，出于好奇", score: 2},
            {text: "经常查看，了解对方动态", score: 3},
            {text: "频繁查看，监控异性互动", score: 4}
        ]
    },
    {
        category: "嫉妒心理",
        question: "当伴侣与前任保持联系时，你的态度是？",
        options: [
            {text: "完全信任，这是对方的自由", score: 1},
            {text: "理解但希望了解具体情况", score: 2},
            {text: "有些介意，希望减少联系", score: 3},
            {text: "强烈反对，要求断绝联系", score: 4}
        ]
    },
    {
        category: "嫉妒心理",
        question: "你对伴侣过去的感情经历的态度是？",
        options: [
            {text: "完全接受，这是对方的过去", score: 1},
            {text: "理解但不过多追问", score: 2},
            {text: "有些在意，会询问细节", score: 3},
            {text: "非常在意，经常联想到现在", score: 4}
        ]
    },

    // 关系焦虑维度 - 5题
    {
        category: "关系焦虑",
        question: "当关系出现小摩擦时，你的情绪波动程度是？",
        options: [
            {text: "几乎不受影响，能理性看待", score: 1},
            {text: "稍有波动，但很快平复", score: 2},
            {text: "情绪明显受影响，需要时间调整", score: 3},
            {text: "情绪波动很大，影响日常生活", score: 4}
        ]
    },
    {
        category: "关系焦虑",
        question: "你对关系未来的担忧程度是？",
        options: [
            {text: "很少担忧，顺其自然", score: 1},
            {text: "偶尔担忧，但能理性面对", score: 2},
            {text: "经常担忧，需要对方安抚", score: 3},
            {text: "持续担忧，影响生活状态", score: 4}
        ]
    },
    {
        category: "关系焦虑",
        question: "当伴侣暂时不回复消息时，你的想法是？",
        options: [
            {text: "对方在忙，稍后会回复", score: 1},
            {text: "有些疑惑，但不会过度解读", score: 2},
            {text: "担心是否自己做错了什么", score: 3},
            {text: "极度焦虑，怀疑关系出现问题", score: 4}
        ]
    },
    {
        category: "关系焦虑",
        question: "你对关系稳定性的信心程度是？",
        options: [
            {text: "非常有信心，相信能长久", score: 1},
            {text: "比较有信心，但知道需要经营", score: 2},
            {text: "有些担忧，需要不断确认", score: 3},
            {text: "非常担忧，经常觉得关系可能结束", score: 4}
        ]
    },
    {
        category: "关系焦虑",
        question: "当伴侣需要个人空间时，你的理解程度是？",
        options: [
            {text: "完全理解并尊重，这是健康需求", score: 1},
            {text: "理解，但希望知道原因", score: 2},
            {text: "有些困惑，担心关系出现问题", score: 3},
            {text: "难以接受，觉得被排斥", score: 4}
        ]
    }
];