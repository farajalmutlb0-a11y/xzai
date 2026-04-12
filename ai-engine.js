/**
 * XZAI Analytics Tracker v1.0
 * يتتبع: pageviews · time on page · device · referrer · scrolls
 * يحفظ في Supabase table: page_views
 */

(function() {
  // لا نتتبع Admin
  if (window.location.pathname.includes('admin')) return;

  const SB_URL = window.XZAI_CONFIG?.supabase?.url;
  const SB_KEY = window.XZAI_CONFIG?.supabase?.anonKey;
  if (!SB_URL || !SB_KEY) return;

  // ── Session ID (per browser tab) ──
  let sessionId = sessionStorage.getItem('xz_sid');
  if (!sessionId) {
    sessionId = Math.random().toString(36).substring(2) + Date.now().toString(36);
    sessionStorage.setItem('xz_sid', sessionId);
  }

  // ── Device detection ──
  function getDevice() {
    const ua = navigator.userAgent;
    if (/Mobile|Android|iPhone|iPad/i.test(ua)) return /iPad/i.test(ua) ? 'tablet' : 'mobile';
    return 'desktop';
  }

  // ── Page info ──
  const startTime = Date.now();
  const page      = window.location.pathname + window.location.search;
  const referrer  = document.referrer || '';
  const device    = getDevice();

  // ── Max scroll depth ──
  let maxScroll = 0;
  window.addEventListener('scroll', () => {
    const scrolled = (window.scrollY + window.innerHeight) / document.body.scrollHeight * 100;
    if (scrolled > maxScroll) maxScroll = Math.round(scrolled);
  }, { passive: true });

  // ── Send to Supabase ──
  async function track(event, extra = {}) {
    try {
      await fetch(`${SB_URL}/rest/v1/page_views`, {
        method: 'POST',
        headers: {
          apikey:         SB_KEY,
          Authorization:  `Bearer ${SB_KEY}`,
          'Content-Type': 'application/json',
          Prefer:         'return=minimal',
        },
        body: JSON.stringify({
          page,
          event,
          session_id: sessionId,
          referrer:   referrer.substring(0, 200),
          device,
          duration:   Math.round((Date.now() - startTime) / 1000),
          scroll_pct: maxScroll,
          created_at: new Date().toISOString(),
          ...extra,
        }),
      });
    } catch (_) {}
  }

  // ── Track pageview on load ──
  track('pageview');

  // ── Track exit ──
  window.addEventListener('beforeunload', () => {
    const duration = Math.round((Date.now() - startTime) / 1000);
    // استخدام sendBeacon لضمان الإرسال عند الإغلاق
    const payload = JSON.stringify({
      page, event: 'exit', session_id: sessionId,
      referrer: referrer.substring(0,200), device,
      duration, scroll_pct: maxScroll,
      created_at: new Date().toISOString(),
    });
    if (navigator.sendBeacon) {
      navigator.sendBeacon(
        `${SB_URL}/rest/v1/page_views`,
        new Blob([payload], { type: 'application/json' })
      );
    }
  });

  // ── Track article view & update views counter ──
  if (page.includes('article.html')) {
    const params = new URLSearchParams(window.location.search);
    const articleId = params.get('id');
    if (articleId) {
      // زيادة عداد المشاهدات
      setTimeout(async () => {
        try {
          // جلب العدد الحالي
          const r = await fetch(
            `${SB_URL}/rest/v1/ai_articles?id=eq.${articleId}&select=views`,
            { headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}` } }
          );
          const data = await r.json();
          const currentViews = data?.[0]?.views || 0;
          // تحديث
          await fetch(`${SB_URL}/rest/v1/ai_articles?id=eq.${articleId}`, {
            method: 'PATCH',
            headers: {
              apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}`,
              'Content-Type': 'application/json', Prefer: 'return=minimal',
            },
            body: JSON.stringify({ views: currentViews + 1 }),
          });
        } catch (_) {}
      }, 5000); // بعد 5 ثواني (قراءة حقيقية)
    }
  }

})();
