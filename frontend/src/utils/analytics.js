// Unified Tracking Utility for Meta Pixel & TikTok Pixel

export const META_PIXEL_ID = "2705295083168577";
export const TIKTOK_PIXEL_ID = "DALRVP3C77U1JKBFSIH0";

/**
 * Helper to retrieve Meta test_event_code from URL search params or sessionStorage
 */
export function getMetaTestEventCode() {
  if (typeof window === "undefined") return null;
  try {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("test_event_code");
    if (code) {
      sessionStorage.setItem("fb_test_event_code", code);
      return code;
    }
    return sessionStorage.getItem("fb_test_event_code") || null;
  } catch (e) {
    return null;
  }
}

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

  const testCode = getMetaTestEventCode();
  const testOptions = testCode ? { test_event_code: testCode } : undefined;

  // Meta Pixel PageView
  if (typeof window.fbq === "function") {
    try {
      if (testOptions) {
        window.fbq("track", "PageView", {}, testOptions);
      } else {
        window.fbq("track", "PageView");
      }
      console.log(
        "%c[Meta Pixel] ✅ PageView tracked: " + path,
        "background: #1877F2; color: white; padding: 2px 6px; border-radius: 3px;"
      );
    } catch (e) {
      console.warn("[Analytics] Meta Pixel PageView error:", e);
    }
  }

  // TikTok Pixel PageView
  if (window.ttq && typeof window.ttq.page === "function") {
    try {
      window.ttq.page();
      console.log(
        "%c[TikTok Pixel] ✅ PageView tracked: " + path,
        "background: #000000; color: #00f2fe; padding: 2px 6px; border-radius: 3px;"
      );
    } catch (e) {
      console.warn("[Analytics] TikTok Pixel PageView error:", e);
    }
  }
}

let lastLeadTrackedAt = 0;

/**
 * Tracks Lead conversion event upon visiting /thank-you
 * Strictly standard parameters: value, currency, content_name
 * @param {Object} [params]
 */
export function trackLead(params = {}) {
  if (typeof window === "undefined") return;

  const now = Date.now();
  // Prevent duplicate Lead events within 3 seconds (e.g. from index.html + ThankYouPage mount)
  if (
    !params.is_manual_test &&
    (now - lastLeadTrackedAt < 3000 || (window.__leadTrackedAt && (now - window.__leadTrackedAt < 3000)))
  ) {
    return;
  }
  lastLeadTrackedAt = now;

  const leadValue = params.value !== undefined ? Number(params.value) : 1;
  const currency = params.currency || "UAH";
  const contentName = params.service || "Solar Consultation";

  // Meta Pixel Lead Event (standard parameters ONLY)
  const metaEventData = {
    value: leadValue,
    currency: currency,
    content_name: contentName
  };

  const testCode = getMetaTestEventCode();
  const testOptions = testCode ? { test_event_code: testCode } : undefined;

  if (typeof window.fbq === "function") {
    try {
      if (testOptions) {
        window.fbq("track", "Lead", metaEventData, testOptions);
      } else {
        window.fbq("track", "Lead", metaEventData);
      }
      console.log(
        "%c[Meta Pixel] 🎯 Lead event fired successfully!",
        "background: #1877F2; color: #ffffff; font-weight: bold; font-size: 12px; padding: 4px 8px; border-radius: 4px;",
        metaEventData
      );
    } catch (e) {
      console.warn("[Analytics] Meta Lead event error:", e);
    }
  }

  // TikTok Pixel Event - SubmitForm (standard event for conversion)
  const tiktokEventData = {
    value: leadValue,
    currency: currency,
    content_name: contentName
  };

  if (window.ttq && typeof window.ttq.track === "function") {
    try {
      window.ttq.track("SubmitForm", tiktokEventData);
      console.log(
        "%c[TikTok Pixel] 🎯 SubmitForm event fired successfully!",
        "background: #000000; color: #00f2fe; font-weight: bold; font-size: 12px; padding: 4px 8px; border-radius: 4px;",
        tiktokEventData
      );
    } catch (e) {
      console.warn("[Analytics] TikTok SubmitForm event error:", e);
    }
  }
}

/**
 * Generic custom event tracker for both pixels
 * STRICT REQUIREMENT FROM TARGETOLOGIST:
 * Custom events are ONLY allowed for offer interactions (starting with Offer_)!
 * All other custom events are silenced to keep Meta Ads clean and focused on standard PageView and Lead.
 * @param {string} eventName 
 * @param {Object} [data] 
 */
export function trackCustomEvent(eventName, data = {}) {
  if (typeof window === "undefined" || !eventName) return;

  // Only allow Offer_* custom events as instructed by targetologist
  if (!eventName.startsWith("Offer_")) {
    return;
  }

  const eventPayload = {
    value: data.value !== undefined ? Number(data.value) : 0,
    currency: data.currency || "UAH",
    ...data
  };

  const testCode = getMetaTestEventCode();
  const testOptions = testCode ? { test_event_code: testCode } : undefined;

  if (typeof window.fbq === "function") {
    try {
      if (testOptions) {
        window.fbq("trackCustom", eventName, eventPayload, testOptions);
      } else {
        window.fbq("trackCustom", eventName, eventPayload);
      }
      console.log(
        `%c[Meta Pixel] 📦 Offer custom event: ${eventName}`,
        "background: #2563eb; color: white; padding: 2px 6px; border-radius: 3px;",
        eventPayload
      );
    } catch (e) {
      console.warn("[Analytics] Meta custom event error:", e);
    }
  }

  if (window.ttq && typeof window.ttq.track === "function") {
    try {
      window.ttq.track(eventName, eventPayload);
      console.log(
        `%c[TikTok Pixel] 📦 Offer custom event: ${eventName}`,
        "background: #000000; color: #ff0050; padding: 2px 6px; border-radius: 3px;",
        eventPayload
      );
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
 * Disabled per targetologist request: only Offer_* custom events are active
 */
export function trackCtaClick(ctaName, details = {}) {
  // Silenced per targetologist instructions
}

/**
 * Tracks clicks on phone call links
 * Silenced per targetologist instructions
 */
export function trackPhoneClick(details = {}) {
  // Silenced per targetologist instructions
}

/**
 * Tracks clicks on floating call widget
 * Silenced per targetologist instructions
 */
export function trackFloatingCallClick() {
  // Silenced per targetologist instructions
}

/**
 * Tracks clicks on TikTok social link
 * Silenced per targetologist instructions
 */
export function trackTikTokClick(details = {}) {
  // Silenced per targetologist instructions
}

/**
 * Tracks Calculator view event
 * Silenced per targetologist instructions (only standard PageView on pages)
 */
export function trackCalculatorView() {
  // Silenced per targetologist instructions
}

// Attach manual testing utilities to window for easy verification in DevTools Console
if (typeof window !== "undefined") {
  window.testLead = (serviceName = "Тестова заявка") => {
    console.log("%c[Test Utility] 🚀 Manually triggering Lead event...", "color: #f59e0b; font-weight: bold;");
    lastLeadTrackedAt = 0;
    if (window.__leadTrackedAt) window.__leadTrackedAt = 0;
    trackLead({ service: serviceName, is_manual_test: true });
  };
  window.testPageView = () => {
    console.log("%c[Test Utility] 🚀 Manually triggering PageView event...", "color: #f59e0b; font-weight: bold;");
    trackPageView(window.location.pathname);
  };
}
