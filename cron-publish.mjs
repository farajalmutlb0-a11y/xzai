/* ═══════════════════════════════════════════════════════
   XZAI — Grok-Style Theme Override
   Pure Black · Clean White · Surgical Precision
   Inspired by x.ai / Grok design language
═══════════════════════════════════════════════════════ */

/* ── Core Grok Color System ── */
:root {
  --bg:          #000000;
  --bg2:         #0a0a0a;
  --bg3:         #111111;
  --bg4:         #1a1a1a;
  --bg5:         #222222;
  --text:        #ffffff;
  --text2:       rgba(255,255,255,0.60);
  --muted:       rgba(255,255,255,0.35);
  --muted2:      rgba(255,255,255,0.18);
  --border:      rgba(255,255,255,0.08);
  --border2:     rgba(255,255,255,0.14);
  --border3:     rgba(255,255,255,0.22);
  /* Grok accent — not purple, clean white/gray */
  --accent:      #ffffff;
  --accent2:     rgba(255,255,255,0.85);
  --accent-cyan: rgba(255,255,255,0.6);
  --accent-dim:  rgba(255,255,255,0.06);
  --accent-glow: rgba(255,255,255,0.10);
  /* Grok green — for live/active states */
  --grok-green:  #00d26a;
  --grok-green2: rgba(0,210,106,0.15);
  --radius:      8px;
  --radius-sm:   4px;
  --radius-lg:   12px;
  --radius-xl:   16px;
  --radius-full: 9999px;
  --transition:  0.18s ease;
}

/* ── Body & Base ── */
html, body {
  background: #000 !important;
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
  -webkit-font-smoothing: antialiased;
}

