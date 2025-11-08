// 完整的千人千面引擎 - 修复版
class PersonalizationEngine {
    constructor() {
        this.usedContent = new Map();
        this.userProfile = this.generateDetailedProfile();
        this.sessionId = this.generateSessionId();
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
            // 重置已使用内容
            this.usedContent.set(type, []);
            return array[Math.floor(Math.random() * array.length)];
        }
        
        const selected = available[Math.floor(Math.random() * available.length)];
        used.push(selected);
        this.usedContent.set(type, used);
        return selected;
    }

    // 等级名称模板

// 等级名称模板
getLevel(score) {
    const levels = [
        // 0-16分 - 青铜级
         '青铜级',
        // 17-33分 - 白银级  
         '白银级',
        // 34-50分 - 黄金级
         '黄金级',
        // 51-66分 - 钻石级
        '钻石级',
        // 67-83分 - 至尊级
        '至尊级',
        // 84-100分 - 王者级
          '王者级',
    ];
    
    if (score <= 16) {
        return levels[0];
    } else if (score <= 33) {
        return levels[1];
    } else if (score <= 50) {
        return levels[2];
    } else if (score <= 66) {
        return levels[3];
    } else if (score <= 83) {
        return levels[4];
    } else {
        return levels[5];
    }
}



    // 解释部分
    getInterpretation(score, times, answers) {
        const avgTime = times && times.length > 0 ? times.reduce((a,b)=>a+b,0)/times.length : 5000;
        
        // 开头模板
        const openings = [
            '通过深入分析', '基于您的回答', '综合评估显示', '从测试结果看', '根据答题模式',
            '从您的选择中', '基于测试数据', '根据您的表现', '从结果分析', '基于详细评估',
            '从您的回答模式', '综合分析显示', '根据测试表现', '从详细分析看', '基于全面评估',
            '根据情感模式', '从行为数据看', '基于心理分析', '从选择倾向看', '根据情感表达',
            '基于关系模式', '从情感倾向看', '根据行为模式', '基于心理特征', '从情感表达看',
            '根据关系特征', '基于行为特征', '从心理倾向看', '根据情感特征', '基于全面分析'
        ];
        
        // 中间部分
        let middleParts = [];
        if (score < 20) {
            middleParts = [
                '您在情感关系中展现出卓越的理性思维能力，几乎不受情绪波动影响',
                '您的情感自主性达到极高水准，能够在关系中保持完美的自我边界',
                '您在恋爱中展现出哲学家般的冷静思考，情感决策完全基于理性分析',
                '您的情感独立性堪称典范，能够在亲密关系中保持绝对的自我完整性',
                '您在感情处理上展现出工程师般的精准，每个决策都经过周密思考',
                '您的关系处理方式极为理性，情感因素很少影响您的判断',
                '您在恋爱中保持绝对的清醒，从不被情感冲昏头脑',
                '您的情感自控能力极强，能够完美平衡理智与情感',
                '您在关系中展现出超然的理性态度，情感波动极小',
                '您的恋爱观极为务实，情感投入经过精心计算和考量'
            ];
        } else if (score < 40) {
            middleParts = [
                '您在情感关系中保持高度理性，能够很好地在感性与理性间找到平衡',
                '您展现出优秀的情感管理能力，既能够投入又不失去自我判断',
                '您在恋爱中保持清醒头脑，情感决策既温暖又富有智慧',
                '您的情感独立性很强，能够在关系中保持健康的自我空间',
                '您在感情处理上展现出成熟的态度，既有温度又有原则',
                '您能够理性分析感情问题，同时不忽视情感需求',
                '您在关系中既有投入又有保留，展现出健康的恋爱观',
                '您的情感表达适度而克制，不会过度沉溺或完全抽离',
                '您懂得在亲密与独立间找到平衡点，关系处理游刃有余',
                '您的恋爱模式既现实又浪漫，能够在理想与现实间找到平衡'
            ];
        } else if (score < 60) {
            middleParts = [
                '您在恋爱关系中展现出健康的平衡状态，情感投入恰到好处',
                '您能够在亲密与独立间找到完美平衡，关系处理游刃有余',
                '您的情感智慧让人钦佩，既懂得付出又懂得保护自己',
                '您在关系中展现出成熟的情感管理能力，收放自如',
                '您的恋爱模式堪称典范，既有深度又不失自我',
                '您的情感表达自然而真诚，不会过度压抑也不会过分夸张',
                '您在关系中既能享受亲密，又能保持个人空间',
                '您的恋爱观健康而务实，既重视感情又不忽视现实',
                '您能够根据关系阶段调整投入程度，展现出情感智慧',
                '您在感情中既有热情又有理性，处理方式成熟而周到'
            ];
        } else if (score < 80) {
            middleParts = [
                '您在感情中投入较深，愿意为关系付出情感和精力',
                '您展现出温暖的情感连接能力，善于建立亲密关系',
                '您在恋爱中充满热情，愿意为爱情投入真心',
                '您的情感表达丰富而真诚，能够深度投入关系',
                '您在感情中展现出较强的依恋倾向，重视亲密连接',
                '您对感情投入较深，关系在您生活中占据重要位置',
                '您的情感世界丰富多彩，恋爱对您而言意义重大',
                '您在关系中愿意付出真心，情感表达热烈而真诚',
                '您重视情感连接，渴望建立深厚而持久的关系',
                '您的恋爱模式充满温情，愿意为爱情做出适度牺牲'
            ];
        } else {
            middleParts = [
                '您在恋爱中投入很深，情感丰富且愿意全心奉献',
                '您展现出强烈的情感投入倾向，爱情在您生活中占据重要位置',
                '您在关系中愿意付出全部，情感表达热烈而真诚',
                '您的恋爱模式充满激情，愿意为爱情做出较大牺牲',
                '您的情感世界丰富多彩，恋爱对您而言意义重大',
                '您在感情中全心全意，几乎将全部精力投入关系',
                '您的爱情观极为浪漫，愿意为理想爱情付出一切',
                '您在关系中极度投入，情感表达强烈而毫无保留',
                '您将爱情置于生活的中心，情感投入程度极深',
                '您的恋爱模式充满奉献精神，愿意为伴侣付出所有'
            ];
        }
        
        // 速度描述 - 修复版，更真实反映答题速度
        let speeds = [];
        if (avgTime < 1500) {
            speeds = [
                '您的决策速度极快，显示出强烈的直觉倾向', 
                '您几乎不假思索地做出选择，依赖第一感觉',
                '反应极其迅速，每个选择都在瞬间完成',
                '决策过程闪电般快速，展现出超强的直觉判断',
                '您的选择几乎不需要思考时间，完全依靠本能反应'
            ];
        } else if (avgTime < 3000) {
            speeds = [
                '您的决策速度较快，思维敏捷流畅',
                '您能快速做出判断，同时保持一定思考',
                '反应迅速，展现出良好的信息处理能力',
                '决策过程高效而准确，平衡了速度与质量',
                '您的思维运转很快，能够在短时间内做出明智选择'
            ];
        } else if (avgTime < 5000) {
            speeds = [
                '您的决策节奏适中，每个选择都经过适当思考',
                '您会花时间权衡选项，做出相对平衡的决定',
                '思考过程较为审慎，展现出成熟的判断风格',
                '决策速度不疾不徐，体现出稳健的思考模式',
                '您的选择经过适当考量，既不太冲动也不太犹豫'
            ];
        } else if (avgTime < 8000) {
            speeds = [
                '您的决策较为谨慎，会仔细考虑每个选项',
                '您倾向于深入思考，不急于做出决定',
                '决策过程相对缓慢，显示出审慎的个性特点',
                '您会认真权衡每个选择的利弊，不轻易下结论',
                '思考过程细致周到，体现出谨慎的决策风格'
            ];
        } else {
            speeds = [
                '您的决策非常谨慎，每个选择都经过深思熟虑',
                '您会反复权衡利弊，不轻易做出决定',
                '思考过程极其细致，展现出完美主义倾向',
                '决策前会进行深度思考，确保选择准确无误',
                '您的选择经过反复推敲，体现出极高的审慎度'
            ];
        }
        
        // 结尾模板
        const endings = [
            '这些特质为您的情感发展提供了坚实基础', '这些发现有助于优化您的关系模式', 
            '这些洞察将支持您建立更健康的关系', '这些特点可以帮助您更好地经营感情',
            '这些特质是您情感关系中的重要资源', '这些发现为您的情感成长提供方向',
            '这些洞察有助于您建立更满意的关系', '这些特点为您的情感健康提供支持',
            '这些特质有助于您建立更美好的关系', '这些发现为您的情感发展提供指导',
            '这些洞察支持您建立更幸福的关系', '这些特点有助于您的情感成长和发展',
            '这些特质为您的情感幸福奠定基础', '这些发现支持您建立更健康的情感模式',
            '这些洞察为您的情感关系提供宝贵指导', '这些特质为您的感情生活增添色彩',
            '这些发现为您的情感智慧提供养分', '这些洞察支持您的情感成长旅程',
            '这些特点为您的关系质量提供保障', '这些特质为您的爱情生活注入活力',
            '这些发现为您的感情发展指明方向', '这些洞察为您的情感健康保驾护航',
            '这些特点为您的恋爱关系增添深度', '这些特质为您的情感表达提供支持',
            '这些发现为您的感情经营提供智慧', '这些洞察为您的关系建设提供指导',
            '这些特点为您的情感发展铺平道路', '这些特质为您的爱情旅程增添意义',
            '这些发现为您的情感成长提供动力', '这些洞察为您的感情生活带来启发'
        ];
        
        // 连接词
        const connectors = [
            '综合来看，', '总体而言，', '从整体评估，', '综合分析表明，', '总体评估显示，',
            '综合表现说明，', '整体来看，', '总体分析认为，', '综合判断显示，', '整体评估表明，',
            '综合分析认为，', '总体来看，', '综合表现表明，', '整体分析显示，', '总体判断认为，'
        ];
        
        return `${this.selectContent(openings,'open')}，${this.selectContent(connectors,'connector')}${this.selectContent(middleParts,'middle')}。${this.selectContent(speeds,'speed')}。${this.selectContent(endings,'end')}。`;
    }

    // 分析部分 - 根据日记文章风格重写的维度描述
    getAnalysis(scores) {
        const result = {};
        const dimensions = ['dependency','selfworth','boundary','conflict','investment','idealization','sacrifice','jealousy','anxiety'];
        
        dimensions.forEach(dim => {
            const score = scores[dim] || 50;
            let analysis = '';
            
            // 为每个维度提供基于日记文章风格的描述
            switch(dim) {
                case 'dependency':
                    if (score < 20) {
                        analysis = '你在情感上极为独立，就像那个"双休是我最后底线"的自己，清楚地知道什么该要、什么该舍。不会因为恋爱就失去自我，保持着难得的清醒。';
                    } else if (score < 40) {
                        analysis = '你像那个"一边找工作一边找房子"的自己，虽然会依赖但总能调整过来。在感情里需要陪伴，但不会过度粘人，懂得保持适当的距离感。';
                    } else if (score < 60) {
                        analysis = '你就像日记里说的"一边被工作榨干精力，一边对身体的警报视而不见"，在感情里也常常这样矛盾。明明想保持独立，却又忍不住想靠近，在依赖和自主间寻找平衡。';
                    } else if (score < 80) {
                        analysis = '你比较依赖情感连接，就像那个"朝气满满却发加班朋友圈"的小姐姐，表面坚强内心渴望被理解。在关系里需要较多安全感，希望时刻感受到对方的在乎。';
                    } else {
                        analysis = '你的情感依赖度很高，像极了那个"把自己卷得那么紧绷"的国企姐姐。在感情里容易过度投入，把关系当作生活的重心，需要学会给自己留些空间。';
                    }
                    break;
                    
                case 'selfworth':
                    if (score < 20) {
                        analysis = '你的自我价值感很强，就像那个"开咖啡店不赚钱但乐意"的房东女儿，清楚地知道自己要什么。不会因为外界的评价而动摇，内心有坚定的坐标。';
                    } else if (score < 40) {
                        analysis = '你对自己的价值有清晰认识，像那个"放下身段去做工作"的大学生。虽然会参考他人看法，但主要基于自我认知，不会轻易被别人的评价带偏。';
                    } else if (score < 60) {
                        analysis = '你的自我价值感像日记里写的"我为什么会来到这里？我是来这里受苦受难的吗？"——在自信和怀疑间摇摆。部分来自内在，部分依赖关系反馈，还在寻找平衡。';
                    } else if (score < 80) {
                        analysis = '你比较在意伴侣的评价，就像那个"担心父母觉得丢脸"的咖啡师同学。自我感受容易受到关系状态的影响，需要对方的认可来确认自己的价值。';
                    } else {
                        analysis = '你的自我价值感很大程度上由关系决定，像极了那个"被辅导员逼就业"的毕业生。非常依赖伴侣的反馈，容易因为感情问题而否定自己的价值。';
                    }
                    break;
                    
                case 'boundary':
                    if (score < 20) {
                        analysis = '你的个人边界非常清晰，就像坚持"双休是我最后底线"的原则。在关系中懂得保护个人空间，不会因为恋爱就放弃自己的生活和爱好。';
                    } else if (score < 40) {
                        analysis = '你有良好的边界意识，像那个"薅羊毛但理性拒绝私教课"的自己。懂得在亲密中保持适当的距离，既享受连接又维护个人空间。';
                    } else if (score < 60) {
                        analysis = '你的边界设置比较灵活，像日记里那个"在稳定和探索间徘徊"的自己。会根据关系阶段调整个人边界，在融合和独立间寻找舒服的平衡点。';
                    } else if (score < 80) {
                        analysis = '你的边界意识较为模糊，像那个"把自己卷得紧绷"的国企姐姐。在关系中容易过度投入，有时会为了维持和谐而忽略自己的需要。';
                    } else {
                        analysis = '你的个人边界很模糊，像极了那个"每几个月进一次医院"的同学。在关系中容易失去自我，过度融合以至于忘记照顾自己的需求。';
                    }
                    break;
                    
                case 'conflict':
                    if (score < 20) {
                        analysis = '你处理冲突时极为理性，就像那个"10块钱过一天还能冷静规划"的自己。几乎不受情绪影响，能够客观分析问题，找到解决方案。';
                    } else if (score < 40) {
                        analysis = '你能较好地处理关系冲突，像那个"一边焦虑一边继续投简历"的求职者。虽然有情绪波动，但能较快恢复理性，建设性地解决问题。';
                    } else if (score < 60) {
                        analysis = '你在冲突中的反应像日记里写的"不是我们不抱怨了，而是我们沉默了"。会有情绪，但通常选择压抑，需要时间才能表达真实感受。';
                    } else if (score < 80) {
                        analysis = '你在冲突中情绪反应较强，像那个"半夜惊醒质疑人生"的自己。容易因为分歧而感到不安，需要较长时间才能平复心情理性沟通。';
                    } else {
                        analysis = '冲突对你的情绪影响很大，像极了那个"觉得穿越时空劫难开始"的凌晨。容易过度解读分歧，担心小的摩擦会导致关系破裂。';
                    }
                    break;
                    
                case 'investment':
                    if (score < 20) {
                        analysis = '你在关系中投入很节制，像那个"精打细算薅羊毛"的自己。懂得平衡感情和其他生活重点，不会让恋爱占据全部精力和时间。';
                    } else if (score < 40) {
                        analysis = '你的感情投入比较平衡，像坚持"双休底线"的理性派。关系只是生活的一部分，你会保留足够的个人空间和发展机会。';
                    } else if (score < 60) {
                        analysis = '你的投入程度比较健康，像日记里那个"既焦虑又继续学习新技能"的自己。在关系中付出真心，但不会完全忽略个人的成长和发展。';
                    } else if (score < 80) {
                        analysis = '你在感情中投入较深，像那个"跑滴滴送外卖的国企姐姐"。比较重视感情，愿意为关系调整个人计划，付出较多时间和精力。';
                    } else {
                        analysis = '你在感情中全心投入，像极了那个"每几个月进一次医院"的同学。几乎将关系置于首位，容易因为恋爱而忽略其他生活领域。';
                    }
                    break;
                    
                case 'idealization':
                    if (score < 20) {
                        analysis = '你对关系的期待非常现实，像那个"明白有个工作就不错了"的大学生。接受感情中的不完美，不会抱有不切实际的幻想。';
                    } else if (score < 40) {
                        analysis = '你的期望比较合理，像那个"从心高气傲到放下标准"的求职者。对爱情有美好向往，但保持现实基础，能够接受差异和局限。';
                    } else if (score < 60) {
                        analysis = '你对感情有适度期待，像日记里那个"在理想和现实间挣扎"的自己。既向往美好爱情，也明白"童话里都是骗人的"，在幻想和现实中寻找平衡。';
                    } else if (score < 80) {
                        analysis = '你容易将关系理想化，像那个"总觉得准备好才能开始"的好学生。对爱情有较高期待，有时会因为现实不如理想而感到失望。';
                    } else {
                        analysis = '你的爱情观极为浪漫，像极了那个"担心一切都会好起来"的天真派。容易过度理想化，对完美关系有执念，需要学习接受现实的不完美。';
                    }
                    break;
                    
                case 'sacrifice':
                    if (score < 20) {
                        analysis = '你很少为感情牺牲个人利益，像那个"理性拒绝私教课推销"的自己。懂得保护个人权益，有清晰的底线，不会过度付出。';
                    } else if (score < 40) {
                        analysis = '你的牺牲程度合理，像那个"精打细算但愿意为体验课走路"的务实派。愿意为关系付出，但会权衡利弊，不会损害自身利益。';
                    } else if (score < 60) {
                        analysis = '你愿意为感情做出适度牺牲，像日记里那个"在坚持和妥协间寻找出路"的自己。会为关系调整自己，但不会完全放弃个人目标和价值。';
                    } else if (score < 80) {
                        analysis = '你比较愿意为感情牺牲，像那个"跑副业到深夜的国企姐姐"。常常把关系需求放在首位，有时会忽略自己的需要和感受。';
                    } else {
                        analysis = '你极度愿意为感情牺牲，像极了那个"工作两三年就熬出病"的前任。几乎愿意为关系付出一切，容易在爱情中失去自我和底线。';
                    }
                    break;
                    
                case 'jealousy':
                    if (score < 20) {
                        analysis = '你的嫉妒心极低，像那个"坦然接受房东女儿开咖啡店"的豁达派。对伴侣有完全的信任，不会无故猜疑，安全感很强。';
                    } else if (score < 40) {
                        analysis = '你的嫉妒心较低，像那个"理解但不过度追问"的理性者。偶尔会有不安，但能很好控制，不会让猜忌影响关系质量。';
                    } else if (score < 60) {
                        analysis = '你会有适度的嫉妒，像日记里那个"对朋友圈加班图感同身受"的自己。属于正常的感情反应，但不会过度解读或过度控制。';
                    } else if (score < 80) {
                        analysis = '你的嫉妒心较强，像那个"对每个细节都很敏感"的焦虑者。比较在意伴侣的异性交往，需要较多的 reassurance 来获得安全感。';
                    } else {
                        analysis = '你的嫉妒心很强，像极了那个"死缠烂打推销课程"的教练。容易过度猜疑，任何细节都可能引发不安，严重影响关系信任。';
                    }
                    break;
                    
                case 'anxiety':
                    if (score < 20) {
                        analysis = '你在关系中极为安心，像那个"开咖啡店不赚钱但乐意"的从容派。对关系有绝对的信心，情绪非常稳定，不会无故担忧。';
                    } else if (score < 40) {
                        analysis = '你的关系焦虑较低，像那个"虽然焦虑但继续行动"的实践者。偶尔会担心，但能较快调整心态，不会让不安控制生活。';
                    } else if (score < 60) {
                        analysis = '你有适度的关系焦虑，像日记里写的"半夜惊醒坐在那里很无望"。会因感情问题担忧，但通常能够理性应对，不会过度影响判断。';
                    } else if (score < 80) {
                        analysis = '你的关系焦虑较强，像那个"总觉得自己不够好"的好学生。比较敏感，容易因小的摩擦而产生不安，需要伴侣较多的安抚。';
                    } else {
                        analysis = '你的关系焦虑很强，像极了那个"担心未来所有波动"的悲观者。经常感到强烈不安，任何小事都可能引发焦虑，影响关系质量。';
                    }
                    break;
                    
                default:
                    analysis = '这个维度的表现比较均衡，在感情中保持着难得的清醒和平衡。';
            }
            
            result[dim] = analysis;
        });
        
        return result;
    }

    // 解决方案
    getSolutions(totalScore, categoryScores, userProfile) {
        const allSolutions = [
            {
                title: '保持自我觉察',
                desc: '定期反思自己在关系中的状态和感受，避免过度投入或完全抽离',
                priorityFactors: ['highScore', 'all']
            },
            {
                title: '平衡生活重心', 
                desc: '确保恋爱关系不是生活的全部，保持工作、朋友和爱好的平衡',
                priorityFactors: ['highScore', 'investment', 'dependency']
            },
            {
                title: '建立健康边界',
                desc: '在亲密关系中保持适当的个人空间和独立性',
                priorityFactors: ['highScore', 'boundary', 'dependency']
            },
            {
                title: '增强自信心',
                desc: '不过度依赖对方的认可来确定自我价值，建立内在自信',
                priorityFactors: ['selfworth', 'dependency']
            },
            {
                title: '培养独立兴趣',
                desc: '保持个人爱好和社交圈子的独立性，丰富个人生活',
                priorityFactors: ['investment', 'dependency']
            },
            {
                title: '学习沟通技巧',
                desc: '用健康的方式表达需求和感受，避免压抑或过度要求',
                priorityFactors: ['conflict', 'all']
            },
            {
                title: '管理情绪波动',
                desc: '学会识别和处理关系中的焦虑、不安等情绪',
                priorityFactors: ['anxiety', 'jealousy']
            },
            {
                title: '保持理性思考',
                desc: '在感情用事时提醒自己保持客观，避免冲动决策',
                priorityFactors: ['lowScore', 'all']
            },
            {
                title: '设定个人目标',
                desc: '明确个人成长方向，不让恋爱关系阻碍自我发展',
                priorityFactors: ['investment', 'sacrifice']
            },
            {
                title: '接受不完美',
                desc: '理解关系中存在差异和冲突是正常的，学会包容',
                priorityFactors: ['idealization', 'conflict']
            },
            {
                title: '建立信任基础',
                desc: '培养对伴侣的信任感，减少不必要的猜疑和嫉妒',
                priorityFactors: ['jealousy', 'anxiety']
            },
            {
                title: '保持适度期待',
                desc: '对关系和伴侣保持合理的期望，避免过度理想化',
                priorityFactors: ['idealization', 'all']
            },
            {
                title: '学会适度依赖',
                desc: '在保持独立的同时，学会适时寻求支持和帮助',
                priorityFactors: ['lowScore', 'dependency']
            },
            {
                title: '培养情感韧性',
                desc: '增强应对关系挫折的能力，保持情绪稳定性',
                priorityFactors: ['anxiety', 'conflict']
            },
            {
                title: '定期关系检视',
                desc: '定期评估关系状态，及时调整相处模式',
                priorityFactors: ['all']
            }
        ];
        
        // 计算每个解决方案的优先级
        const scoredSolutions = allSolutions.map(sol => {
            let priority = 0;
            
            // 根据总分调整优先级
            if (sol.priorityFactors.includes('highScore') && totalScore > 60) {
                priority += 3;
            }
            if (sol.priorityFactors.includes('lowScore') && totalScore < 40) {
                priority += 3;
            }
            if (sol.priorityFactors.includes('all')) {
                priority += 1;
            }
            
            // 根据具体维度分数调整
            sol.priorityFactors.forEach(factor => {
                if (categoryScores[factor] > 70) {
                    priority += 2;
                } else if (categoryScores[factor] > 50) {
                    priority += 1;
                }
            });
            
            // 随机因素增加多样性
            priority += Math.random();
            
            return {
                title: sol.title,
                desc: sol.desc,
                priority: priority
            };
        });
        
        // 按优先级排序并选择前4个
        const selected = scoredSolutions
            .sort((a, b) => b.priority - a.priority)
            .slice(0, 4)
            .map(item => `${item.title}：${item.desc}`);
        
        return selected;
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
        
        // 计算答案的一致性（方差越小越一致）
        const mean = answers.reduce((a, b) => a + b, 0) / answers.length;
        const variance = answers.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / answers.length;
        const consistency = Math.max(0, 1 - variance / 2); // 归一化到0-1
        
        // 计算极端性（得分越接近极端值越极端）
        const extremity = answers.reduce((a, b) => a + Math.abs(b - 2.5), 0) / answers.length / 1.5;
        
        // 计算变异性（相邻答案差异的均值）
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