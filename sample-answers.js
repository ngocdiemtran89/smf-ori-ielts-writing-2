// ==================== SAMPLE ANSWERS 6.5 → 9.0 ====================
// Topic: "Some people believe that unpaid community service should be a compulsory 
// part of high school programmes. To what extent do you agree or disagree?"

const SAMPLE_TOPIC = "Some people believe that unpaid community service should be a compulsory part of high school programmes. To what extent do you agree or disagree?";

const SAMPLE_ANSWERS = [
    {
        band: 6.5,
        label: 'Band 6.5 — Competent',
        color: '#f39c12',
        essay: `It is true that some people think high school students should do community service without getting paid. I agree with this idea because it can help students learn many things.

Firstly, community service can help students learn about responsibility. When students work in their community, they will understand that they have a duty to help others. For example, students can help clean parks or visit old people in nursing homes. This will make them more responsible people.

Secondly, doing community service can help students get experience. Many students only study in school and they don't know about real life. If they do volunteer work, they can learn new skills that they cannot learn from books. This is very useful for their future career.

However, some people think that students are already busy with their studies. They have many subjects to learn and they don't have time for community service. Also, some students may not want to do it and they will not do a good job.

In conclusion, I believe that community service should be part of high school because it helps students become better people and learn useful skills. But schools should make sure that it does not affect students' studies too much.`,
        analysis: {
            taskResponse: 'Trả lời được câu hỏi nhưng chưa phát triển sâu. Ý tưởng còn chung chung, thiếu ví dụ cụ thể và data.',
            coherenceCohesion: 'Có paragraphing rõ ràng. Dùng linking words cơ bản (Firstly, Secondly, However). Nhưng hơi mechanical.',
            lexicalResource: 'Vốn từ đủ dùng nhưng lặp lại nhiều (students, learn, help). Thiếu từ vựng academic. Ít collocations.',
            grammaticalRange: 'Chủ yếu dùng câu đơn giản. Có một số câu phức nhưng lặp cấu trúc. Ít lỗi ngữ pháp nghiêm trọng.'
        }
    },
    {
        band: 7.0,
        label: 'Band 7.0 — Good',
        color: '#27ae60',
        essay: `There is a growing debate about whether unpaid community service should be mandatory in high school curricula. I strongly agree with this proposal, as I believe it offers significant benefits to young people's personal and social development.

The primary reason I support compulsory community service is that it fosters a sense of social responsibility among teenagers. By participating in activities such as volunteering at homeless shelters or organizing environmental clean-up campaigns, students are exposed to real-world social issues that textbooks cannot adequately convey. For instance, a study by the National Youth Service Foundation found that students who completed community service programmes were 30% more likely to continue volunteering as adults.

Furthermore, mandatory community service provides invaluable practical experience that complements academic learning. When students engage in projects such as tutoring younger children or assisting at local hospitals, they develop essential soft skills including teamwork, communication, and problem-solving. These competencies are increasingly valued by universities and employers alike, giving students a competitive advantage.

Nevertheless, it is important to acknowledge potential drawbacks. Forcing students to volunteer may lead to resentment rather than genuine compassion. Additionally, academic pressures already weigh heavily on high school students. Therefore, schools should implement flexible scheduling and allow students to choose activities that align with their interests.

In conclusion, while there are valid concerns about making community service compulsory, the benefits of developing responsible, empathetic citizens far outweigh the potential negatives. Schools should integrate community service thoughtfully, ensuring it enriches rather than burdens students' educational experience.`,
        analysis: {
            taskResponse: 'Trả lời đầy đủ câu hỏi, quan điểm rõ ràng (strongly agree). Có ví dụ cụ thể (statistics). Đề cập counter-argument.',
            coherenceCohesion: 'Tổ chức logic, mỗi đoạn có clear topic sentence. Dùng cohesive devices tốt (Furthermore, Nevertheless). Paragraphing hiệu quả.',
            lexicalResource: 'Vốn từ khá đa dạng: "fosters", "invaluable", "competencies". Có collocations tốt. Đôi khi vẫn dùng từ simple.',
            grammaticalRange: 'Có mix câu đơn và phức. Sử dụng relative clauses, conditional. Ít lỗi. Có thể thêm inversion, participle clauses.'
        }
    },
    {
        band: 7.5,
        label: 'Band 7.5 — Very Good',
        color: '#2ecc71',
        essay: `The question of whether high school students should be required to perform unpaid community service has sparked considerable debate in recent years. I am firmly of the opinion that integrating community service into high school programmes would be profoundly beneficial, both for individual students and for society as a whole.

One compelling argument in favour of mandatory community service is its capacity to cultivate empathy and social awareness among adolescents. In an era when young people are increasingly absorbed in digital worlds, direct involvement in community projects—such as supporting disadvantaged families or participating in environmental conservation—can bridge the gap between privilege and reality. Research from Harvard University's Graduate School of Education indicates that experiential learning through service significantly enhances students' moral reasoning and civic engagement.

Equally important is the professional development that community service facilitates. When students are placed in real-world settings, they acquire transferable skills that formal education alone cannot provide. Consider, for example, a student who volunteers at a local non-profit organisation; they must manage their time effectively, communicate with diverse groups, and adapt to unforeseen challenges. These are precisely the competencies that employers consistently rank as most desirable in prospective candidates.

Admittedly, concerns regarding academic overload are not without merit. However, rather than viewing community service as an additional burden, schools could integrate it into existing curricula through project-based learning modules. This approach would not only alleviate time pressure but would also create meaningful connections between classroom theory and practical application.

In conclusion, making community service a compulsory component of high school education would yield substantial benefits in terms of character development and skill acquisition. With thoughtful implementation, schools can ensure that this requirement enriches students' overall educational journey.`,
        analysis: {
            taskResponse: 'Trả lời xuất sắc, vị trí rõ ràng, ý tưởng phát triển tốt với evidence (Harvard research). Counter-argument được address hiệu quả với solution.',
            coherenceCohesion: 'Logic rất tốt, cohesive devices tự nhiên (Equally important, Admittedly, Consider). Topic sentences rõ ràng. Flow mượt.',
            lexicalResource: 'Vốn từ đa dạng: "cultivate empathy", "experiential learning", "transferable skills", "alleviate time pressure". Collocations tự nhiên.',
            grammaticalRange: 'Đa dạng cấu trúc: participle clauses, relative clauses, conditional. Complex sentences nhiều và chính xác. Rất ít lỗi.'
        }
    },
    {
        band: 8.0,
        label: 'Band 8.0 — Very Good',
        color: '#16a085',
        essay: `In recent years, there has been growing advocacy for the inclusion of unpaid community service as a mandatory element of high school education. I wholeheartedly support this position, contending that such programmes serve as a crucial bridge between academic learning and the development of socially responsible citizens.

Perhaps the most persuasive argument for compulsory community service lies in its transformative effect on young people's worldview. Adolescents who engage directly with marginalised communities—whether through mentoring underprivileged children, assisting elderly residents, or contributing to disaster relief efforts—gain firsthand exposure to socioeconomic realities that are often invisible within the confines of a classroom. Not only does this exposure foster empathy and compassion, but it also challenges the sense of entitlement that can develop in more privileged environments. A longitudinal study conducted by Stanford University's Center on Adolescence revealed that students who participated in structured service programmes demonstrated markedly higher levels of civic engagement and prosocial behaviour throughout adulthood.

Beyond its impact on personal development, compulsory community service equips students with an array of practical competencies that are indispensable in the modern workplace. Navigating the complexities of community projects demands adaptability, cross-cultural communication, and collaborative problem-solving—skills that cannot be adequately cultivated through traditional pedagogical approaches alone. Moreover, the experience of contributing meaningfully to one's community instils a powerful sense of agency, empowering students to recognise their capacity for positive change.

While critics may argue that mandatory service risks becoming a box-ticking exercise, this concern can be effectively mitigated through carefully designed programmes that prioritise student choice and reflection. By allowing students to select service activities aligned with their passions and requiring regular reflective journals, schools can ensure that the experience remains authentic and personally meaningful rather than perfunctory.

In light of the arguments presented, I am convinced that the integration of community service into high school curricula represents a progressive and necessary step towards nurturing well-rounded, socially conscious individuals. The potential benefits to both students and the wider community are simply too significant to overlook.`,
        analysis: {
            taskResponse: 'Hoàn toàn đáp ứng đề bài. Quan điểm mạnh mẽ, nhất quán. Ý tưởng được phát triển sâu với evidence thuyết phục (Stanford study). Counter-argument + solution rất tinh tế.',
            coherenceCohesion: 'Cohesion xuất sắc, không mechanical. Paragraphing hoàn hảo, mỗi đoạn có clear central theme. Progression tự nhiên. Dùng inversion tự nhiên (Not only...but also).',
            lexicalResource: 'Từ vựng sophisticated: "transformative effect", "marginalised communities", "prosocial behaviour", "perfunctory". Collocations tự nhiên, ít lặp.',
            grammaticalRange: 'Rất đa dạng: inversion, participle clauses, relative clauses, passive. Kiểm soát tốt, rất ít lỗi. Câu phức nhiều tầng.'
        }
    },
    {
        band: 9.0,
        label: 'Band 9.0 — Expert',
        color: '#8e44ad',
        essay: `The proposition that unpaid community service should constitute a compulsory component of high school programmes has generated considerable discourse among educationalists and policymakers. Having carefully weighed the merits and potential pitfalls of such a mandate, I am firmly persuaded that the systematic integration of community service into secondary education would yield profound benefits that extend far beyond the individual learner.

At the heart of the case for mandatory community service lies its unparalleled capacity to catalyse moral and emotional development during a critically formative period. When adolescents are immersed in environments where they witness and actively address genuine human need—be it through providing literacy support in immigrant communities, coordinating food distribution for the homeless, or facilitating recreational programmes for individuals with disabilities—they undergo a profound attitudinal shift. The abstract notions of equity and social justice that pervade classroom discourse acquire tangible, visceral meaning. It is precisely this experiential dimension that distinguishes transformative education from mere knowledge transmission. Empirical research consistently corroborates this assertion; a comprehensive meta-analysis published in the Journal of Educational Psychology, encompassing over 60 studies and 12,000 participants, concluded that well-structured service-learning programmes produced statistically significant improvements in students' social-emotional competence, academic engagement, and long-term civic participation.

Equally compelling is the pragmatic argument that community service furnishes students with a repertoire of sophisticated interpersonal and organisational skills that formal education, by its inherently structured nature, cannot fully replicate. The exigencies of community engagement—navigating cultural sensitivities, mediating competing priorities, devising creative solutions under resource constraints—constitute an invaluable apprenticeship in the very competencies that define effective leadership and professional excellence. Furthermore, the act of contributing tangibly to collective wellbeing engenders a sense of purpose and self-efficacy that has been shown to serve as a powerful protective factor against adolescent mental health challenges, including anxiety and depression.

Detractors may contend that compulsory volunteerism represents an oxymoron—that the intrinsic value of service is fundamentally compromised when it is imposed rather than freely chosen. While this philosophical objection carries superficial validity, it fails to acknowledge that many of history's most transformative educational innovations—from universal literacy to compulsory physical education—initially encountered similar resistance. The key lies not in whether participation is mandated but in how programmes are designed: when schools afford students genuine autonomy in selecting their service commitments and incorporate structured reflection to facilitate meaning-making, the distinction between compulsory and voluntary engagement becomes largely immaterial.

In summation, the case for embedding community service within high school curricula rests upon a robust foundation of educational theory, empirical evidence, and sound ethical reasoning. Far from being an imposition, such programmes represent an investment in the kind of citizenry that democratic societies urgently require—one characterised by empathy, competence, and an unwavering commitment to the common good.`,
        analysis: {
            taskResponse: 'Hoàn hảo. Quan điểm rõ ràng, nhất quán xuyên suốt bài. Ý tưởng phát triển cực sâu với meta-analysis evidence. Counter-argument được address một cách tinh tế, thông minh (philosophical level). Mọi phần đề bài được trả lời đầy đủ.',
            coherenceCohesion: 'Seamless cohesion. Paragraphing xuất sắc. Không có cohesive device nào thừa hay mechanical. Flow hoàn toàn tự nhiên. Central topic mỗi đoạn cực rõ. Transitions mượt mà: "At the heart of...", "Equally compelling...", "Detractors may contend...".',
            lexicalResource: 'Vốn từ exceptional: "catalyse moral development", "visceral meaning", "repertoire of sophisticated skills", "engenders self-efficacy", "immaterial". Collocations tự nhiên và chính xác hoàn toàn. Không lặp từ. Academic register xuất sắc.',
            grammaticalRange: 'Full flexibility: inversion, subjunctive, cleft sentences, participle clauses, complex noun phrases. Mọi cấu trúc đều chính xác. Câu dài nhưng vẫn clear. Không phát hiện lỗi.'
        }
    }
];
