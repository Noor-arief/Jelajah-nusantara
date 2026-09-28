(function () {
  "use strict";

  function bindCard(card) {
    if (!card || !window.JelNusaAffiliate) return;
    var body = card.querySelector(".region-card-body");
    var title = body && body.querySelector("h3");
    var old = body && body.querySelector(".region-hotel");
    if (!body || !title || !old) return;

    var destination = String(title.textContent || "").trim();
    if (!destination) return;

    var cta = window.JelNusaAffiliate.createContextualCta({
      destination: destination,
      productType: "stay"
    });
    if (!cta) {
      old.hidden = true;
      return;
    }

    card.dataset.affiliateDestination = destination;

    var link;
    if (old.matches("a.jl-affiliate-card-cta")) {
      link = old;
    } else {
      link = document.createElement("a");
      link.className = "region-hotel jl-affiliate-card-cta";
      old.replaceWith(link);
    }

    link.href = cta.url;
    link.removeAttribute("target");
    link.rel = cta.tracked === false ? "noopener noreferrer" : "noopener noreferrer sponsored";
    link.dataset.affiliateProduct = "stay";
    link.dataset.affiliateProvider = cta.provider;
    link.dataset.affiliateTracked = cta.tracked === null ? "server" : (cta.tracked ? "true" : "false");
    link.dataset.affiliateDestination = destination;
    link.setAttribute("aria-label", cta.label + " — " + destination);
    link.innerHTML = '<span aria-hidden="true">🏨</span><span class="jl-affiliate-label"></span><span aria-hidden="true">↗</span>';
    link.querySelector(".jl-affiliate-label").textContent = cta.label;

    link.onclick = function (event) {
      event.stopPropagation();
    };
  }

  function bindAll() {
    document.querySelectorAll(".region-card").forEach(bindCard);
  }

  function refreshLabels() {
    var locale = window.JelNusaAffiliate ? window.JelNusaAffiliate.currentLocale() : "id";
    document.querySelectorAll(".jl-affiliate-card-cta").forEach(function (link) {
      var label = window.JelNusaAffiliate.getLabel("stay", locale);
      var span = link.querySelector(".jl-affiliate-label");
      if (span) span.textContent = label;
      var destination = link.dataset.affiliateDestination || "";
      link.setAttribute("aria-label", label + " — " + destination);
    });
  }

  function init() {
    bindAll();
    var results = document.getElementById("regionResults");
    if (results) {
      new MutationObserver(function () {
        requestAnimationFrame(bindAll);
      }).observe(results, { childList: true, subtree: true });
    }

    new MutationObserver(function () {
      refreshLabels();
      requestAnimationFrame(bindAll);
    }).observe(document.documentElement, { attributes: true, attributeFilter: ["lang", "dir"] });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();