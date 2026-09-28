/* Phase 1 targeted hotfix: mobile language selector cleanup only.
   Prevents stale backdrop/body scroll lock after a language is selected. */
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

  document.addEventListener("click", function (event) {
    const option = event.target.closest(
      ROOT + ' .jl-language-menu button[data-lang]'
    );
    if (!option) return;

    /* Run after the existing language handler/i18next update. */
    requestAnimationFrame(closeLanguageUi);
    setTimeout(closeLanguageUi, 60);
  });
})();