/* ── Navbar — Grok style: minimal black bar ── */
.navbar {
  background: rgba(0,0,0,0.92) !important;
  border-bottom: 1px solid rgba(255,255,255,0.07) !important;
  backdrop-filter: blur(20px) !important;
  -webkit-backdrop-filter: blur(20px) !important;
  height: 52px !important;
}
.nav-logo .logo-x  { color: #fff !important; text-shadow: none !important; }
.nav-logo .logo-z  { color: rgba(255,255,255,0.5) !important; }
.nav-logo .logo-ai { color: rgba(255,255,255,0.85) !important; }
.nav-links a {
  color: rgba(255,255,255,0.5) !important;
  font-size: 14px !important;
  font-weight: 400 !important;
  letter-spacing: 0 !important;
  transition: color .15s !important;
}
.nav-links a:hover, .nav-links a.active {
  color: #fff !important;
}
.btn-newsletter {
  background: #fff !important;
  color: #000 !important;
  border-radius: 8px !important;
  font-size: 13px !important;
  font-weight: 600 !important;
  padding: 7px 16px !important;
  border: none !important;
}
.btn-newsletter:hover { background: rgba(255,255,255,.88) !important; }

/* ── Hero — pure black, no canvas noise ── */
.hero {
  background: #000 !important;
  border-bottom: 1px solid rgba(255,255,255,.06) !important;
  padding: 80px 0 60px !important;
}
.hero-canvas { opacity: 0.12 !important; }
.wm-x, .wm-z, .wm-ai {
  font-family: 'SF Pro Display', -apple-system, sans-serif !important;
}
.wm-x  { color: #fff !important; text-shadow: none !important; }
.wm-z  { color: rgba(255,255,255,.45) !important; text-shadow: none !important; }
.wm-ai { color: rgba(255,255,255,.8) !important; text-shadow: none !important; }

/* ── Section Labels — Grok uses simple ALL CAPS ── */
.section-label {
  font-size: 11px !important;
  font-weight: 600 !important;
  letter-spacing: .12em !important;
  color: rgba(255,255,255,.4) !important;
  background: transparent !important;
  border: none !important;
  padding: 0 !important;
  text-transform: uppercase !important;
  margin-bottom: 12px !important;
}
.section-label i { display: none !important; }

/* ── Cards — Grok minimal card ── */
.news-card, .tool-card, .review-card, .stat-card, .table-card {
  background: #0a0a0a !important;
  border: 1px solid rgba(255,255,255,.07) !important;
  border-radius: 10px !important;
  transition: border-color .15s ease !important;
}
.news-card:hover, .tool-card:hover {
  border-color: rgba(255,255,255,.18) !important;
  background: #0f0f0f !important;
  transform: none !important;
  box-shadow: none !important;
}

/* ── News card text ── */
.news-title a {
  color: #fff !important;
  font-size: 15px !important;
  font-weight: 600 !important;
  letter-spacing: -.01em !important;
  line-height: 1.4 !important;
}
.news-excerpt { color: rgba(255,255,255,.45) !important; font-size: 13px !important; }
.news-meta    { color: rgba(255,255,255,.3) !important; font-size: 12px !important; }

/* ── Category pills — Grok style: plain text ── */
.cat-pill, .badge, .news-cat {
  background: rgba(255,255,255,.06) !important;
  color: rgba(255,255,255,.6) !important;
  border: 1px solid rgba(255,255,255,.1) !important;
  border-radius: 4px !important;
  font-size: 10px !important;
  font-weight: 600 !important;
  letter-spacing: .06em !important;
  text-transform: uppercase !important;
  padding: 3px 8px !important;
}

/* ── Buttons — Grok style ── */
.btn-primary, .btn.btn-primary {
  background: #fff !important;
  color: #000 !important;
  border: none !important;
  border-radius: 8px !important;
  font-weight: 700 !important;
  font-size: 13px !important;
  padding: 10px 22px !important;
  transition: background .15s !important;
  box-shadow: none !important;
}
.btn-primary:hover { background: rgba(255,255,255,.88) !important; transform: none !important; }

.btn-secondary, .btn.btn-secondary {
  background: transparent !important;
  color: rgba(255,255,255,.7) !important;
  border: 1px solid rgba(255,255,255,.15) !important;
  border-radius: 8px !important;
  font-weight: 600 !important;
  font-size: 13px !important;
  padding: 10px 22px !important;
}
.btn-secondary:hover {
  background: rgba(255,255,255,.06) !important;
  border-color: rgba(255,255,255,.25) !important;
  color: #fff !important;
}

/* ── Read More button ── */
.btn-read, .read-more, .btn-try {
  background: transparent !important;
  color: rgba(255,255,255,.55) !important;
  border: 1px solid rgba(255,255,255,.12) !important;
  border-radius: 6px !important;
  font-size: 12px !important;
  font-weight: 600 !important;
  letter-spacing: .02em !important;
  padding: 6px 14px !important;
  transition: all .15s !important;
}
.btn-read:hover, .read-more:hover, .btn-try:hover {
  background: rgba(255,255,255,.08) !important;
  color: #fff !important;
  border-color: rgba(255,255,255,.22) !important;
}

/* ── Ticker / Breaking news bar ── */
.breaking-bar {
  background: #000 !important;
  border-bottom: 1px solid rgba(255,255,255,.07) !important;
}
.breaking-label {
  background: #fff !important;
  color: #000 !important;
  font-size: 10px !important;
  font-weight: 800 !important;
  letter-spacing: .1em !important;
  border-radius: 4px !important;
  padding: 3px 8px !important;
}

/* ── Section headers ── */
.section-title {
  color: #fff !important;
  font-size: clamp(1.4rem, 3vw, 2rem) !important;
  font-weight: 700 !important;
  letter-spacing: -.03em !important;
}
.section-desc { color: rgba(255,255,255,.4) !important; }

/* ── Search box ── */
.search-input, .search-box input, #heroSearchInput {
  background: rgba(255,255,255,.04) !important;
  border: 1px solid rgba(255,255,255,.1) !important;
  border-radius: 8px !important;
  color: #fff !important;
  font-size: 14px !important;
}
.search-input:focus, #heroSearchInput:focus {
  border-color: rgba(255,255,255,.25) !important;
  background: rgba(255,255,255,.06) !important;
  outline: none !important;
  box-shadow: none !important;
}

/* ── Filter tabs ── */
.filter-tab, .cat-tab, .tab-btn {
  background: transparent !important;
  border: 1px solid rgba(255,255,255,.1) !important;
  color: rgba(255,255,255,.45) !important;
  border-radius: 6px !important;
  font-size: 12px !important;
  font-weight: 600 !important;
  transition: all .15s !important;
}
.filter-tab:hover, .cat-tab:hover {
  border-color: rgba(255,255,255,.22) !important;
  color: rgba(255,255,255,.8) !important;
  background: rgba(255,255,255,.05) !important;
}
.filter-tab.active, .cat-tab.active {
  background: #fff !important;
  color: #000 !important;
  border-color: #fff !important;
  font-weight: 700 !important;
}

/* ── Forms ── */
.form-control, input[type="text"], input[type="email"], textarea, select {
  background: rgba(255,255,255,.04) !important;
  border: 1px solid rgba(255,255,255,.1) !important;
  border-radius: 8px !important;
  color: #fff !important;
}
.form-control:focus, input:focus, textarea:focus {
  border-color: rgba(255,255,255,.3) !important;
  outline: none !important;
  box-shadow: none !important;
}
::placeholder { color: rgba(255,255,255,.25) !important; }

