// Unified Tracking Utility for Meta Pixel & TikTok Pixel

export const META_PIXEL_ID = "2705295083168577";
export const TIKTOK_PIXEL_ID = "DALRVP3C77U1JKBFSIH0";

/**
 * Initializes or updates TikTok Pixel dynamically when ID is provided
 * @param {string} pixelId 
 */
export function initTikTokPixel(pixelId = TIKTOK_PIXEL_ID) {
  if (typeof window === "undefined" || !pixelId) return;
  window.TIKTOK_PIXEL_ID = pixelId;
  if (window.ttq && typeof window.ttq.load === "function") {
    try {
      window.ttq.load(pixelId);
      window.ttq.page();
      console.log("[Analytics] TikTok Pixel initialized:", pixelId);
    } catch (e) {
      console.warn("[Analytics] Error initializing TikTok Pixel:", e);
    }
  }
}

/**
 * Tracks PageView on route changes across Meta and TikTok pixels
 * @param {string} path 
 */
export function trackPageView(path = window.location.pathname) {
  if (typeof window === "undefined") return;

  // Meta Pixel PageView
  if (typeof window.fbq === "function") {
    try {
      window.fbq("track", "PageView");
    } catch (e) {
      console.warn("[Analytics] Meta Pixel PageView error:", e);
    }
  }

  // TikTok Pixel PageView
  if (window.ttq && typeof window.ttq.page === "function") {
    try {
      window.ttq.page();
    } catch (e) {
      console.warn("[Analytics] TikTok Pixel PageView error:", e);
    }
  }
}

/**
 * Tracks Calculator view event (Custom event "Calculator view" + standard "ViewContent")
 * Identical event names for Meta & TikTok
 */
export function trackCalculatorView() {
  if (typeof window === "undefined") return;

  // Meta Pixel Custom & Standard Event
  if (typeof window.fbq === "function") {
    try {
      // 1. Exact custom event name requested by targetologist
      window.fbq("trackCustom", "Calculator view", {
        content_name: "Solar Calculator",
        content_category: "Calculator"
      });

      // 2. Standard ViewContent for Meta Ads algorithmic optimization
      window.fbq("track", "ViewContent", {
        content_name: "Solar Calculator",
        content_category: "Calculator"
      });
    } catch (e) {
      console.warn("[Analytics] Meta Calculator view error:", e);
    }
  }

  // TikTok Pixel: both "Calculator view" as requested and standard "ViewContent"
  if (window.ttq && typeof window.ttq.track === "function") {
    try {
      window.ttq.track("Calculator view", {
        content_name: "Solar Calculator",
        content_type: "product",
        value: 0,
        currency: "UAH"
      });
      window.ttq.track("ViewContent", {
        content_name: "Solar Calculator",
        content_type: "product",
        value: 0,
        currency: "UAH"
      });
    } catch (e) {
      console.warn("[Analytics] TikTok Calculator view error:", e);
    }
  }
}

/**
 * Tracks Lead conversion event upon form submission / visiting /thank-you
 * Includes standard 'value' and 'currency' parameters for TikTok ROAS & Meta optimization
 * @param {Object} [params] Optional metadata (service, form name, value, currency)
 */
export function trackLead(params = {}) {
  if (typeof window === "undefined") return;

  const leadValue = params.value !== undefined ? Number(params.value) : 1;
  const currency = params.currency || "UAH";

  const eventData = {
    content_name: params.service || "Solar Consultation Lead",
    status: "submitted",
    value: leadValue,
    currency: currency,
    ...params
  };

  // Meta Pixel Lead Event (Standard 'Lead' + Custom 'Lead' for Meta Ads Manager)
  if (typeof window.fbq === "function") {
    try {
      window.fbq("track", "Lead", eventData);
      window.fbq("trackCustom", "Lead", eventData);
    } catch (e) {
      console.warn("[Analytics] Meta Lead event error:", e);
    }
  }

  // TikTok Pixel Event - SubmitForm (стандартна подія TikTok для оптимізації конверсій/лідів)
  if (window.ttq && typeof window.ttq.track === "function") {
    try {
      window.ttq.track("SubmitForm", eventData);
    } catch (e) {
      console.warn("[Analytics] TikTok SubmitForm event error:", e);
    }
  }
}

/**
 * Generic custom event tracker for both pixels with required value & currency
 * @param {string} eventName 
 * @param {Object} [data] 
 */
