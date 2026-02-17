// ==================== SMF + ORI IELTS WRITING TASK 2 PRO — APP.JS ====================

// ==================== STATE ====================
let timerInterval = null;
let timerSeconds = 40 * 60; // 40 minutes
let timerRunning = false;
const APP_PASSWORD = 'smfori';
const _K = ['g', 's', 'k', '_', 'f3PW', 'vHoK', 'scV0', 'OJnF', 'Jb1l', 'WGdy', 'b3FY', 'xzRw', 'MbP9', '8NeZ', '3rHB', 'wXDf', 'YsvO'].join('');

function getApiKey() {
    return localStorage.getItem('smf_groq_api_key') || _K;
}

// ==================== INIT ====================
document.addEventListener('DOMContentLoaded', () => {
    // Check login
    if (sessionStorage.getItem('smf_logged_in') === 'true') {
        showApp();
    }
});

// ==================== LOGIN ====================
function doLogin() {
    const pw = document.getElementById('loginPassword').value.trim();
    if (pw === APP_PASSWORD) {
        sessionStorage.setItem('smf_logged_in', 'true');
        showApp();
    } else {
        document.getElementById('loginError').textContent = '❌ Sai mật khẩu! Vui lòng thử lại.';
        document.getElementById('loginPassword').value = '';
        document.getElementById('loginPassword').focus();
    }
}

function showApp() {
    document.getElementById('loginScreen').classList.add('hidden');
    document.getElementById('appWrapper').style.display = '';
    initApp();
}

function initApp() {
    renderEssayTypes();
    renderGrammarStructures();
    renderSampleAnswers();
    renderQuestionBank();
    renderHistory();
    setupWordCount();
}

// ==================== TAB NAVIGATION ====================
function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.nav-tab').forEach(el => el.classList.remove('active'));
    document.getElementById('tab-' + tabId).classList.add('active');
    document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
}

// ==================== SETTINGS ====================
function openSettings() {
    const key = localStorage.getItem('smf_groq_api_key') || '';
    const model = localStorage.getItem('smf_groq_model') || 'llama-3.3-70b-versatile';
    document.getElementById('groqApiKey').value = key;
    document.getElementById('modelSelect').value = model;
    document.getElementById('settingsModal').classList.add('active');
}

function closeSettings() {
    document.getElementById('settingsModal').classList.remove('active');
}

function saveSettings() {
    const key = document.getElementById('groqApiKey').value.trim();
    const model = document.getElementById('modelSelect').value;
    if (!key) {
        showToast('⚠️ Vui lòng nhập Groq API Key!');
        return;
    }
    localStorage.setItem('smf_groq_api_key', key);
    localStorage.setItem('smf_groq_model', model);
    closeSettings();
    showToast('✅ Đã lưu cài đặt!');
}

// ==================== WORD COUNT ====================
function setupWordCount() {
    const input = document.getElementById('essayInput');
    const counter = document.getElementById('wordCount');
    input.addEventListener('input', () => {
        const words = input.value.trim().split(/\s+/).filter(w => w.length > 0).length;
        counter.textContent = `${words} từ`;
        counter.className = 'word-count';
        if (words >= 250) counter.classList.add('good');
        else if (words >= 200) counter.classList.add('warning');
    });
}

// ==================== TIMER ====================
function toggleTimer() {
    if (timerRunning) {
        clearInterval(timerInterval);
        timerRunning = false;
        document.getElementById('timerBtn').textContent = '⏱️ Tiếp tục';
    } else {
        timerRunning = true;
        document.getElementById('timerBtn').textContent = '⏸️ Tạm dừng';
        timerInterval = setInterval(() => {
            timerSeconds--;
            if (timerSeconds <= 0) {
                clearInterval(timerInterval);
                timerRunning = false;
                showToast('⏰ Hết giờ! 40 phút đã trôi qua.');
                document.getElementById('timerBtn').textContent = '⏱️ Hết giờ';
                return;
            }
            const mins = Math.floor(timerSeconds / 60);
            const secs = timerSeconds % 60;
            const display = document.getElementById('timerDisplay');
            display.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
            display.className = 'timer-text';
            if (timerSeconds <= 300) display.classList.add('danger');
            else if (timerSeconds <= 600) display.classList.add('warning');
        }, 1000);
    }
}

