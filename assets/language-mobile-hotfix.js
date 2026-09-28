/* Phase 1 targeted hotfix v2: mobile language selector cleanup only.
   Scope: close stale language selector/backdrop after a language is selected. */
(function () {
  "use strict";

  const ROOT = "#jelLanguageSwitcher";
  const MOBILE_BP = 768;

  function closeLanguageUi() {
    const root = document.querySelector(ROOT);
    if (!root) return;

    root.classList.remove("is-open");

    const trigger = root.querySelector(".jl-language-trigger");
    if (trigger) trigger.setAttribute("aria-expanded", "false");

    const menu = root.querySelector(".jl-language-menu");
    if (menu && window.innerWidth <= MOBILE_BP) {
      menu.style.display = "none";
      menu.style.pointerEvents = "none";
    }

    const backdrop = document.querySelector(".jl-language-backdrop");
    if (backdrop) backdrop.classList.remove("is-visible");

    document.body.style.overflow = "";
  }

  function queueClose() {
    requestAnimationFrame(closeLanguageUi);
    setTimeout(closeLanguageUi, 80);
  }

  /* Capture phase is intentional: the legacy selector handler may stop bubbling. */
  document.addEventListener("click", function (event) {
    const option = event.target.closest(
      ROOT + ' .jl-language-menu button[data-lang]'
    );
    if (!option) return;
    queueClose();
  }, true);

  /* Keyboard/programmatic language changes get the same cleanup. */
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