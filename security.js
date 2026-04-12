/**
 * XZAI Supabase Helper
 * دوال مساعدة لضمان تحميل Supabase SDK بشكل صحيح
 */

/**
 * Wait for Supabase SDK to load
 * ينتظر حتى يكتمل تحميل Supabase SDK من CDN
 * @returns {Promise<boolean>} true إذا تم التحميل، false إذا فشل
 */
window.waitForSupabase = function() {
  return new Promise((resolve) => {
    // Already loaded?
    if (typeof supabase !== 'undefined') {
      console.log('✅ Supabase SDK already loaded');
      resolve(true);
      return;
    }

    console.log('🔄 Waiting for Supabase SDK to load...');
    
    // Check every 100ms
    let attempts = 0;
    const maxAttempts = 100; // 10 seconds total
    
    const checkInterval = setInterval(() => {
      attempts++;
      
      if (typeof supabase !== 'undefined') {
        clearInterval(checkInterval);
        console.log('✅ Supabase SDK loaded successfully');
        resolve(true);
      } else if (attempts >= maxAttempts) {
        clearInterval(checkInterval);
        console.error('❌ Supabase SDK failed to load after 10 seconds');
        console.error('💡 Make sure this script is in <head>: <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>');
        resolve(false);
      }
    }, 100);
  });
};

/**
 * Initialize Supabase Client
 * ينشئ Supabase client إذا لم يكن موجوداً
 * @returns {Object|null} Supabase client أو null إذا فشل
 */
window.initSupabaseClient = function() {
  // Already initialized?
  if (window.supabaseClient) {
    return window.supabaseClient;
  }

  // Check config
  if (!window.XZAI_CONFIG || !window.XZAI_CONFIG.supabase) {
    console.error('❌ XZAI_CONFIG.supabase not found');
    console.error('💡 Make sure js/config.js is loaded before this script');
    return null;
  }

  // Check SDK
  if (typeof supabase === 'undefined') {
    console.error('❌ Supabase SDK not loaded');
    console.error('💡 Call waitForSupabase() first');
    return null;
  }

  try {
    const { createClient } = supabase;
    window.supabaseClient = createClient(
      window.XZAI_CONFIG.supabase.url,
      window.XZAI_CONFIG.supabase.anonKey
    );
    
    console.log('✅ Supabase client initialized');
    return window.supabaseClient;
  } catch (error) {
    console.error('❌ Failed to initialize Supabase client:', error);
    return null;
  }
};

/**
 * Initialize Supabase (wait + create client)
 * دالة شاملة تنتظر SDK وتنشئ client
 * @returns {Promise<Object|null>} Supabase client أو null
 */
window.initSupabase = async function() {
  const loaded = await window.waitForSupabase();
  if (!loaded) return null;
  
  return window.initSupabaseClient();
};

// Auto-log on load
if (typeof supabase !== 'undefined') {
  console.log('✅ Supabase SDK available at load time');
} else {
  console.log('⏳ Supabase SDK will be checked on demand');
}