// ==================== ESSAY TYPE ====================
function updateEssayType() {
    const typeId = document.getElementById('essayTypeSelect').value;
    if (!typeId) return;
    const type = ESSAY_TYPES.find(t => t.id === typeId);
    if (type) {
        showToast(`📝 Đã chọn dạng bài: ${type.name}`);
    }
}

// ==================== AI GRADING ====================
async function gradeEssay() {
    const apiKey = getApiKey();

    const topic = document.getElementById('topicInput').value.trim();
    const essay = document.getElementById('essayInput').value.trim();
    const essayType = document.getElementById('essayTypeSelect').value;

    if (!topic) {
        showToast('⚠️ Vui lòng nhập đề bài!');
        return;
    }
    if (!essay) {
        showToast('⚠️ Vui lòng viết bài trước!');
        return;
    }

    const wordCount = essay.split(/\s+/).filter(w => w.length > 0).length;
    if (wordCount < 50) {
        showToast('⚠️ Bài viết quá ngắn! Tối thiểu 50 từ.');
        return;
    }

    showLoading(true);
    document.getElementById('gradeBtn').disabled = true;

    const model = localStorage.getItem('smf_groq_model') || 'llama-3.3-70b-versatile';

    const userMessage = `ESSAY TOPIC: ${topic}

ESSAY TYPE: ${essayType || 'auto-detect'}

STUDENT ESSAY (${wordCount} words):
${essay}

Please grade this essay according to the IELTS Writing Task 2 Band Descriptors. Provide your response as a valid JSON object.`;

    try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: model,
                messages: [
                    { role: 'system', content: IELTS_SYSTEM_PROMPT },
                    { role: 'user', content: userMessage }
                ],
                temperature: 0.3,
                max_tokens: 4000
            })
        });

        if (!response.ok) {
            const err = await response.json().catch(() => ({}));
            throw new Error(err.error?.message || `API Error: ${response.status}`);
        }

        const data = await response.json();
        const content = data.choices[0]?.message?.content || '';

        // Parse JSON from response
        let result;
        try {
            // Try to find JSON in the response
            const jsonMatch = content.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                result = JSON.parse(jsonMatch[0]);
            } else {
                throw new Error('No JSON found');
            }
        } catch (e) {
            throw new Error('Không thể phân tích kết quả từ AI. Vui lòng thử lại.');
        }

        renderResults(result);
        saveToHistory(topic, essay, essayType, result);
        showToast('✅ Chấm bài thành công!');

    } catch (error) {
        showToast(`❌ Lỗi: ${error.message}`);
        console.error('Grading error:', error);
    } finally {
        showLoading(false);
        document.getElementById('gradeBtn').disabled = false;
    }
}

