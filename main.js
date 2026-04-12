/* ════════════════════════════════════════════════════
   XZAI — نظام الاشتراك في النشرة البريدية
   يعمل بـ Supabase Database + EmailJS (اختياري)
   
   ⚡ ماذا يفعل:
   1. يحفظ الإيميل في Supabase Database
   2. يرسل إيميل تأكيد للمشترك (إذا كان EmailJS مفعّل)
   3. يرسل إشعار لـ info@xzai.ai عند كل اشتراك
   
   📦 متطلبات:
   - تحميل Supabase SDK في الصفحة:
     <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
   - ملف js/config.js يحتوي على Supabase URL و anonKey
════════════════════════════════════════════════════ */

/* ── إعدادات EmailJS ──
   📌 خطوات الإعداد:
   1. افتح https://www.emailjs.com وسجل مجاناً
   2. أضف Gmail أو أي إيميل كـ Email Service
   3. أنشئ Template باسم "xzai_subscribe"
   4. انسخ Public Key و Service ID و Template ID وضعها هنا
*/
const EMAILJS_CONFIG = {
  publicKey:   'YOUR_PUBLIC_KEY',      // من EmailJS Dashboard
  serviceId:   'YOUR_SERVICE_ID',      // مثل: service_abc123
  templateId:  'YOUR_TEMPLATE_ID',     // مثل: template_xyz456
  ownerEmail:  'info@xzai.ai',         // إيميلك الذي تستلم الإشعارات عليه
  configured:  false                   // اجعله true بعد إدخال البيانات أعلاه
};

/* ════════════════════════════════════════════════
   الدالة الرئيسية — تُستدعى من كل نماذج الاشتراك
════════════════════════════════════════════════ */
async function xzSubscribe(email, sourceLabel) {
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, msg: 'Please enter a valid email address.' };
  }

  // 1️⃣ حفظ في قاعدة البيانات Supabase
  try {
    if (window.XZAI_CONFIG && window.XZAI_CONFIG.supabase) {
      const { createClient } = supabase;
      const supabaseClient = createClient(
        window.XZAI_CONFIG.supabase.url,
        window.XZAI_CONFIG.supabase.anonKey
      );
      
      await supabaseClient.from('subscribers').insert({
        email,
        source:        sourceLabel || 'website',
        subscribed_at: new Date().toISOString(),
        status:        'active'
      });
    }
  } catch (e) { 
    console.warn('Database save failed:', e);
    /* نكمل حتى لو فشل الحفظ */ 
  }

  // 2️⃣ إرسال إيميلات عبر EmailJS (إذا كان مُعدَّد)
  if (EMAILJS_CONFIG.configured && EMAILJS_CONFIG.publicKey !== 'YOUR_PUBLIC_KEY') {
    try {
      // تحميل EmailJS SDK إذا لم يكن موجوداً
      if (typeof emailjs === 'undefined') {
        await loadScript('https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js');
        emailjs.init(EMAILJS_CONFIG.publicKey);
      }

      // إيميل تأكيد للمشترك
      await emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, {
        to_email:    email,
        to_name:     email.split('@')[0],
        from_name:   'XZAI Newsletter',
        reply_to:    EMAILJS_CONFIG.ownerEmail,
        site_url:    'https://xzai.ai',
        unsubscribe: `https://xzai.ai/unsubscribe.html?email=${encodeURIComponent(email)}`
      });

      // إشعار للمالك
      await emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, {
        to_email:  EMAILJS_CONFIG.ownerEmail,
        to_name:   'Faraj Almatlb',
        from_name: 'XZAI System',
        reply_to:  email,
        subject:   '🎉 New Subscriber: ' + email,
        message:   `New subscriber: ${email}\nSource: ${sourceLabel}\nTime: ${new Date().toLocaleString()}`
      });

    } catch (emailErr) {
      console.warn('EmailJS error:', emailErr);
      // نكمل بنجاح حتى لو فشل الإيميل — الإيميل محفوظ بالDB
    }
  }

  return { ok: true };
}

/* ── مساعد تحميل سكريبت ── */
function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve();
    const s = document.createElement('script');
    s.src = src; s.onload = resolve; s.onerror = reject;
    document.head.appendChild(s);
  });
}
