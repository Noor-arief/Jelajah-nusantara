/* Phase 1 targeted hotfix v3: mobile language selector cleanup only.
   Scope: clear both language and mobile-nav overlay states after language selection. */
(function () {
  "use strict";

  const ROOT = "#jelLanguageSwitcher";
  const MOBILE_BP = 768;

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

    /* Also clear the independent hamburger-nav overlay state.
       This does not change layout; it only removes stale open-state classes. */
    const primaryNav = document.getElementById("primaryNav");
    if (primaryNav) primaryNav.classList.remove("is-open");

    const navBackdrop = document.getElementById("navBackdrop");
    if (navBackdrop) navBackdrop.classList.remove("is-open");

    const navToggle = document.querySelector(".nav-toggle");
    if (navToggle) navToggle.setAttribute("aria-expanded", "false");

    document.body.style.overflow = "";
  }

  function queueClose() {
    requestAnimationFrame(closeLanguageUi);
    setTimeout(closeLanguageUi, 80);
    setTimeout(closeLanguageUi, 180);
  }

  /* Capture phase is intentional: legacy handlers may stop bubbling. */
  document.addEventListener("click", function (event) {
    const option = event.target.closest(
      ROOT + ' .jl-language-menu button[data-lang]'
    );
    if (!option) return;
    queueClose();
  }, true);

  function bindI18nCleanup() {
    if (!window.i18next || typeof window.i18next.on !== "function") return false;
    window.i18next.on("languageChanged", queueClose);
    return true;
  }

  if (!bindI18nCleanup()) {
    let attempts = 0;
    const timer = setInterval(function () {
      attempts += 1;
      if (bindI18nCleanup() || attempts >= 20) clearInterval(timer);
    }, 250);
  }
})();