// ==================== RENDER RESULTS ====================
function renderResults(result) {
    const panel = document.getElementById('resultsPanel');
    const scores = result.scores || {};

    panel.innerHTML = `
        <!-- Overall Score -->
        <div class="overall-score">
            <div class="score-number">${result.overallBand || '—'}</div>
            <div class="score-label">Overall Band Score</div>
        </div>

        <!-- 4 Criteria -->
        <div class="criteria-scores">
            <div class="criteria-card tr">
                <div class="criteria-header">
                    <span class="criteria-name">Task Response</span>
                    <span class="criteria-band">${scores.taskResponse?.band || '—'}</span>
                </div>
                <div class="criteria-comment">${scores.taskResponse?.comment || ''}</div>
            </div>
            <div class="criteria-card cc">
                <div class="criteria-header">
                    <span class="criteria-name">Coherence & Cohesion</span>
                    <span class="criteria-band">${scores.coherenceCohesion?.band || '—'}</span>
                </div>
                <div class="criteria-comment">${scores.coherenceCohesion?.comment || ''}</div>
            </div>
            <div class="criteria-card lr">
                <div class="criteria-header">
                    <span class="criteria-name">Lexical Resource</span>
                    <span class="criteria-band">${scores.lexicalResource?.band || '—'}</span>
                </div>
                <div class="criteria-comment">${scores.lexicalResource?.comment || ''}</div>
            </div>
            <div class="criteria-card gra">
                <div class="criteria-header">
                    <span class="criteria-name">Grammar Range & Accuracy</span>
                    <span class="criteria-band">${scores.grammaticalRange?.band || '—'}</span>
                </div>
                <div class="criteria-comment">${scores.grammaticalRange?.comment || ''}</div>
            </div>
        </div>

        <!-- Strengths -->
        ${result.strengths?.length ? `
        <div class="sw-section">
            <h3>✅ Điểm mạnh</h3>
            <ul class="sw-list strengths">
                ${result.strengths.map(s => `<li>✓ ${s}</li>`).join('')}
            </ul>
        </div>
        ` : ''}

        <!-- Weaknesses -->
        ${result.weaknesses?.length ? `
        <div class="sw-section">
            <h3>⚠️ Điểm cần cải thiện</h3>
            <ul class="sw-list weaknesses">
                ${result.weaknesses.map(w => `<li>✗ ${w}</li>`).join('')}
            </ul>
        </div>
        ` : ''}

        <!-- Errors -->
        ${result.errors?.length ? `
        <div class="errors-section">
            <div class="collapsible-header" onclick="toggleCollapsible(this)">
                <h3>🔍 Lỗi cụ thể (${result.errors.length})</h3>
                <span>▼</span>
            </div>
            <div class="collapsible-content open">
                ${result.errors.map(e => `
                    <div class="error-card">
                        <span class="error-type ${e.type || 'grammar'}">${e.type || 'grammar'}</span>
                        <div class="error-original">❌ ${escapeHtml(e.original || '')}</div>
                        <div class="error-corrected">✅ ${escapeHtml(e.corrected || '')}</div>
                        <div class="error-explanation">💡 ${e.explanation || ''}</div>
                    </div>
                `).join('')}
            </div>
        </div>
        ` : ''}

        <!-- Improvements -->
        ${result.improvements?.length ? `
        <div class="errors-section">
            <div class="collapsible-header" onclick="toggleCollapsible(this)">
                <h3>🚀 Gợi ý cải thiện</h3>
                <span>▼</span>
            </div>
            <div class="collapsible-content open">
                ${result.improvements.map(imp => `
                    <div class="improvement-card">
                        <div class="improvement-aspect">${imp.aspect || ''}</div>
                        <p><strong>Hiện tại:</strong> ${imp.current || ''}</p>
                        <p><strong>Nên làm:</strong> ${imp.suggestion || ''}</p>
                        ${imp.example ? `<div class="improvement-example">${imp.example}</div>` : ''}
                    </div>
                `).join('')}
            </div>
        </div>
        ` : ''}

        <!-- Idea Suggestions -->
        ${result.ideaSuggestions?.length ? `
        <div class="sw-section">
            <h3>💡 Ý tưởng bổ sung</h3>
            <ul class="sw-list strengths">
                ${result.ideaSuggestions.map(i => `<li>💡 ${i}</li>`).join('')}
            </ul>
        </div>
        ` : ''}

        <!-- Upgraded Version -->
        ${result.upgradedVersion ? `
        <div class="upgraded-section">
            <div class="collapsible-header" onclick="toggleCollapsible(this)">
                <h3>🏆 Bài viết mẫu Band 8.0+</h3>
                <span>▼</span>
            </div>
            <div class="collapsible-content">
                <div class="upgraded-essay">${escapeHtml(result.upgradedVersion)}</div>
            </div>
        </div>
        ` : ''}
    `;

    // Scroll to results on mobile
    if (window.innerWidth <= 900) {
        panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function toggleCollapsible(header) {
    const content = header.nextElementSibling;
    content.classList.toggle('open');
    const arrow = header.querySelector('span');
    arrow.textContent = content.classList.contains('open') ? '▼' : '▶';
}

// ==================== IDEAS GENERATION ====================
async function generateIdeas() {
    const apiKey = getApiKey();

    const topic = document.getElementById('topicInput').value.trim();
    if (!topic) {
        showToast('⚠️ Nhập đề bài trước khi tạo gợi ý!');
        return;
    }

    const btn = document.getElementById('ideasBtn');
    btn.disabled = true;
    btn.textContent = '⏳ Đang tạo...';

    const model = localStorage.getItem('smf_groq_model') || 'llama-3.3-70b-versatile';

    try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: model,
                messages: [
                    { role: 'system', content: IDEA_GENERATION_PROMPT },
                    { role: 'user', content: `Topic: ${topic}` }
                ],
                temperature: 0.5,
                max_tokens: 2000
            })
        });

        if (!response.ok) throw new Error('API Error');

        const data = await response.json();
        const content = data.choices[0]?.message?.content || '';

        let ideas;
        try {
            const jsonMatch = content.match(/\{[\s\S]*\}/);
            ideas = JSON.parse(jsonMatch[0]);
        } catch (e) {
            throw new Error('Parse error');
        }

        renderIdeas(ideas);
        document.getElementById('ideasPanel').classList.remove('hidden');

    } catch (error) {
        showToast('❌ Không thể tạo gợi ý. Thử lại!');
    } finally {
        btn.disabled = false;
        btn.textContent = '💡 Gợi ý ý tưởng';
    }
}

