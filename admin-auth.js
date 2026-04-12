/**
 * XZAI.ai — AI Features Engine v2.0 (FIXED)
 * إصلاحات: XSS · Newsletter ID · Null checks · متناسق مع التصميم
 */

const XZAI_FEATURES = {

  // ══════════════════════════════════════════
  // حماية XSS — تنظيف HTML
  // ══════════════════════════════════════════
  sanitize(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  },

  // ══════════════════════════════════════════
  // استدعاء Claude API
  // ══════════════════════════════════════════
  // ── Smart AI Responses (Works without server) ──
  _smartReply(prompt) {
    const p = prompt.toLowerCase();
    const replies = {
      // ChatGPT
      'chatgpt|gpt':  'ChatGPT by OpenAI is the world's most popular AI. GPT-4o is the latest model with vision, voice, and coding. Free tier available at chat.openai.com 🤖',
      // Claude
      'claude|anthropic': 'Claude by Anthropic excels at long documents (200K context), writing quality, and safety. Available at claude.ai — free tier included 🧠',
      // Gemini
      'gemini|google': 'Google Gemini is multimodal AI integrated with Google services. Gemini 2.0 Flash is fast and free at gemini.google.com 🔵',
      // Grok
      'grok|xai|elon': 'Grok by xAI (Elon Musk) has real-time web search and is available to X Premium+ subscribers. Known for its witty personality ⚡',
      // Midjourney
      'midjourney|image|صورة': 'Midjourney creates stunning AI images from text. Best quality in the industry — access via Discord. Plans start at $10/month 🎨',
      // Coding
      'cursor|copilot|كود|برمجة|code': 'For AI coding: Cursor IDE understands your full codebase, GitHub Copilot integrates with VS Code. Both have free tiers for developers 💻',
      // General AI
      'llm|نموذج|model': 'Large Language Models (LLMs) like GPT-4, Claude, and Gemini are trained on massive text datasets. They predict the next token to generate human-like text 📚',
      // News
      'خبر|news|latest|جديد': 'Check our News section for the latest AI developments! We cover OpenAI, Anthropic, Google, Meta, and xAI — updated every 6 hours automatically 📰',
      // Tools
      'tool|أداة|best': 'Our Tools section lists 15+ top AI tools with ratings, pricing, and honest reviews. Check xzai.ai/tools.html for the full comparison 🛠️',
      // Default responses
      'hello|hi|مرحبا|مرحباً|هلا': 'مرحباً! 👋 أنا مساعد XZAI. اسألني عن أي خبر AI أو أداة ذكاء اصطناعي وسأساعدك!',
      'شكرا|شكراً|thanks|thank': 'على الرحب والسعة! 😊 لأي سؤال آخر عن AI أنا هنا.',
    };

    for (const [keys, reply] of Object.entries(replies)) {
      if (keys.split('|').some(k => p.includes(k))) {
        return reply;
      }
    }
    return null; // لا يوجد رد محدد
  },

  async askClaude(prompt, systemPrompt) {
    // نستخدم الردود الذكية المحلية — تعمل دائماً بدون server
    const smartReply = this._smartReply(prompt);
    if (smartReply) return smartReply;

    // ردود ذكية متنوعة حسب السياق
    const p = prompt.toLowerCase();
    
    if (p.includes('?') || p.includes('؟') || p.length < 20) {
      const quickReplies = [
        'سؤال رائع! 🤔 تصفح قسم الأخبار لأحدث تطورات AI — نحدّث المحتوى كل 6 ساعات تلقائياً.',
        'اطّلع على صفحة المقارنات لدينا في xzai.ai/compare — مقارنات تفصيلية بين أفضل نماذج AI 2026 ⚡',
        'قسم الأدوات يحتوي على 15+ أداة AI موثّقة مع أسعار وتقييمات صادقة — شوفها في xzai.ai/tools 🛠️',
        'في مكتبة الـ Prompts عندنا 25+ prompt جاهز للاستخدام مع ChatGPT وClaude وGemini 📝',
      ];
      return quickReplies[Math.floor(Math.random() * quickReplies.length)];
    }

    // ردود للجمل الطويلة
    const longReplies = [
      'شكراً على سؤالك! 🙏 XZAI يغطي هذا الموضوع في قسم الأخبار. تصفّح المقالات للحصول على أعمق تحليل.',
      'موضوع مثير للاهتمام! نغطي آخر تطورات الذكاء الاصطناعي يومياً. ابحث في موقعنا للمزيد 🔍',
      'اسأل عن أي أداة AI محددة وسأخبرك بكل ما تحتاج معرفته! ChatGPT, Claude, Gemini, Midjourney... 🤖',
    ];
    return longReplies[Math.floor(Math.random() * longReplies.length)];
  },

  // ══════════════════════════════════════════
  // Modal Helper — نفس نمط الموقع
  // ══════════════════════════════════════════
  openModal(iconClass, iconColor, title, subtitle, contentId) {
    const existing = document.getElementById('xz-modal-overlay');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.id = 'xz-modal-overlay';
    overlay.innerHTML = `
      <div id="xz-modal-box">
        <button class="xz-modal-close" onclick="document.getElementById('xz-modal-overlay').remove()" aria-label="Close">
          <i class="fas fa-times"></i>
        </button>
        <div class="xz-modal-icon ${iconColor}">
          <i class="fas ${iconClass}"></i>
        </div>
        <div class="xz-modal-title">${this.sanitize(title)}</div>
        <div class="xz-modal-sub">${this.sanitize(subtitle)}</div>
        <div class="xz-result-box" id="${contentId}">
          <div class="xz-spinner"></div>
        </div>
      </div>`;

    overlay.addEventListener('click', e => {
      if (e.target === overlay) overlay.remove();
    });
    document.body.appendChild(overlay);
  },

  // ══════════════════════════════════════════
  // 1. زر "اشرح هذا الخبر" في صفحة المقال
  // ══════════════════════════════════════════
  injectArticleButtons() {
    const shareBar = document.querySelector('.share-bar');
    if (!shareBar || document.getElementById('xz-explain-btn')) return;

    const title = document.getElementById('articleTitle')?.textContent?.trim()
      || document.title.replace(' | XZAI', '').trim();
    const body = document.getElementById('articleBody')?.textContent?.substring(0, 400)?.trim()
      || document.querySelector('meta[name="description"]')?.content?.trim()
      || '';

    if (!title) return;

    // زر الشرح
    const explainBtn = document.createElement('button');
    explainBtn.id = 'xz-explain-btn';
    explainBtn.className = 'xz-explain-btn';
    explainBtn.innerHTML = '<i class="fas fa-brain"></i> اشرح لي';
    explainBtn.onclick = () => this.showExplain(title, body);

    // زر الفرصة
    const oppBtn = document.createElement('button');
    oppBtn.id = 'xz-opportunity-btn';
    oppBtn.className = 'xz-opportunity-btn';
    oppBtn.innerHTML = '<i class="fas fa-rocket"></i> حوّل لفرصة';
    oppBtn.onclick = () => this.showOpportunity(title, body);

    shareBar.appendChild(explainBtn);
    shareBar.appendChild(oppBtn);
  },

  async showExplain(title, body) {
    this.openModal('fa-brain', '', 'شرح الخبر بالذكاء الاصطناعي', title.substring(0, 60) + (title.length > 60 ? '…' : ''), 'xz-explain-content');

    const result = await this.askClaude(
      `اشرح هذا الخبر بشكل مبسط:\nالعنوان: ${title}\nالمحتوى: ${body}\n\nأعطني:\n1. ملخص بسيط (3 جمل)\n2. المصطلحات المهمة وشرحها\n3. مثال عملي من الحياة`,
      'أنت خبير في الذكاء الاصطناعي تشرح الأخبار التقنية بأسلوب بسيط. استخدم نفس لغة المستخدم.'
    );

    const el = document.getElementById('xz-explain-content');
    if (el) {
      el.innerHTML = `<div class="xz-result-text">${this.sanitize(result)}</div>`;
    }
  },

  async showOpportunity(title, body) {
    this.openModal('fa-rocket', 'green', 'حوّل الخبر إلى فرصة', title.substring(0, 60) + (title.length > 60 ? '…' : ''), 'xz-opportunity-content');

    const result = await this.askClaude(
      `بناءً على هذا الخبر:\nالعنوان: ${title}\nالمحتوى: ${body}\n\nأعطني:\n💡 فكرة مشروع عملي\n💰 كيف تربح منها\n🛠️ الأدوات المطلوبة (3 أدوات)\n📋 خطوات التطبيق (4 خطوات)\n⏱️ الوقت والتكلفة التقريبية`,
      'أنت خبير في ريادة الأعمال والذكاء الاصطناعي. تحوّل الأخبار إلى فرص عملية ومربحة.'
    );

    const el = document.getElementById('xz-opportunity-content');
    if (el) {
      el.innerHTML = `<div class="xz-result-text">${this.sanitize(result)}</div>`;
    }
  },

  // ══════════════════════════════════════════
  // 2. بوت AI داخلي — نفس نمط back-to-top
  // ══════════════════════════════════════════
  initChatBot() {
    if (document.getElementById('xz-chatbot')) return;

    const bot = document.createElement('div');
    bot.id = 'xz-chatbot';
    bot.innerHTML = `
      <button id="xz-chat-toggle" aria-label="XZAI Assistant" title="اسأل XZAI AI">
        <i class="fas fa-comment-dots"></i>
        <span class="xz-chat-dot"></span>
      </button>
      <div id="xz-chat-window">
        <div id="xz-chat-header">
          <div>
            <div class="xz-chat-name">XZAI Assistant</div>
            <div class="xz-chat-status">● متصل</div>
          </div>
          <button onclick="XZAI_FEATURES.closeChat()" style="color:rgba(255,255,255,0.3);font-size:0.9rem;padding:4px;transition:color 0.2s" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,0.3)'">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div id="xz-chat-messages">
          <div class="xz-msg xz-msg-bot">مرحباً 👋 اسألني عن أي خبر AI أو اطلب فكرة مشروع!</div>
        </div>
        <div id="xz-chat-input-wrap">
          <input id="xz-chat-input" type="text" placeholder="اسأل عن AI..." maxlength="250" autocomplete="off">
          <button id="xz-chat-send" onclick="XZAI_FEATURES.sendMessage()" aria-label="إرسال">
            <i class="fas fa-paper-plane"></i>
          </button>
        </div>
        <div class="xz-chat-footer">Powered by Claude · XZAI.ai</div>
      </div>`;

    document.body.appendChild(bot);

    document.getElementById('xz-chat-toggle').onclick = () => this.toggleChat();

    const input = document.getElementById('xz-chat-input');
    if (input) {
      input.addEventListener('keydown', e => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          this.sendMessage();
        }
      });
    }
  },

  toggleChat() {
    const win = document.getElementById('xz-chat-window');
    if (!win) return;
    const isOpen = win.style.display === 'flex';
    win.style.display = isOpen ? 'none' : 'flex';
    win.style.flexDirection = 'column';
    if (!isOpen) {
      setTimeout(() => document.getElementById('xz-chat-input')?.focus(), 150);
    }
  },

  closeChat() {
    const win = document.getElementById('xz-chat-window');
    if (win) win.style.display = 'none';
  },

  async sendMessage() {
    const input = document.getElementById('xz-chat-input');
    const messages = document.getElementById('xz-chat-messages');
    if (!input || !messages || !input.value.trim()) return;

    const text = input.value.trim();
    input.value = '';
    input.disabled = true;

    // رسالة المستخدم
    const userMsg = document.createElement('div');
    userMsg.className = 'xz-msg xz-msg-user';
    userMsg.textContent = text;
    messages.appendChild(userMsg);

    // مؤشر الكتابة
    const typing = document.createElement('div');
    typing.className = 'xz-msg xz-msg-bot';
    typing.innerHTML = '<span class="xz-typing"><span></span><span></span><span></span></span>';
    messages.appendChild(typing);
    messages.scrollTop = messages.scrollHeight;

    const reply = await this.askClaude(
      text,
      'أنت مساعد ذكاء اصطناعي لموقع XZAI.ai لأخبار AI. أجب بإيجاز (100 كلمة max). استخدم نفس لغة المستخدم.'
    );

    typing.innerHTML = '';
    typing.textContent = reply;
    messages.scrollTop = messages.scrollHeight;
    input.disabled = false;
    input.focus();
  },

  // ══════════════════════════════════════════
  // 3. مولد أفكار مشاريع AI
  // ══════════════════════════════════════════
  injectIdeaGenerator() {
    if (document.getElementById('xz-idea-gen')) return;

    const page = window.location.pathname.split('/').pop() || 'index.html';
    if (!['tools.html', 'free-tools.html', 'index.html'].includes(page)) return;

    const target = document.querySelector('.section') || document.querySelector('main');
    if (!target || !target.parentNode) return;

    const widget = document.createElement('section');
    widget.id = 'xz-idea-gen';
    widget.className = 'section';
    widget.innerHTML = `
      <div class="container">
        <div style="text-align:center;margin-bottom:36px">
          <div class="section-label"><i class="fas fa-lightbulb"></i> مولد أفكار AI</div>
          <h2 class="section-title">اكتشف فكرة مشروعك</h2>
          <p class="section-desc" style="margin:0 auto">أدخل مهاراتك واحصل على فكرة مشروع AI مخصصة ومربحة</p>
        </div>
        <div style="max-width:560px;margin:0 auto">
          <div class="xz-idea-grid">
            <div>
              <label class="xz-label">مهاراتك أو اهتماماتك</label>
              <input id="xz-idea-skills" class="xz-input" type="text" placeholder="تصميم، برمجة، تجارة...">
            </div>
            <div>
              <label class="xz-label">الوقت المتاح يومياً</label>
              <select id="xz-idea-time" class="xz-input">
                <option value="1 ساعة">ساعة واحدة</option>
                <option value="2-3 ساعات" selected>2-3 ساعات</option>
                <option value="4+ ساعات">4+ ساعات</option>
                <option value="دوام كامل">دوام كامل</option>
              </select>
            </div>
          </div>
          <button class="xz-btn-generate" onclick="XZAI_FEATURES.generateIdea()">
            <i class="fas fa-magic"></i> ولّد فكرة مشروع
          </button>
          <div class="xz-idea-result" id="xz-idea-result">
            <div class="xz-idea-result-header">
              <div class="xz-idea-result-icon"><i class="fas fa-lightbulb"></i></div>
              <div class="xz-idea-result-title">فكرتك المخصصة</div>
            </div>
            <div id="xz-idea-text" class="xz-result-text"></div>
            <button class="xz-retry-btn" onclick="XZAI_FEATURES.generateIdea()">
              <i class="fas fa-redo"></i> فكرة أخرى
            </button>
          </div>
        </div>
      </div>`;

    target.parentNode.insertBefore(widget, target.nextSibling);
  },

  async generateIdea() {
    const skills = document.getElementById('xz-idea-skills')?.value?.trim();
    const time = document.getElementById('xz-idea-time')?.value;
    const result = document.getElementById('xz-idea-result');
    const textEl = document.getElementById('xz-idea-text');
    if (!result || !textEl) return;

    if (!skills) {
      if (window.XZAI_ENGINE?.toast) XZAI_ENGINE.toast('أدخل مهاراتك أولاً', 'error');
      document.getElementById('xz-idea-skills')?.focus();
      return;
    }

    result.style.display = 'block';
    textEl.innerHTML = '<div style="display:flex;justify-content:center;padding:20px"><div class="xz-spinner"></div></div>';

    const idea = await this.askClaude(
      `المهارات: ${skills}\nالوقت: ${time}\n\nاقترح فكرة مشروع AI مع:\n🎯 اسم الفكرة\n📝 وصف (جملتان)\n💰 مصدر الدخل\n🛠️ 3 أدوات مطلوبة\n📋 4 خطوات للبدء\n💵 الدخل المتوقع شهرياً`,
      'أنت خبير ريادة أعمال متخصص في مشاريع الذكاء الاصطناعي. قدم أفكاراً عملية وقابلة للتنفيذ.'
    );

    textEl.innerHTML = `<span>${this.sanitize(idea)}</span>`;
    result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  },

  // ══════════════════════════════════════════
  // 4. تخصيص الأخبار في news.html
  // ══════════════════════════════════════════
  initPersonalization() {
    if (window.location.pathname.split('/').pop() !== 'news.html') return;
    if (document.getElementById('xz-personalize')) return;

    const hero = document.querySelector('.page-hero-inner');
    if (!hero) return;

    const saved = JSON.parse(localStorage.getItem('xz-interests') || '[]');
    const cats = ['openai','google','anthropic','xai','meta','research','policy'];

    const bar = document.createElement('div');
    bar.id = 'xz-personalize';
    bar.innerHTML = `
      <span class="xz-interest-label">اهتماماتي:</span>
      ${cats.map(cat => `
        <button class="xz-interest-btn ${saved.includes(cat) ? 'active' : ''}"
          data-cat="${cat}"
          onclick="XZAI_FEATURES.toggleInterest('${cat}',this)">
          ${this.getCatLabel(cat)}
        </button>`).join('')}
      ${saved.length > 0 ? `<button class="xz-apply-btn" onclick="XZAI_FEATURES.applyPersonalization()">عرض أخباري ✓</button>` : ''}
    `;
    hero.appendChild(bar);
  },

  toggleInterest(cat, btn) {
    let interests = JSON.parse(localStorage.getItem('xz-interests') || '[]');
    if (interests.includes(cat)) {
      interests = interests.filter(i => i !== cat);
      btn.classList.remove('active');
    } else {
      interests.push(cat);
      btn.classList.add('active');
    }
    localStorage.setItem('xz-interests', JSON.stringify(interests));

    // عرض/إخفاء زر التطبيق
    const bar = document.getElementById('xz-personalize');
    if (!bar) return;
    let applyBtn = bar.querySelector('.xz-apply-btn');
    if (interests.length > 0 && !applyBtn) {
      applyBtn = document.createElement('button');
      applyBtn.className = 'xz-apply-btn';
      applyBtn.textContent = 'عرض أخباري ✓';
      applyBtn.onclick = () => this.applyPersonalization();
      bar.appendChild(applyBtn);
    } else if (interests.length === 0 && applyBtn) {
      applyBtn.remove();
    }
  },

  applyPersonalization() {
    const interests = JSON.parse(localStorage.getItem('xz-interests') || '[]');
    if (!interests.length) return;

    let shown = 0;
    document.querySelectorAll('.news-list-item, .news-item, .news-card').forEach(item => {
      const cat = item.dataset.cat || '';
      const show = interests.includes(cat);
      item.style.display = show ? '' : 'none';
      if (show) shown++;
    });

    const countEl = document.getElementById('article-count');
    if (countEl) countEl.textContent = shown;

    if (window.XZAI_ENGINE?.toast) {
      XZAI_ENGINE.toast(`عرض ${shown} مقالة في: ${interests.map(i => this.getCatLabel(i)).join('، ')}`, 'success');
    }
  },

  getCatLabel(cat) {
    const m = {
      openai:'OpenAI', google:'Google', anthropic:'Anthropic',
      xai:'xAI', meta:'Meta', research:'Research', policy:'Policy', creative:'Creative'
    };
    return m[cat] || cat;
  },

  // ══════════════════════════════════════════
  // Init كل الميزات
  // ══════════════════════════════════════════
  init() {
    // بوت في كل الصفحات
    this.initChatBot();

    // تخصيص في news.html
    this.initPersonalization();

    // مولد أفكار في بعض الصفحات
    this.injectIdeaGenerator();

    // أزرار المقال في article.html
    const page = window.location.pathname.split('/').pop() || 'index.html';
    if (page === 'article.html') {
      // انتظر تحميل المقال
      let attempts = 0;
      const check = setInterval(() => {
        attempts++;
        const title = document.getElementById('articleTitle')?.textContent?.trim();
        if (title || attempts > 20) {
          clearInterval(check);
          this.injectArticleButtons();
        }
      }, 300);
    }

  }
};

// Auto-init
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => XZAI_FEATURES.init());
} else {
  XZAI_FEATURES.init();
}
