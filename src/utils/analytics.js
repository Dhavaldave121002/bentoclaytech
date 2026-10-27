// Google Analytics 4 (gtag.js) Utility for Bento Clay Tech
export const GA_MEASUREMENT_ID = 'G-HXRECFVJ7G';

/**
 * Send a custom GA4 event safely
 */
export function trackEvent(eventName, eventParams = {}) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, {
      send_to: GA_MEASUREMENT_ID,
      ...eventParams
    });
  }
}

/**
 * Send a SPA pageview to GA4 on route change
 */
export function trackPageView(pagePath, pageTitle) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: pagePath,
      page_title: pageTitle,
      page_location: window.location.href
    });
    window.gtag('event', 'page_view', {
      page_path: pagePath,
      page_title: pageTitle,
      page_location: window.location.href
    });
  }
}

/**
 * Initializes global delegation listeners for user conversions:
 * - WhatsApp clicks
 * - Phone call clicks
 * - Email inquiry clicks
 * - PDF / Technical Data Sheet downloads
 * - "Get Quote" / "Request a quote" clicks
 */
export function initGlobalAnalyticsListeners() {
  if (typeof window === 'undefined') return;

  const handleGlobalClick = (e) => {
    const target = e.target.closest('a, button');
    if (!target) return;

    const href = target.getAttribute('href') || '';
    const text = (target.innerText || target.getAttribute('title') || '').trim();

    // 1. WhatsApp tracking
    if (href.includes('wa.me') || href.includes('whatsapp.com')) {
      trackEvent('generate_lead', {
        event_category: 'Leads',
        event_label: `WhatsApp - ${text || 'Direct Chat'}`,
        method: 'WhatsApp',
        value: 1.0
      });
      return;
    }

    // 2. Phone Call tracking
    if (href.startsWith('tel:')) {
      trackEvent('contact', {
        event_category: 'Leads',
        event_label: `Phone Call - ${href}`,
        method: 'Phone'
      });
      return;
    }

    // 3. Email tracking
    if (href.startsWith('mailto:')) {
      trackEvent('contact', {
        event_category: 'Leads',
        event_label: `Email Inquiry - ${href}`,
        method: 'Email'
      });
      return;
    }

    // 4. PDF / Technical Sheet Downloads
    if (href.endsWith('.pdf') || href.includes('/pds/') || href.includes('download')) {
      trackEvent('file_download', {
        event_category: 'Downloads',
        event_label: text || href,
        file_name: href
      });
      return;
    }

    // 5. Quote / RFQ Action clicks
    if (
      href.includes('/contact') ||
      text.toLowerCase().includes('quote') ||
      text.toLowerCase().includes('rfq') ||
      text.toLowerCase().includes('sample')
    ) {
      trackEvent('quote_click', {
        event_category: 'Engagement',
        event_label: text || 'Request a quote'
      });
    }
  };

  document.addEventListener('click', handleGlobalClick, { passive: true });
}