// ==================== SAMPLE ESSAY GENERATION ====================
async function generateSampleEssay(topicOverride) {
    const apiKey = getApiKey();
    const topic = topicOverride || document.getElementById('topicInput').value.trim();
    if (!topic) {
        showToast('⚠️ Nhập đề bài trước khi tạo bài mẫu!');
        return;
    }

    // If called from question bank, switch to write tab first
    if (topicOverride) {
        switchTab('write');
        document.getElementById('topicInput').value = topic;
    }

    const btn = document.getElementById('sampleBtn');
    btn.disabled = true;
    btn.innerHTML = '⏳ Đang tạo bài mẫu...';

    const model = localStorage.getItem('smf_groq_model') || 'llama-3.3-70b-versatile';
    const essayType = document.getElementById('essayTypeSelect').value;
    const targetBand = document.getElementById('targetBandSelect').value || '8.0';

    try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: model,
                messages: [
                    { role: 'system', content: SAMPLE_ESSAY_PROMPT },
                    { role: 'user', content: `Topic: ${topic}${essayType ? `\nEssay Type: ${essayType}` : ''}\nTarget Band Score: ${targetBand}` }
                ],
                temperature: 0.7,
                max_tokens: 3000
            })
        });

        if (!response.ok) throw new Error('API Error');

        const data = await response.json();
        const content = data.choices[0]?.message?.content || '';

        let sampleData;
        try {
            const jsonMatch = content.match(/\{[\s\S]*\}/);
            sampleData = JSON.parse(jsonMatch[0]);
        } catch (e) {
            throw new Error('Parse error');
        }

        renderSampleEssayResult(sampleData);
        showToast('✅ Đã tạo bài mẫu Band 8.0+ thành công!');

    } catch (error) {
        showToast('❌ Không thể tạo bài mẫu. Thử lại!');
    } finally {
        btn.disabled = false;
        btn.innerHTML = '✍️ Tạo bài mẫu AI';
    }
}

