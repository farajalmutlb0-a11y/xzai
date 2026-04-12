/* ═══════════════════════════════════════════════════
   XZAI Features CSS v2.0 — متناسق مع تصميم الموقع
   نفس المتغيرات: --bg · --accent #00d4ff · --border
   نفس الخطوط: Inter + Playfair Display
═══════════════════════════════════════════════════ */

/* ── SPINNER (نفس نمط skeleton الموقع) ── */
.xz-spinner {
  width: 28px; height: 28px;
  border: 2px solid rgba(255,255,255,0.08);
  border-top-color: var(--accent);
  border-radius: 50%;
  animation: xz-spin 0.7s linear infinite;
  margin: 0 auto;
}
@keyframes xz-spin { to { transform: rotate(360deg); } }

/* ── MODAL (نفس نمط search-overlay) ── */
#xz-modal-overlay {
  position: fixed; inset: 0; z-index: 9999;
  background: rgba(5,5,5,0.92);
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  display: flex; align-items: center; justify-content: center;
  padding: 20px;
  animation: xz-fade 0.2s ease;
}
@keyframes xz-fade { from { opacity: 0; } to { opacity: 1; } }

#xz-modal-box {
  position: relative;
  background: #0a0a0a;
  border: 1px solid rgba(255,255,255,0.13);
  border-radius: 20px;
  padding: 36px 32px;
  max-width: 540px; width: 100%;
  max-height: 82vh; overflow-y: auto;
  box-shadow: 0 32px 80px rgba(0,0,0,0.7);
  animation: xz-up 0.25s cubic-bezier(0.4,0,0.2,1);
}
@keyframes xz-up { from { transform:translateY(20px); opacity:0; } to { transform:translateY(0); opacity:1; } }

#xz-modal-box::-webkit-scrollbar { width: 2px; }
#xz-modal-box::-webkit-scrollbar-thumb { background: #2a2a2a; }

.xz-modal-close {
  position: absolute; top: 16px; right: 16px;
  color: rgba(255,255,255,0.3); font-size: 0.9rem;
  transition: color 0.22s ease; padding: 4px;
}
.xz-modal-close:hover { color: #fff; }

.xz-modal-icon {
  width: 52px; height: 52px;
  background: rgba(167,139,250,0.08);
  border: 1px solid rgba(167,139,250,0.18);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 16px;
  font-size: 1.3rem; color: var(--accent);
}
.xz-modal-icon.green {
  background: rgba(16,185,129,0.08);
  border-color: rgba(16,185,129,0.18);
  color: #10b981;
}

.xz-modal-title {
  font-family: 'DM Sans',sans-serif;
  font-size: 1.15rem; font-weight: 800;
  color: #fff; text-align: center;
  margin-bottom: 6px; letter-spacing: -0.02em;
}
.xz-modal-sub {
  font-size: 0.78rem; color: rgba(255,255,255,0.35);
  text-align: center; margin-bottom: 24px;
  line-height: 1.5;
}

.xz-result-box {
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 12px; padding: 20px;
  min-height: 100px;
  display: flex; align-items: center; justify-content: center;
}
.xz-result-text {
  line-height: 1.85; white-space: pre-wrap;
  font-size: 0.86rem; color: rgba(255,255,255,0.65);
}

/* ── CHATBOT (نفس نمط back-to-top) ── */
#xz-chatbot {
  position: fixed;
  bottom: 28px; left: 28px;
  z-index: 5000;
}

#xz-chat-toggle {
  width: 52px; height: 52px;
  border-radius: 50%;
  background: linear-gradient(135deg, #7c3aed, #6d28d9);
  border: none;
  color: #fff;
  font-size: 1.2rem;
  display: flex; align-items: center; justify-content: center;
  transition: all 0.22s cubic-bezier(0.4,0,0.2,1);
  position: relative;
  box-shadow: 0 4px 20px rgba(124,58,237,0.4);
}
#xz-chat-toggle:hover {
  color: #fff;
  background: linear-gradient(135deg, #6d28d9, #5b21b6);
  box-shadow: 0 6px 28px rgba(124,58,237,0.6);
  transform: scale(1.05);
}
.xz-chat-dot {
  position: absolute; top: -2px; right: -2px;
  width: 10px; height: 10px;
  background: #10b981;
  border-radius: 50%;
  border: 2px solid #050505;
}

#xz-chat-window {
  position: absolute;
  bottom: 60px; left: 0;
  width: 300px;
  background: #0a0a0a;
  border: 1px solid rgba(255,255,255,0.10);
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.6);
  display: none;
  flex-direction: column;
  overflow: hidden;
  animation: xz-up 0.2s ease;
}

