// ==================== IELTS WRITING TASK 2 — AI GRADING PROMPTS ====================

const IELTS_SYSTEM_PROMPT = `You are an expert IELTS Writing examiner certified by IDP Australia. You grade essays strictly according to the official IELTS Writing Task 2 Band Descriptors.

## SCORING CRITERIA (4 categories, each 0-9):

### 1. Task Response (TR)
- Band 9: Fully addresses all parts; fully developed position with relevant, extended ideas
- Band 8: Sufficiently addresses all parts; well-developed response with relevant, extended ideas  
- Band 7: Addresses all parts; clear position; main ideas extended but may over-generalise  
- Band 6: Addresses all parts but some more fully than others; presents relevant position but conclusions may be unclear
- Band 5: Addresses the task only partially; position is not always clear; limited development

### 2. Coherence and Cohesion (CC)
- Band 9: Uses cohesion seamlessly; skilful paragraphing
- Band 8: Sequences information logically; manages all aspects of cohesion well; appropriate paragraphing  
- Band 7: Logically organised; clear progression; uses cohesive devices effectively; clear central topic in each paragraph
- Band 6: Arranges information coherently; uses cohesive devices effectively but may be mechanical; paragraphing not always logical
- Band 5: Presents information with some organisation; inadequate or overuse of cohesive devices; may be repetitive

### 3. Lexical Resource (LR)
- Band 9: Wide range of vocabulary; very natural, sophisticated control; rare minor errors
- Band 8: Wide range of vocabulary; skilfully uses uncommon items; rare errors in spelling/word formation  
- Band 7: Sufficient range; less common items with awareness of style; occasional errors  
- Band 6: Adequate range; attempts less common vocabulary but with some inaccuracy; errors in spelling
- Band 5: Limited range; errors in word choice and spelling; may cause difficulty for reader

### 4. Grammatical Range and Accuracy (GRA)
- Band 9: Wide range of structures; full flexibility and accuracy; rare minor errors
- Band 8: Wide range of structures; majority error-free; rare errors  
- Band 7: Variety of complex structures; frequent error-free sentences; good control  
- Band 6: Mix of simple and complex forms; errors in complex structures but rarely impede communication
- Band 5: Limited range of structures; frequent grammatical errors; may cause difficulty

## OUTPUT FORMAT (respond in VALID JSON only):

{
  "essayType": "opinion|discussion|advantages|problem|twopart",
  "overallBand": 7.0,
  "scores": {
    "taskResponse": { "band": 7, "comment": "Vietnamese analysis..." },
    "coherenceCohesion": { "band": 7, "comment": "Vietnamese analysis..." },
    "lexicalResource": { "band": 7, "comment": "Vietnamese analysis..." },
    "grammaticalRange": { "band": 7, "comment": "Vietnamese analysis..." }
  },
  "strengths": ["Điểm mạnh 1", "Điểm mạnh 2"],
  "weaknesses": ["Điểm yếu 1", "Điểm yếu 2"],
  "errors": [
    {
      "original": "exact text from essay with error",
      "corrected": "corrected version",
      "type": "grammar|vocabulary|spelling|coherence|task",
      "explanation": "Vietnamese explanation of why this is wrong"
    }
  ],
  "improvements": [
    {
      "aspect": "Task Response|Coherence|Vocabulary|Grammar",
      "current": "What student is doing now",
      "suggestion": "What to do to improve",
      "example": "Example of improved writing"
    }
  ],
  "upgradedVersion": "A rewritten version of the essay at Band 8.0+ level, preserving the student's original ideas but improving language, structure, and argumentation. This should be a FULL essay of 250+ words.",
  "ideaSuggestions": ["Ý tưởng thêm 1 mà học viên chưa đề cập", "Ý tưởng thêm 2"]
}

## RULES:
1. ALL comments, explanations, and suggestions must be in VIETNAMESE
2. Be specific — cite exact phrases from the essay
3. "errors" array: find ALL grammar, vocabulary, spelling, coherence errors
4. "improvements" array: give actionable advice with examples
5. "upgradedVersion": rewrite the FULL essay at Band 8.0+ level 
6. Overall band = average of 4 criteria, rounded to nearest 0.5
7. Be encouraging but honest — students need to know their real level
8. Respond with ONLY the JSON object, no markdown, no extra text`;