function renderSampleEssayResult(data) {
    const band = data.bandScore || '8.0';
    const panel = document.getElementById('resultsPanel');
    panel.innerHTML = `
        <div class="result-section">
            <div class="result-header">
                <h2>✍️ Bài mẫu Band ${band}</h2>
                <div class="result-band" style="background: linear-gradient(135deg, #10b981, #059669);">${band}</div>
            </div>
        </div>

        <div class="result-section">
            <h3>📄 Bài viết mẫu Band ${band} (${data.wordCount || '~300'} từ)</h3>
            <div class="upgraded-essay">${(data.essay || '').replace(/\n/g, '<br>')}</div>
            <button class="btn btn-sm" style="margin-top:10px" onclick="navigator.clipboard.writeText(document.querySelector('.upgraded-essay')?.innerText || ''); showToast('📋 Đã copy bài mẫu!')">📋 Copy bài mẫu</button>
        </div>

        ${data.structure ? `
        <div class="result-section">
            <h3>🏗️ Phân tích cấu trúc</h3>
            <div class="structure-breakdown">
                <div class="structure-item">
                    <span class="structure-label">📌 Introduction:</span>
                    <span>${data.structure.introduction}</span>
                </div>
                <div class="structure-item">
                    <span class="structure-label">📌 Body 1:</span>
                    <span>${data.structure.body1}</span>
                </div>
                <div class="structure-item">
                    <span class="structure-label">📌 Body 2:</span>
                    <span>${data.structure.body2}</span>
                </div>
                <div class="structure-item">
                    <span class="structure-label">📌 Conclusion:</span>
                    <span>${data.structure.conclusion}</span>
                </div>
            </div>
        </div>` : ''}

        ${data.keyVocabulary ? `
        <div class="result-section">
            <h3>📚 Từ vựng nổi bật</h3>
            <div class="vocab-grid-result">
                ${data.keyVocabulary.map(v => `
                    <div class="vocab-chip">
                        <strong>${v.word}</strong> — ${v.meaning}
                    </div>
                `).join('')}
            </div>
        </div>` : ''}

        ${data.grammarHighlights ? `
        <div class="result-section">
            <h3>🔤 Cấu trúc ngữ pháp nâng cao</h3>
            ${data.grammarHighlights.map(g => `
                <div class="grammar-highlight">
                    <span class="grammar-name">${g.structure}:</span>
                    <span class="grammar-ex">"${g.example}"</span>
                </div>
            `).join('')}
        </div>` : ''}
    `;
}

function renderIdeas(ideas) {
    const el = document.getElementById('ideasContent');
    el.innerHTML = `
        <h4>📋 Phân tích đề bài</h4>
        <p>${ideas.topicAnalysis || ''}</p>

        ${ideas.argumentsFor?.length ? `
        <h4>✅ Luận điểm ỦNG HỘ</h4>
        <ul>${ideas.argumentsFor.map(a => `<li><strong>${a.point}</strong>: ${a.explanation} <em>(VD: ${a.example})</em></li>`).join('')}</ul>
        ` : ''}

        ${ideas.argumentsAgainst?.length ? `
        <h4>❌ Luận điểm PHẢN ĐỐI</h4>
        <ul>${ideas.argumentsAgainst.map(a => `<li><strong>${a.point}</strong>: ${a.explanation} <em>(VD: ${a.example})</em></li>`).join('')}</ul>
        ` : ''}

        ${ideas.vocabulary?.length ? `
        <h4>📚 Từ vựng chủ đề</h4>
        <ul>${ideas.vocabulary.map(v => `<li><strong>${v.word}</strong> — ${v.meaning}. <em>"${v.example}"</em></li>`).join('')}</ul>
        ` : ''}

        ${ideas.collocations?.length ? `
        <h4>🔗 Collocations</h4>
        <p>${ideas.collocations.join(' • ')}</p>
        ` : ''}

        ${ideas.suggestedOutline ? `
        <h4>📝 Outline gợi ý</h4>
        <ul>
            <li><strong>Introduction:</strong> ${ideas.suggestedOutline.introduction}</li>
            <li><strong>Body 1:</strong> ${ideas.suggestedOutline.body1}</li>
            <li><strong>Body 2:</strong> ${ideas.suggestedOutline.body2}</li>
            <li><strong>Conclusion:</strong> ${ideas.suggestedOutline.conclusion}</li>
        </ul>
        ` : ''}
    `;
}

function closeIdeas() {
    document.getElementById('ideasPanel').classList.add('hidden');
}

