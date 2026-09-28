/* Phase 1 targeted hotfix v4: mobile language selector stacking + cleanup only. */
(function () {
  "use strict";

  const ROOT = "#jelLanguageSwitcher";
  const MOBILE_BP = 768;
  const HEADER_CLASS = "jl-language-layer-open";

  function ensureScopedStackingRule() {
    if (document.getElementById("jl-language-stack-hotfix-v4")) return;
    const style = document.createElement("style");
    style.id = "jl-language-stack-hotfix-v4";
    style.textContent = "@media (max-width: 768px) {" +
      "header." + HEADER_CLASS + "{z-index:1300!important;}" +
      "header." + HEADER_CLASS + " " + ROOT + "," +
      "header." + HEADER_CLASS + " " + ROOT + " .jl-language-menu{z-index:1302!important;}" +
      ".jl-language-backdrop{z-index:1200!important;}" +
      "header." + HEADER_CLASS + " " + ROOT + " .jl-language-menu{bottom:calc(100% - 100dvh)!important;}" +
      "}";
    document.head.appendChild(style);
  }

  function syncHeaderLayer() {
    const root = document.querySelector(ROOT);
    const header = document.querySelector("header");
    if (!header) return;
    const open = !!root && root.classList.contains("is-open") && window.innerWidth <= MOBILE_BP;
    header.classList.toggle(HEADER_CLASS, open);
  }

  function closeLanguageUi() {
    const root = document.querySelector(ROOT);
    if (root) {
      root.classList.remove("is-open");
      const trigger = root.querySelector(".jl-language-trigger");
      if (trigger) trigger.setAttribute("aria-expanded", "false");
      const menu = root.querySelector(".jl-language-menu");
      if (menu && window.innerWidth <= MOBILE_BP) {
        menu.style.display = "none";
        menu.style.pointerEvents = "none";
      }
    }

    const languageBackdrop = document.querySelector(".jl-language-backdrop");
    if (languageBackdrop) languageBackdrop.classList.remove("is-visible");

    const primaryNav = document.getElementById("primaryNav");
    if (primaryNav) primaryNav.classList.remove("is-open");

    const navBackdrop = document.getElementById("navBackdrop");
    if (navBackdrop) navBackdrop.classList.remove("is-open");

    const navToggle = document.querySelector(".nav-toggle");
    if (navToggle) navToggle.setAttribute("aria-expanded", "false");

    const header = document.querySelector("header");
    if (header) header.classList.remove(HEADER_CLASS);

    document.body.style.overflow = "";
  }

  function queueClose() {
    requestAnimationFrame(closeLanguageUi);
    setTimeout(closeLanguageUi, 80);
    setTimeout(closeLanguageUi, 180);
  }

  function bindLayerObserver() {
    const root = document.querySelector(ROOT);
    if (!root || root.dataset.jlStackObserved === "1") return;
    root.dataset.jlStackObserved = "1";
    const observer = new MutationObserver(syncHeaderLayer);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    const trigger = root.querySelector(".jl-language-trigger");
    if (trigger) {
      trigger.addEventListener("click", function () {
        requestAnimationFrame(syncHeaderLayer);
        setTimeout(syncHeaderLayer, 20);
      }, true);
    }
    syncHeaderLayer();
  }

  document.addEventListener("click", function (event) {
    const option = event.target.closest(ROOT + " .jl-language-menu button[data-lang]");
    if (!option) return;
    queueClose();
  }, true);

  function bindI18nCleanup() {
    if (!window.i18next || typeof window.i18next.on !== "function") return false;
    window.i18next.on("languageChanged", queueClose);
    return true;
  }

  ensureScopedStackingRule();
  bindLayerObserver();

  if (!bindI18nCleanup()) {
    let attempts = 0;
    const timer = setInterval(function () {
      attempts += 1;
      bindLayerObserver();
      if (bindI18nCleanup() || attempts >= 20) clearInterval(timer);
    }, 250);
  }
})();