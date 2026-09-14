// Unified Tracking Utility for Meta Pixel & TikTok Pixel

export const META_PIXEL_ID = "2705295083168577";

/**
 * Initializes or updates TikTok Pixel dynamically when ID is provided
 * @param {string} pixelId 
 */
export function initTikTokPixel(pixelId) {
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
 * Requested by targetologist: Event "Calculator view" on /calculator
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

  // TikTok Pixel ViewContent
  if (window.ttq && typeof window.ttq.track === "function") {
    try {
      window.ttq.track("ViewContent", {
        content_name: "Solar Calculator",
        content_type: "product"
      });
    } catch (e) {
      console.warn("[Analytics] TikTok Calculator view error:", e);
    }
  }
}

/**
 * Tracks Lead conversion event upon form submission / visiting /thank-you
 * Requested by targetologist: Event "Lead" on /thank-you
 * @param {Object} [params] Optional metadata (service, form name, value, currency)
 */
export function trackLead(params = {}) {
  if (typeof window === "undefined") return;

  const eventData = {
    content_name: params.service || "Solar Consultation Lead",
    status: "submitted",
    currency: "UAH",
    ...params
  };

  // Meta Pixel Lead Event
  if (typeof window.fbq === "function") {
    try {
      window.fbq("track", "Lead", eventData);
    } catch (e) {
      console.warn("[Analytics] Meta Lead event error:", e);
    }
  }

  // TikTok Pixel SubmitForm / CompleteRegistration Event
  if (window.ttq && typeof window.ttq.track === "function") {
    try {
      window.ttq.track("SubmitForm", eventData);
    } catch (e) {
      console.warn("[Analytics] TikTok SubmitForm event error:", e);
    }
  }
}

/**
 * Generic custom event tracker for both pixels
 * @param {string} eventName 
 * @param {Object} [data] 
 */
export function trackCustomEvent(eventName, data = {}) {
  if (typeof window === "undefined" || !eventName) return;

  if (typeof window.fbq === "function") {
    try {
      window.fbq("trackCustom", eventName, data);
    } catch (e) {
      console.warn("[Analytics] Meta custom event error:", e);
    }
  }

  if (window.ttq && typeof window.ttq.track === "function") {
    try {
      window.ttq.track(eventName, data);
    } catch (e) {
      console.warn("[Analytics] TikTok custom event error:", e);
    }
  }
}