// ==================== RENDER ESSAY TYPES ====================
function renderEssayTypes() {
    const grid = document.getElementById('typesGrid');
    grid.innerHTML = ESSAY_TYPES.map(type => `
        <div class="type-card" id="type-${type.id}">
            <div class="type-card-header" onclick="toggleTypeCard('${type.id}')">
                <div class="type-card-title">
                    <span class="type-icon">${type.icon}</span>
                    <div>
                        <div class="type-name">${type.name}</div>
                        <div class="type-desc">${type.description}</div>
                    </div>
                </div>
                <span class="type-toggle">▼</span>
            </div>
            <div class="type-body">
                <div class="type-body-inner">
                    <div class="section-label">📐 Cấu trúc bài viết</div>
                    <div class="structure-grid">
                        <div class="structure-item"><span class="structure-label">Introduction:</span> ${type.structure.intro}</div>
                        <div class="structure-item"><span class="structure-label">Body 1:</span> ${type.structure.body1}</div>
                        <div class="structure-item"><span class="structure-label">Body 2:</span> ${type.structure.body2}</div>
                        <div class="structure-item"><span class="structure-label">Conclusion:</span> ${type.structure.conclusion}</div>
                    </div>
                    <div class="section-label">💡 Mẹo viết</div>
                    <ul class="tips-list">
                        ${type.tips.map(t => `<li>${t}</li>`).join('')}
                    </ul>
                    <div class="section-label">📋 Đề mẫu</div>
                    <ol class="questions-list">
                        ${type.sampleQuestions.map(q => `<li><em>${q}</em></li>`).join('')}
                    </ol>
                </div>
            </div>
        </div>
    `).join('');
}

function toggleTypeCard(id) {
    document.getElementById('type-' + id).classList.toggle('open');
}

// ==================== RENDER GRAMMAR ====================
function renderGrammarStructures() {
    const grid = document.getElementById('grammarGrid');
    grid.innerHTML = GRAMMAR_STRUCTURES.map(g => `
        <div class="grammar-card">
            <div class="grammar-card-header">
                <span class="grammar-name">${g.name}</span>
                <span class="grammar-band">Band ${g.band}</span>
            </div>
            <div class="grammar-formula">${g.formula}</div>
            <div class="grammar-example">"${g.example}"</div>
            <div class="grammar-usage">🎯 ${g.usage}</div>
        </div>
    `).join('');
}

// ==================== RENDER SAMPLE ANSWERS ====================
function renderSampleAnswers() {
    // Set topic
    document.getElementById('sampleTopic').textContent = SAMPLE_TOPIC;

    // Band tabs
    const tabsEl = document.getElementById('bandTabs');
    tabsEl.innerHTML = SAMPLE_ANSWERS.map((s, i) => `
        <button class="band-tab ${i === 0 ? 'active' : ''}" 
                onclick="showSampleBand(${i})" 
                style="${i === 0 ? `background:${s.color}; border-color:${s.color}; color:white;` : ''}"
                data-color="${s.color}">
            ${s.label}
        </button>
    `).join('');

    showSampleBand(0);
}

function showSampleBand(index) {
    const sample = SAMPLE_ANSWERS[index];
    if (!sample) return;

    // Update tab styles
    document.querySelectorAll('.band-tab').forEach((tab, i) => {
        tab.classList.remove('active');
        tab.style.background = '';
        tab.style.borderColor = '';
        tab.style.color = '';
        if (i === index) {
            tab.classList.add('active');
            tab.style.background = tab.dataset.color;
            tab.style.borderColor = tab.dataset.color;
            tab.style.color = 'white';
        }
    });

    const el = document.getElementById('sampleContent');
    el.innerHTML = `
        <div class="sample-essay-box">${escapeHtml(sample.essay)}</div>
        <h3 style="font-size:14px; margin-bottom:12px;">📊 Phân tích theo 4 tiêu chí (Tại sao đạt Band ${sample.band}?)</h3>
        <div class="sample-analysis">
            <div class="analysis-card tr">
                <div class="analysis-label">Task Response</div>
                <div class="analysis-text">${sample.analysis.taskResponse}</div>
            </div>
            <div class="analysis-card cc">
                <div class="analysis-label">Coherence & Cohesion</div>
                <div class="analysis-text">${sample.analysis.coherenceCohesion}</div>
            </div>
            <div class="analysis-card lr">
                <div class="analysis-label">Lexical Resource</div>
                <div class="analysis-text">${sample.analysis.lexicalResource}</div>
            </div>
            <div class="analysis-card gra">
                <div class="analysis-label">Grammar Range & Accuracy</div>
                <div class="analysis-text">${sample.analysis.grammaticalRange}</div>
            </div>
        </div>
    `;
}

