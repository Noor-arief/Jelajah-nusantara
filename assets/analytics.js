(() => {
  "use strict";

  const measurementId = String(window.JELNUSA_ANALYTICS_ID || "").trim();
  if (!/^G-[A-Z0-9]+$/i.test(measurementId)) return;

  const CONSENT_KEY = "jelnusa_analytics_consent";
  const ACCEPTED = "granted";
  const DECLINED = "denied";
  const PARTNER_HOSTS = ["agoda.com", "booking.com", "traveloka.com"];
  let loaded = false;

  function loadGoogleAnalytics() {
    if (loaded) return;
    loaded = true;

    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function(){ window.dataLayer.push(arguments); };

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(measurementId);
    document.head.appendChild(script);

    window.gtag("js", new Date());
    window.gtag("config", measurementId, {
      allow_google_signals: false,
      allow_ad_personalization_signals: false
    });

    document.addEventListener("click", trackAffiliateClick, true);
  }

  function trackAffiliateClick(event) {
    const link = event.target && event.target.closest ? event.target.closest("a[href]") : null;
    if (!link || !window.gtag) return;

    let url;
    try { url = new URL(link.href, window.location.href); } catch (_) { return; }

    const host = url.hostname.replace(/^www\./, "").toLowerCase();
    const isPartner = PARTNER_HOSTS.some(domain => host === domain || host.endsWith("." + domain));
    const explicitAffiliate = link.hasAttribute("data-affiliate") || /affiliate|partner/i.test(link.className || "");
    if (!isPartner && !explicitAffiliate) return;

    window.gtag("event", "affiliate_click", {
      link_domain: host,
      link_url: url.href,
      link_text: (link.textContent || "").trim().slice(0, 100),
      page_location: window.location.href
    });
  }

  function saveConsent(value) {
    try { localStorage.setItem(CONSENT_KEY, value); } catch (_) {}
  }

  function getConsent() {
    try { return localStorage.getItem(CONSENT_KEY); } catch (_) { return null; }
  }

  function closeBanner(banner) {
    if (banner && banner.parentNode) banner.parentNode.removeChild(banner);
  }

  function createConsentBanner() {
    if (document.getElementById("jl-analytics-consent")) return;

    const banner = document.createElement("div");
    banner.id = "jl-analytics-consent";
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-label", "Analytics preferences");
    banner.style.cssText = [
      "position:fixed","left:16px","right:16px","bottom:16px","z-index:2147483000",
      "max-width:720px","margin:0 auto","padding:16px 18px","border-radius:16px",
      "background:#0f2f34","color:#fff","box-shadow:0 12px 36px rgba(0,0,0,.24)",
      "font:14px/1.5 Inter,system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif"
    ].join(";");

    const text = document.createElement("p");
    text.style.cssText = "margin:0 0 12px;color:#eef8f5";
    text.textContent = "JelNusa uses optional analytics to understand site usage and improve travel content. Analytics stays off unless you allow it.";

    const actions = document.createElement("div");
    actions.style.cssText = "display:flex;gap:10px;flex-wrap:wrap";

    const decline = document.createElement("button");
    decline.type = "button";
    decline.textContent = "No thanks";
    decline.style.cssText = "border:1px solid rgba(255,255,255,.45);background:transparent;color:#fff;border-radius:999px;padding:9px 14px;cursor:pointer";

    const accept = document.createElement("button");
    accept.type = "button";
    accept.textContent = "Allow analytics";
    accept.style.cssText = "border:0;background:#f3b544;color:#152b2e;border-radius:999px;padding:9px 14px;font-weight:700;cursor:pointer";

    decline.addEventListener("click", () => {
      saveConsent(DECLINED);
      closeBanner(banner);
    });

    accept.addEventListener("click", () => {
      saveConsent(ACCEPTED);
      closeBanner(banner);
      loadGoogleAnalytics();
    });

    actions.append(decline, accept);
    banner.append(text, actions);
    document.body.appendChild(banner);
  }

  function init() {
    const consent = getConsent();
    if (consent === ACCEPTED) {
      loadGoogleAnalytics();
      return;
    }
    if (consent === DECLINED) return;
    createConsentBanner();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