export function trackCustomEvent(eventName, data = {}) {
  if (typeof window === "undefined" || !eventName) return;

  const eventPayload = {
    value: data.value !== undefined ? Number(data.value) : 0,
    currency: data.currency || "UAH",
    ...data
  };

  if (typeof window.fbq === "function") {
    try {
      window.fbq("trackCustom", eventName, eventPayload);
    } catch (e) {
      console.warn("[Analytics] Meta custom event error:", e);
    }
  }

  if (window.ttq && typeof window.ttq.track === "function") {
    try {
      window.ttq.track(eventName, eventPayload);
    } catch (e) {
      console.warn("[Analytics] TikTok custom event error:", e);
    }
  }
}

/**
 * 5 Service Offer Events Mapping
 */
export const OFFER_EVENTS = {
  'ses-building': {
    event: 'Offer_SES_Building',
    name: 'Побудова сонячних станцій (5 кВт – 1 МВт)'
  },
  'solar_plants': {
    event: 'Offer_SES_Building',
    name: 'Побудова сонячних станцій (5 кВт – 1 МВт)'
  },
  'hybrid-systems': {
    event: 'Offer_Deye_Hybrid',
    name: 'Гібридні системи Deye та акумулятори'
  },
  'deye_batteries': {
    event: 'Offer_Deye_Hybrid',
    name: 'Гібридні системи Deye та акумулятори'
  },
  'roof-installation': {
    event: 'Offer_Roof_Panels',
    name: 'Установка сонячних панелей на дах'
  },
  'roof_panels': {
    event: 'Offer_Roof_Panels',
    name: 'Установка сонячних панелей на дах'
  },
  'roof-mounting': {
    event: 'Offer_Roof_Panels',
    name: 'Установка сонячних панелей на дах'
  },
  'green-tariff-legal': {
    event: 'Offer_Green_Tariff',
    name: 'Супровід документації & Зелений Тариф'
  },
  'legal_tariff': {
    event: 'Offer_Green_Tariff',
    name: 'Супровід документації & Зелений Тариф'
  },
  'tariffs': {
    event: 'Offer_Green_Tariff',
    name: 'Супровід документації & Зелений Тариф'
  },
  'battery-systems': {
    event: 'Offer_Grid_Setup',
    name: 'Налагодження електромереж в будівлях'
  },
  'electrical_grids': {
    event: 'Offer_Grid_Setup',
    name: 'Налагодження електромереж в будівлях'
  },
  'grid-setup': {
    event: 'Offer_Grid_Setup',
    name: 'Налагодження електромереж в будівлях'
  }
};

/**
 * Tracks click on an individual service offer card / button
 * @param {string} serviceKey 
 * @param {string} [title] 
 */
export function trackOfferClick(serviceKey, title = '') {
  const match = OFFER_EVENTS[serviceKey] || Object.values(OFFER_EVENTS).find(item => 
    (title && item.name.toLowerCase().includes(title.toLowerCase())) ||
    (serviceKey && item.name.toLowerCase().includes(serviceKey.toLowerCase()))
  );

  const eventName = match ? match.event : 'Offer_Click';
  const offerName = match ? match.name : (title || serviceKey || 'Послуга СЕС');

  trackCustomEvent(eventName, {
    offer_id: serviceKey,
    offer_name: offerName,
    category: 'ServiceOffer'
  });
}

/**
 * Tracks primary CTA button clicks across the site
 * @param {'CTA_Hero_Consultation'|'CTA_Header_Consultation'|'CTA_Mini_Calculator'|'CTA_Calculator_Quote'|'CTA_Engineer_Showcase'|'CTA_Deye_Section'|'CTA_Step_Process'|'CTA_Footer_Consultation'} ctaName 
 * @param {Object} [details] 
 */
export function trackCtaClick(ctaName, details = {}) {
  trackCustomEvent(ctaName, {
    category: 'CTA_Button',
    page_path: typeof window !== 'undefined' ? window.location.pathname : '',
    ...details
  });
}

/**
 * Tracks clicks on phone call links
 * @param {Object} [details] 
 */
export function trackPhoneClick(details = {}) {
  trackCustomEvent('Click_Phone_Number', {
    phone: '+380675300103',
    page_path: typeof window !== 'undefined' ? window.location.pathname : '',
    ...details
  });
}

/**
 * Tracks clicks on floating call widget
 */
export function trackFloatingCallClick() {
  trackCustomEvent('Click_Floating_Call', {
    category: 'Floating_Call_Widget',
    phone: '+380675300103'
  });
}

/**
 * Tracks clicks on TikTok social link
 * @param {Object} [details] 
 */
export function trackTikTokClick(details = {}) {
  trackCustomEvent('Click_TikTok_Social', {
    channel: 'TikTok',
    account: '@novaenergy.ua',
    url: 'https://www.tiktok.com/@novaenergy.ua',
    ...details
  });
}