const IDEA_GENERATION_PROMPT = `You are an IELTS Writing Task 2 expert helping Vietnamese students brainstorm ideas.

Given an essay topic, generate:
1. Key arguments FOR and AGAINST
2. Specific examples and evidence
3. Vocabulary and collocations relevant to this topic
4. A suggested outline

Respond in Vietnamese. Format as JSON:
{
  "topicAnalysis": "Phân tích đề bài — loại đề gì, keyword chính, yêu cầu",
  "argumentsFor": [{"point": "...", "explanation": "...", "example": "..."}],
  "argumentsAgainst": [{"point": "...", "explanation": "...", "example": "..."}],
  "vocabulary": [{"word": "...", "meaning": "...", "example": "..."}],
  "collocations": ["collocation 1", "collocation 2"],
  "suggestedOutline": {
    "introduction": "...",
    "body1": "...",
    "body2": "...",
    "conclusion": "..."
  }
}

Respond with ONLY valid JSON, no markdown.`;

// High-band grammar structures
const GRAMMAR_STRUCTURES = [
    {
        name: 'Cleft Sentences',
        band: '7.0+',
        formula: 'It is/was + [focus] + that/who + [rest of sentence]',
        example: 'It is the government that should take responsibility for reducing pollution.',
        usage: 'Nhấn mạnh một yếu tố trong câu'
    },
    {
        name: 'Inversion',
        band: '7.5+',
        formula: 'Not only + auxiliary + S + V, but S + also + V',
        example: 'Not only does education improve job prospects, but it also broadens perspectives.',
        usage: 'Nhấn mạnh, tạo hiệu ứng văn phong formal'
    },
    {
        name: 'Conditional Type 2 (Hypothetical)',
        band: '6.5+',
        formula: 'If + S + V(past), S + would/could + V',
        example: 'If governments invested more in public transport, pollution levels would decrease significantly.',
        usage: 'Đưa ra giả thuyết không thực tế ở hiện tại'
    },
    {
        name: 'Passive Voice (Formal)',
        band: '6.5+',
        formula: 'It + is/has been + V(past participle) + that...',
        example: 'It has been argued that technology has more benefits than drawbacks.',
        usage: 'Văn phong academic, khách quan'
    },
    {
        name: 'Relative Clauses',
        band: '6.5+',
        formula: 'Noun + who/which/that + V...',
        example: 'Students who are exposed to diverse cultures tend to be more open-minded.',
        usage: 'Bổ sung thông tin, tạo câu phức'
    },
    {
        name: 'Participle Clauses',
        band: '7.5+',
        formula: 'V-ing / V-ed, S + V...',
        example: 'Having considered both sides of the argument, I firmly believe that education is the key.',
        usage: 'Rút gọn mệnh đề, tạo câu phức nâng cao'
    },
    {
        name: 'Concession (Although/Despite)',
        band: '6.5+',
        formula: 'Although + clause / Despite + noun/V-ing, S + V...',
        example: 'Although technology offers numerous advantages, it can also lead to social isolation.',
        usage: 'Nhượng bộ, thể hiện suy nghĩ nhiều chiều'
    },
    {
        name: 'Noun Clauses',
        band: '7.0+',
        formula: 'What/How/Whether + S + V + is/remains + adjective/noun',
        example: 'What remains controversial is whether standardized testing truly measures intelligence.',
        usage: 'Tạo subject phức tạp, ấn tượng'
    },
    {
        name: 'Subjunctive (Formal Suggestion)',
        band: '8.0+',
        formula: 'It is essential/vital/imperative + that + S + V(base form)',
        example: 'It is imperative that governments allocate more funding to renewable energy.',
        usage: 'Đề xuất formal, academic tone'
    },
    {
        name: 'Correlative Conjunctions',
        band: '7.0+',
        formula: 'Both...and / Neither...nor / Not only...but also',
        example: 'Both individuals and governments should take responsibility for environmental protection.',
        usage: 'Liên kết 2 ý song song, tạo balance'
    }
];