// ==================== HISTORY ====================
function saveToHistory(topic, essay, essayType, result) {
    const history = JSON.parse(localStorage.getItem('smf_ielts_history') || '[]');
    history.unshift({
        id: Date.now(),
        date: new Date().toISOString(),
        topic,
        essay,
        essayType,
        result
    });
    // Keep max 10 entries to save storage
    while (history.length > 10) history.pop();
    localStorage.setItem('smf_ielts_history', JSON.stringify(history));
    renderHistory();
}

function renderHistory() {
    const list = document.getElementById('historyList');
    const history = JSON.parse(localStorage.getItem('smf_ielts_history') || '[]');

    if (history.length === 0) {
        list.innerHTML = `
            <div class="history-empty">
                <span class="history-empty-icon">📝</span>
                Chưa có bài viết nào. Hãy viết bài đầu tiên!
            </div>
        `;
        return;
    }

    list.innerHTML = history.map(entry => {
        const scores = entry.result.scores || {};
        const date = new Date(entry.date);
        const dateStr = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;

        return `
            <div class="history-card" onclick="loadHistory(${entry.id})">
                <div class="history-card-header">
                    <span class="history-band">${entry.result.overallBand || '—'}</span>
                    <span class="history-date">${dateStr}</span>
                </div>
                <div class="history-topic">${escapeHtml(entry.topic)}</div>
                <div class="history-scores">
                    <span class="history-score-badge">TR: ${scores.taskResponse?.band || '—'}</span>
                    <span class="history-score-badge">CC: ${scores.coherenceCohesion?.band || '—'}</span>
                    <span class="history-score-badge">LR: ${scores.lexicalResource?.band || '—'}</span>
                    <span class="history-score-badge">GRA: ${scores.grammaticalRange?.band || '—'}</span>
                </div>
            </div>
        `;
    }).join('');
}

function loadHistory(id) {
    const history = JSON.parse(localStorage.getItem('smf_ielts_history') || '[]');
    const entry = history.find(h => h.id === id);
    if (!entry) return;

    // Switch to write tab
    switchTab('write');

    // Fill in data
    document.getElementById('topicInput').value = entry.topic;
    document.getElementById('essayInput').value = entry.essay;
    if (entry.essayType) document.getElementById('essayTypeSelect').value = entry.essayType;

    // Render results
    renderResults(entry.result);

    // Update word count
    const words = entry.essay.trim().split(/\s+/).filter(w => w.length > 0).length;
    const counter = document.getElementById('wordCount');
    counter.textContent = `${words} từ`;
    counter.className = 'word-count good';

    showToast('📝 Đã tải lại bài viết!');
}

// ==================== CLEAR ====================
function clearEssay() {
    document.getElementById('topicInput').value = '';
    document.getElementById('essayInput').value = '';
    document.getElementById('essayTypeSelect').value = '';
    document.getElementById('wordCount').textContent = '0 từ';
    document.getElementById('wordCount').className = 'word-count';
    document.getElementById('ideasPanel').classList.add('hidden');

    // Reset results
    document.getElementById('resultsPanel').innerHTML = `
        <div class="results-placeholder">
            <div class="placeholder-icon">📊</div>
            <h3>Kết quả chấm bài</h3>
            <p>Viết bài và nhấn "Chấm bài AI" để nhận kết quả chi tiết theo rubric IELTS IDP.</p>
            <div class="rubric-preview">
                <div class="rubric-item"><span class="rubric-label">TR</span> Task Response</div>
                <div class="rubric-item"><span class="rubric-label">CC</span> Coherence & Cohesion</div>
                <div class="rubric-item"><span class="rubric-label">LR</span> Lexical Resource</div>
                <div class="rubric-item"><span class="rubric-label">GRA</span> Grammar Range & Accuracy</div>
            </div>
        </div>
    `;

    // Reset timer
    if (timerRunning) {
        clearInterval(timerInterval);
        timerRunning = false;
    }
    timerSeconds = 40 * 60;
    document.getElementById('timerDisplay').textContent = '';
    document.getElementById('timerBtn').textContent = '⏱️ Bắt đầu 40:00';

    showToast('🗑️ Đã xóa!');
}