#xz-chat-header {
  padding: 14px 16px;
  border-bottom: 1px solid rgba(255,255,255,0.06);
  display: flex; align-items: center; justify-content: space-between;
  background: rgba(255,255,255,0.015);
}
.xz-chat-name {
  font-size: 0.82rem; font-weight: 700; color: #fff;
}
.xz-chat-status {
  font-size: 0.66rem; color: #10b981; margin-top: 1px;
}

#xz-chat-messages {
  height: 240px; overflow-y: auto;
  padding: 12px; display: flex; flex-direction: column; gap: 8px;
}
#xz-chat-messages::-webkit-scrollbar { width: 2px; }
#xz-chat-messages::-webkit-scrollbar-thumb { background: #2a2a2a; }

/* نفس نمط نمط الـ news cards */
.xz-msg {
  max-width: 86%;
  padding: 9px 13px;
  border-radius: 12px;
  font-size: 0.80rem; line-height: 1.6;
}
.xz-msg-bot {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.07);
  color: rgba(255,255,255,0.65);
  align-self: flex-start;
  border-bottom-left-radius: 3px;
}
.xz-msg-user {
  background: rgba(167,139,250,0.08);
  border: 1px solid rgba(167,139,250,0.18);
  color: rgba(255,255,255,0.85);
  align-self: flex-end;
  border-bottom-right-radius: 3px;
}

#xz-chat-input-wrap {
  display: flex; gap: 8px; padding: 10px;
  border-top: 1px solid rgba(255,255,255,0.06);
}
/* نفس نمط form-control */
#xz-chat-input {
  flex: 1; padding: 8px 12px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.13);
  border-radius: 8px; color: #fff; font-size: 0.80rem;
  outline: none; transition: border-color 0.22s ease;
  font-family: -apple-system, sans-serif;
}
#xz-chat-input:focus { border-color: rgba(255,255,255,0.22); }
#xz-chat-input::placeholder { color: rgba(255,255,255,0.22); }

/* نفس نمط btn-primary */
#xz-chat-send {
  width: 34px; height: 34px; border-radius: 8px;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.13);
  color: rgba(255,255,255,0.55); font-size: 0.82rem;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0; transition: all 0.22s ease;
}
#xz-chat-send:hover { color: #fff; background: rgba(255,255,255,0.10); }

.xz-chat-footer {
  padding: 5px 12px;
  text-align: center;
  font-size: 0.60rem;
  color: rgba(255,255,255,0.18);
  border-top: 1px solid rgba(255,255,255,0.05);
  letter-spacing: 0.06em; text-transform: uppercase;
}

/* Typing indicator */
.xz-typing { display: flex; gap: 3px; align-items: center; padding: 2px 0; }
.xz-typing span {
  width: 5px; height: 5px;
  background: rgba(255,255,255,0.25);
  border-radius: 50%;
  animation: xz-bounce 1.2s infinite;
}
.xz-typing span:nth-child(2) { animation-delay: 0.18s; }
.xz-typing span:nth-child(3) { animation-delay: 0.36s; }
@keyframes xz-bounce {
  0%,80%,100% { transform:scale(0.65); opacity:0.4; }
  40% { transform:scale(1); opacity:1; }
}

/* ── IDEA GENERATOR (نمط newsletter-cta) ── */
#xz-idea-gen {
  background: rgba(255,255,255,0.015);
  border-top: 1px solid rgba(255,255,255,0.07);
  border-bottom: 1px solid rgba(255,255,255,0.07);
}

.xz-idea-grid {
  display: grid; grid-template-columns: 1fr 1fr; gap: 16px;
  margin-bottom: 20px;
}

/* نفس form-control */
.xz-input {
  width: 100%; padding: 12px 16px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.13);
  border-radius: 10px; color: #fff; font-size: 0.86rem;
  outline: none; transition: border-color 0.22s ease;
  font-family: -apple-system, sans-serif;
}
.xz-input:focus { border-color: rgba(255,255,255,0.22); background: rgba(255,255,255,0.04); }
.xz-input::placeholder { color: rgba(255,255,255,0.22); }

.xz-label {
  display: block; font-size: 0.75rem; font-weight: 600;
  color: rgba(255,255,255,0.40); margin-bottom: 8px;
  letter-spacing: 0.06em; text-transform: uppercase;
}

/* نفس نمط load-more-btn لكن مليء */
.xz-btn-generate {
  width: 100%; padding: 13px;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.14);
  border-radius: 9999px;
  color: rgba(255,255,255,0.75); font-size: 0.84rem; font-weight: 600;
  letter-spacing: 0.04em; text-transform: uppercase;
  transition: all 0.22s ease; cursor: pointer;
  display: flex; align-items: center; justify-content: center; gap: 8px;
  font-family: -apple-system, sans-serif;
}
.xz-btn-generate:hover {
  background: rgba(255,255,255,0.10);
  color: #fff; border-color: rgba(255,255,255,0.22);
}