/* ── Footer ── */
.footer {
  background: #000 !important;
  border-top: 1px solid rgba(255,255,255,.07) !important;
}
.footer-logo-x  { color: #fff !important; }
.footer-logo-zai{ color: rgba(255,255,255,.4) !important; }
.footer-logo-ai { color: rgba(255,255,255,.75) !important; }
.footer-links a { color: rgba(255,255,255,.4) !important; font-size: 13px !important; }
.footer-links a:hover { color: #fff !important; }
.footer-col-title { color: rgba(255,255,255,.25) !important; font-size: 11px !important; letter-spacing: .08em !important; text-transform: uppercase !important; }
.footer-bottom { color: rgba(255,255,255,.2) !important; font-size: 12px !important; border-top: 1px solid rgba(255,255,255,.05) !important; }

/* ── Scroll indicator ── */
.scroll-line { background: #fff !important; }

/* ── Live dot — green like Grok ── */
.live-dot, .online-dot, .xz-chat-dot { background: var(--grok-green) !important; box-shadow: 0 0 6px rgba(0,210,106,.5) !important; }

/* ── Chat widget — Grok black ── */
#xz-chatbot { }
#xz-chat-toggle {
  background: #fff !important;
  border: none !important;
  box-shadow: 0 4px 20px rgba(0,0,0,.5) !important;
}
#xz-chat-toggle i { color: #000 !important; }
#xz-chat-toggle:hover {
  background: rgba(255,255,255,.9) !important;
  box-shadow: 0 8px 32px rgba(0,0,0,.6) !important;
  transform: scale(1.04) !important;
}
#xz-chat-window {
  background: #000 !important;
  border: 1px solid rgba(255,255,255,.1) !important;
  border-radius: 14px !important;
}
#xz-chat-header {
  background: transparent !important;
  border-bottom: 1px solid rgba(255,255,255,.07) !important;
}
.xz-chat-name { color: #fff !important; font-size: 14px !important; font-weight: 700 !important; }
.xz-chat-status { color: var(--grok-green) !important; font-size: 11px !important; }
.xz-msg-bot {
  background: rgba(255,255,255,.04) !important;
  border: 1px solid rgba(255,255,255,.08) !important;
  color: rgba(255,255,255,.75) !important;
  border-radius: 10px 10px 10px 2px !important;
}
.xz-msg-user {
  background: #fff !important;
  color: #000 !important;
  border: none !important;
  border-radius: 10px 10px 2px 10px !important;
}
#xz-chat-input {
  background: rgba(255,255,255,.05) !important;
  border: 1px solid rgba(255,255,255,.1) !important;
  border-radius: 8px !important;
  color: #fff !important;
}
#xz-chat-send {
  background: #fff !important;
  color: #000 !important;
  border: none !important;
  border-radius: 8px !important;
}
.xz-chat-footer { color: rgba(255,255,255,.2) !important; font-size: 11px !important; }

/* ── Loading skeleton ── */
.skeleton { background: rgba(255,255,255,.04) !important; }
.sk-pulse { background: rgba(255,255,255,.06) !important; }

/* ── Table ── */
.data-table th { background: rgba(255,255,255,.03) !important; color: rgba(255,255,255,.4) !important; border-bottom: 1px solid rgba(255,255,255,.07) !important; }
.data-table td { border-bottom: 1px solid rgba(255,255,255,.04) !important; color: rgba(255,255,255,.8) !important; }
.data-table tr:hover td { background: rgba(255,255,255,.02) !important; }

/* ── Stars ── */
.stars, .star-fill { color: rgba(255,255,255,.6) !important; }

/* ── Grok-specific: remove all gradients from accent buttons ── */
[style*="background:linear-gradient"],
[style*="background: linear-gradient"] {
  /* only override when it's the purple gradient */
}

/* ── Mobile nav ── */
@media(max-width:768px) {
  .nav-menu {
    background: #000 !important;
    border-top: 1px solid rgba(255,255,255,.07) !important;
  }
}

/* ── Grok article card ── */
.article-featured {
  background: #0a0a0a !important;
  border: 1px solid rgba(255,255,255,.08) !important;
  border-radius: 12px !important;
}
.featured-badge {
  background: #fff !important;
  color: #000 !important;
  font-size: 10px !important;
  font-weight: 800 !important;
  letter-spacing: .1em !important;
  border-radius: 4px !important;
}

/* ── Back to top ── */
.back-to-top {
  background: rgba(255,255,255,.08) !important;
  border: 1px solid rgba(255,255,255,.12) !important;
  color: rgba(255,255,255,.6) !important;
  border-radius: 8px !important;
}
.back-to-top:hover {
  background: rgba(255,255,255,.15) !important;
  color: #fff !important;
}

/* ── Dividers ── */
.divider, hr {
  border-color: rgba(255,255,255,.06) !important;
}

/* ── Grok loading bar ── */
.progress-bar, .loading-bar {
  background: #fff !important;
}

/* ── Smooth transitions everywhere ── */
* { transition-timing-function: ease !important; }