// ==================== UTILITIES ====================
function showLoading(show) {
    const el = document.getElementById('loadingOverlay');
    if (show) {
        el.classList.add('active');
        animateLoadingText();
    } else {
        el.classList.remove('active');
    }
}

function animateLoadingText() {
    const texts = [
        'Phân tích Task Response...',
        'Đánh giá Coherence & Cohesion...',
        'Kiểm tra Lexical Resource...',
        'Phân tích Grammatical Range & Accuracy...',
        'Tìm lỗi và gợi ý cải thiện...',
        'Viết bài mẫu Band 8.0+...'
    ];
    let i = 0;
    const el = document.getElementById('loadingText');
    const interval = setInterval(() => {
        if (!document.getElementById('loadingOverlay').classList.contains('active')) {
            clearInterval(interval);
            return;
        }
        el.textContent = texts[i % texts.length];
        i++;
    }, 2000);
}

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// ==================== QUESTION BANK ====================
function renderQuestionBank() {
    const grid = document.getElementById('questionsGrid');
    let cardId = 0;
    grid.innerHTML = CAMBRIDGE_QUESTIONS.map(book => `
        <div class="qbank-book">
            <div class="qbank-book-title">
                📖 ${book.book}
                <span class="qbank-book-year">(${book.year})</span>
            </div>
            ${book.questions.map(q => {
        const id = 'vocab-' + (cardId++);
        return `
                <div class="qbank-card" data-type="${q.type}">
                    <div class="qbank-card-header">
                        <span class="qbank-test-name">${q.test}</span>
                        <span class="qbank-type-badge">${TYPE_LABELS[q.type] || q.type}</span>
                    </div>
                    <div class="qbank-topic">${q.topic}</div>
                    <div class="qbank-actions">
                        <button class="btn-use-topic" onclick="useTopic('${escapeAttr(q.topic)}', '${q.type}')">📝 Dùng đề này</button>
                        <button class="btn-sample-qbank" onclick="generateSampleEssay('${escapeAttr(q.topic)}')">✍️ Tạo bài mẫu</button>
                        <button class="btn-show-vocab" onclick="toggleVocab('${id}', this)">📚 Từ vựng gợi ý</button>
                    </div>
                    ${q.vocabulary ? `
                    <div class="qbank-vocab" id="${id}">
                        <div class="vocab-title">📚 Từ vựng tham khảo cho đề bài này:</div>
                        <div class="vocab-grid">
                            ${q.vocabulary.map(v => `
                                <div class="vocab-item">
                                    <div class="vocab-word">${v.word}</div>
                                    <div class="vocab-meaning">${v.meaning}</div>
                                    <div class="vocab-example">"${v.example}"</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>` : ''}
                </div>`;
    }).join('')}
        </div>
    `).join('');
}

function toggleVocab(id, btn) {
    const el = document.getElementById(id);
    if (!el) return;
    const isVisible = el.classList.toggle('visible');
    btn.textContent = isVisible ? '🔽 Ẩn từ vựng' : '📚 Từ vựng gợi ý';
}

function filterQuestions(type, btn) {
    document.querySelectorAll('.qbank-filter').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    document.querySelectorAll('.qbank-card').forEach(card => {
        if (type === 'all' || card.dataset.type === type) {
            card.classList.remove('hidden-by-filter');
        } else {
            card.classList.add('hidden-by-filter');
        }
    });
}

function useTopic(topic, type) {
    switchTab('write');
    document.getElementById('topicInput').value = topic;
    if (type) document.getElementById('essayTypeSelect').value = type;
    showToast('📝 Đã chọn đề bài! Bắt đầu viết nhé!');
    document.getElementById('essayInput').focus();
}

function escapeAttr(str) {
    return str.replace(/'/g, "\\'").replace(/"/g, '&quot;');
}

// Close modals on overlay click
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
        e.target.classList.remove('active');
    }
});