.xz-idea-result {
  display: none;
  margin-top: 24px;
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 16px; padding: 24px;
}
.xz-idea-result-header {
  display: flex; align-items: center; gap: 10px; margin-bottom: 16px;
  padding-bottom: 14px; border-bottom: 1px solid rgba(255,255,255,0.06);
}
.xz-idea-result-icon {
  width: 36px; height: 36px; border-radius: 50%;
  background: rgba(167,139,250,0.08);
  border: 1px solid rgba(167,139,250,0.18);
  display: flex; align-items: center; justify-content: center;
  color: var(--accent); font-size: 0.9rem;
  flex-shrink: 0;
}
.xz-idea-result-title {
  font-size: 0.80rem; font-weight: 700; color: rgba(255,255,255,0.55);
  letter-spacing: 0.12em; text-transform: uppercase;
}

/* ── PERSONALIZATION BAR (نفس نمط filter-bar) ── */
#xz-personalize {
  margin-top: 20px;
  display: flex; flex-wrap: wrap; gap: 6px;
  align-items: center; justify-content: center;
}
.xz-interest-label {
  font-size: 0.65rem; font-weight: 700;
  color: rgba(255,255,255,0.28);
  letter-spacing: 0.16em; text-transform: uppercase;
  margin-right: 4px;
}
/* نفس filter-btn */
.xz-interest-btn {
  padding: 5px 14px; border-radius: 9999px;
  background: transparent;
  border: 1px solid rgba(255,255,255,0.13);
  color: rgba(255,255,255,0.40); font-size: 0.72rem; font-weight: 600;
  cursor: pointer; transition: all 0.22s ease;
  letter-spacing: 0.01em;
  font-family: -apple-system, sans-serif;
}
.xz-interest-btn:hover {
  color: rgba(255,255,255,0.80);
  border-color: rgba(255,255,255,0.22);
  background: rgba(255,255,255,0.04);
}
.xz-interest-btn.active {
  background: rgba(167,139,250,0.08);
  border-color: rgba(167,139,250,0.25);
  color: var(--accent);
}
/* نفس btn-nav */
.xz-apply-btn {
  padding: 5px 16px; border-radius: 9999px;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.14);
  color: rgba(255,255,255,0.75); font-size: 0.72rem; font-weight: 600;
  cursor: pointer; transition: all 0.22s ease;
  font-family: -apple-system, sans-serif;
}
.xz-apply-btn:hover {
  background: rgba(255,255,255,0.10); color: #fff;
}

/* ── ARTICLE ACTION BUTTONS (نفس نمط share-btn) ── */
.xz-explain-btn {
  padding: 6px 14px; border-radius: 9999px;
  background: rgba(167,139,250,0.06);
  border: 1px solid rgba(167,139,250,0.22);
  font-size: 0.73rem; font-weight: 600;
  color: var(--accent);
  display: inline-flex; align-items: center; gap: 6px;
  transition: all 0.22s ease; cursor: pointer;
  font-family: -apple-system, sans-serif;
}
.xz-explain-btn:hover {
  background: rgba(167,139,250,0.12);
  border-color: rgba(167,139,250,0.35);
}

.xz-opportunity-btn {
  padding: 6px 14px; border-radius: 9999px;
  background: rgba(16,185,129,0.06);
  border: 1px solid rgba(16,185,129,0.22);
  font-size: 0.73rem; font-weight: 600;
  color: #10b981;
  display: inline-flex; align-items: center; gap: 6px;
  transition: all 0.22s ease; cursor: pointer;
  font-family: -apple-system, sans-serif;
}
.xz-opportunity-btn:hover {
  background: rgba(16,185,129,0.12);
  border-color: rgba(16,185,129,0.35);
}

.xz-retry-btn {
  display: inline-flex; align-items: center; gap: 6px;
  margin-top: 14px;
  padding: 6px 18px; border-radius: 9999px;
  background: transparent;
  border: 1px solid rgba(255,255,255,0.13);
  color: rgba(255,255,255,0.45); font-size: 0.76rem; font-weight: 600;
  cursor: pointer; transition: all 0.22s ease;
  letter-spacing: 0.04em; text-transform: uppercase;
  font-family: -apple-system, sans-serif;
}
.xz-retry-btn:hover { color: #fff; border-color: rgba(255,255,255,0.25); }

/* ── MOBILE ── */
@media (max-width: 768px) {
  #xz-chat-window { width: 280px; }
  #xz-modal-box { padding: 28px 20px; }
  .xz-idea-grid { grid-template-columns: 1fr; }
  #xz-chatbot { bottom: 80px; left: 16px; }
}
@media (max-width: 480px) {
  #xz-chat-window { width: 260px; }
}
