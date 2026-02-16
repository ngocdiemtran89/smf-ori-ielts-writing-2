// ==================== ESSAY TYPES DATA ====================
const ESSAY_TYPES = [
    {
        id: 'opinion',
        name: 'Opinion (Agree/Disagree)',
        icon: '💬',
        description: 'Đề bài yêu cầu bạn đưa ra quan điểm cá nhân — đồng ý hay không đồng ý với một nhận định.',
        keywords: ['To what extent do you agree or disagree?', 'Do you agree or disagree?'],
        structure: {
            intro: 'Paraphrase đề bài + Thesis statement (nêu rõ quan điểm)',
            body1: 'Main idea 1 + Explanation + Example',
            body2: 'Main idea 2 + Explanation + Example',
            conclusion: 'Restate opinion + Summary of key points'
        },
        tips: [
            'Chọn 1 bên rõ ràng (fully agree / fully disagree / partially agree)',
            'Mỗi body paragraph = 1 main idea + giải thích + ví dụ cụ thể',
            'Không thay đổi quan điểm giữa bài',
            'Dùng "I believe", "In my opinion" ở introduction & conclusion'
        ],
        sampleQuestions: [
            'Some people think that the best way to reduce crime is to give longer prison sentences. Others, however, believe there are better alternative ways of reducing crime. Discuss both views and give your opinion.',
            'In many countries, the amount of crime is increasing. What do you think are the main causes of crime? How can we deal with those causes?',
            'Some people believe that unpaid community service should be a compulsory part of high school programmes. To what extent do you agree or disagree?',
            'Some people think that parents should teach children how to be good members of society. Others believe that school is the place to learn this. Discuss both views and give your opinion.',
            'Many people believe that social networking sites have had a huge negative impact on both individuals and society. To what extent do you agree or disagree?'
        ]
    },
    {
        id: 'discussion',
        name: 'Discussion (Both Views)',
        icon: '⚖️',
        description: 'Đề bài yêu cầu thảo luận cả hai quan điểm trước khi đưa ra ý kiến cá nhân.',
        keywords: ['Discuss both views and give your opinion', 'Discuss both sides'],
        structure: {
            intro: 'Paraphrase + Nêu 2 quan điểm + Thesis (your opinion)',
            body1: 'View 1 — giải thích + ví dụ (people who support...)',
            body2: 'View 2 — giải thích + ví dụ (on the other hand...)',
            conclusion: 'Restate your opinion + final thought'
        },
        tips: [
            'Thảo luận cả 2 bên một cách khách quan trước khi nêu ý kiến',
            'Body 1 & 2 nên cân bằng về độ dài',
            'Chỉ nêu opinion rõ ở intro + conclusion',
            'Dùng linking words: On one hand... On the other hand...'
        ],
        sampleQuestions: [
            'Some people think that all university students should study whatever they like. Others believe that they should only be allowed to study subjects that will be useful in the future. Discuss both views and give your opinion.',
            'Some people say that advertising is extremely successful at persuading us to buy things. Other people think that advertising is so common that we no longer pay attention to it. Discuss both views and give your opinion.',
            'Some people believe that it is best to accept a bad situation, such as an unsatisfactory job or shortage of money. Others argue that it is better to try and improve such situations. Discuss both views and give your own opinion.',
            'Some people think that a sense of competition in children should be encouraged. Others believe that children who are taught to co-operate rather than compete become more useful adults. Discuss both views and give your opinion.',
            'In some countries, owning a home rather than renting one is very important for people. Why might this be the case? Do you think this is a positive or negative situation?'
        ]
    },
    {
        id: 'advantages',
        name: 'Advantages & Disadvantages',
        icon: '📊',
        description: 'Đề bài yêu cầu phân tích mặt lợi và mặt hại của một vấn đề.',
        keywords: ['advantages outweigh the disadvantages', 'advantages and disadvantages', 'positive or negative development'],
        structure: {
            intro: 'Paraphrase + Thesis (advantages outweigh or not)',
            body1: 'Advantages — 2-3 điểm + giải thích + ví dụ',
            body2: 'Disadvantages — 2-3 điểm + giải thích + ví dụ',
            conclusion: 'Summary + Final opinion (which outweighs?)'
        },
        tips: [
            'Nếu đề hỏi "outweigh" → phải nêu rõ bên nào nặng hơn',
            'Nếu đề chỉ hỏi "advantages and disadvantages" → liệt kê cả 2, không bắt buộc chọn bên',
            'Dùng specific examples thay vì nói chung chung',
            'Transition: "Despite these benefits...", "However, it also brings..."'
        ],
        sampleQuestions: [
            'In some countries, many more people are choosing to live alone nowadays than in the past. Do you think this is a positive or negative development?',
            'Some experts believe that it is better for children to begin learning a foreign language at primary school rather than secondary school. Do the advantages of this outweigh the disadvantages?',
            'More and more people are migrating to cities in search of a better life, but city life can be extremely difficult. Explain some of the difficulties of living in a city. How can governments make urban life better for everyone?',
            'Nowadays many people choose to be self-employed, rather than to work for a company or organization. Why might this be the case? What could be the disadvantages of being self-employed?',
            'Countries are becoming more and more similar because people are able to buy the same products anywhere in the world. Do you think this is a positive or negative development?'
        ]
    },
    {
        id: 'problem',
        name: 'Problem & Solution',
        icon: '🔧',
        description: 'Đề bài yêu cầu xác định vấn đề và đề xuất giải pháp.',
        keywords: ['What problems does this cause?', 'What solutions can you suggest?', 'causes and solutions', 'problems and measures'],
        structure: {
            intro: 'Paraphrase + Overview of problems & solutions',
            body1: 'Problems — 2-3 vấn đề + giải thích + ví dụ',
            body2: 'Solutions — 2-3 giải pháp tương ứng + giải thích',
            conclusion: 'Summary + urgency / call to action'
        },
        tips: [
            'Mỗi Problem nên có Solution tương ứng',
            'Giải pháp phải thực tế, cụ thể (ai làm? làm gì? kết quả?)',
            'Dùng conditional: "If governments..., this would..."',
            'Có thể kết hợp causes + problems + solutions'
        ],
        sampleQuestions: [
            'In many cities the use of video cameras in public places is being increased in order to reduce crime, but some people believe that these measures restrict our individual freedom. Do the benefits of increased security outweigh the drawbacks?',
            'In the developed world, average life expectancy is increasing. What problems will this cause for individuals and society? Suggest some measures that could be taken to reduce the impact of ageing populations.',
            'In many countries, the gap between rich and poor is increasing. What problems does this cause? What solutions can governments implement?',
            'Global warming is one of the most serious issues facing the world today. What are the causes of global warming and what measures can governments and individuals take to tackle the issue?',
            'Many offenders commit more crimes after serving the first punishment. Why is this happening, and what measures can be taken to tackle this problem?'
        ]
    },
    {
        id: 'twopart',
        name: 'Two-Part Question',
        icon: '❓',
        description: 'Đề bài gồm 2 câu hỏi riêng biệt mà bạn cần trả lời lần lượt.',
        keywords: ['Why...? How...?', 'What...? Do you think...?', 'Why is this? Is this a positive or negative development?'],
        structure: {
            intro: 'Paraphrase + Brief answer to both questions',
            body1: 'Answer Question 1 — 2-3 reasons/points + examples',
            body2: 'Answer Question 2 — 2-3 reasons/points + examples',
            conclusion: 'Summary of both answers'
        },
        tips: [
            'Phải trả lời ĐỦ CẢ 2 câu hỏi, không bỏ sót',
            'Mỗi body paragraph dành cho 1 câu hỏi',
            'Cả 2 phần nên cân bằng về độ dài (~equal)',
            'Introduction nên preview câu trả lời cho cả 2 câu'
        ],
        sampleQuestions: [
            'Today more people are overweight than ever before. What in your opinion are the primary causes of this? What measures can be taken to overcome this epidemic?',
            'Some people argue that it is more important to have an enjoyable job than to earn a lot of money. Others disagree and think that a good salary leads to a better life. Discuss both views and give your own opinion.',
            'Many museums charge for admission while others are free. Do you think the advantages of charging people for admission to museums outweigh the disadvantages?',
            'More and more people are becoming seriously overweight. Some people say that the price increase of fattening food will solve this problem. To what extent do you agree or disagree? What other measures do you think might be effective?',
            'Happiness is considered very important in life. Why is it difficult to define? What factors are important in achieving happiness?'
        ]
    }
];
