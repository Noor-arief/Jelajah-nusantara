/* Phase 1 targeted hotfix v5: mobile language selector viewport positioning only. */
(function () {
  "use strict";

  const ROOT = "#jelLanguageSwitcher";
  const MOBILE_BP = 768;
  let originalParent = null;
  let originalNextSibling = null;

  function getRoot() {
    return document.querySelector(ROOT);
  }

  function getMenu() {
    return document.querySelector(".jl-language-menu");
  }

  function getBackdrop() {
    return document.querySelector(".jl-language-backdrop");
  }

  function portalMenuForMobile() {
    const root = getRoot();
    const menu = root ? root.querySelector(".jl-language-menu") : getMenu();
    if (!root || !menu || window.innerWidth > MOBILE_BP) return;

    if (!originalParent) {
      originalParent = menu.parentNode;
      originalNextSibling = menu.nextSibling;
    }

    if (menu.parentNode !== document.body) {
      document.body.appendChild(menu);
    }

    Object.assign(menu.style, {
      display: "block",
      pointerEvents: "auto",
      position: "fixed",
      left: "0",
      right: "0",
      width: "100%",
      maxWidth: "none",
      margin: "0",
      opacity: "1",
      visibility: "visible",
      zIndex: "1302"
    });
    menu.style.setProperty("bottom", "0", "important");
    menu.style.setProperty("top", "auto", "important");
    menu.style.setProperty("transform", "translateY(0)", "important");
  }

  function restoreMenuForDesktop() {
    const menu = getMenu();
    if (!menu || !originalParent || window.innerWidth <= MOBILE_BP) return;

    if (menu.parentNode !== originalParent) {
      if (originalNextSibling && originalNextSibling.parentNode === originalParent) {
        originalParent.insertBefore(menu, originalNextSibling);
      } else {
        originalParent.appendChild(menu);
      }
    }

    menu.removeAttribute("style");
  }

  function closeLanguageUi() {
    const root = getRoot();
    const menu = getMenu();

    if (root) {
      root.classList.remove("is-open");
      const trigger = root.querySelector(".jl-language-trigger");
      if (trigger) trigger.setAttribute("aria-expanded", "false");
    }

    if (menu && window.innerWidth <= MOBILE_BP) {
      menu.style.display = "none";
      menu.style.pointerEvents = "none";
      menu.style.opacity = "0";
      menu.style.visibility = "hidden";
    }

    const languageBackdrop = getBackdrop();
    if (languageBackdrop) languageBackdrop.classList.remove("is-visible");

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

  function bindMobilePositioning() {
    const root = getRoot();
    if (!root || root.dataset.jlViewportBound === "1") return;

    root.dataset.jlViewportBound = "1";

    const observer = new MutationObserver(function () {
      if (window.innerWidth <= MOBILE_BP && root.classList.contains("is-open")) {
        portalMenuForMobile();
      }
    });
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });

    const trigger = root.querySelector(".jl-language-trigger");
    if (trigger) {
      trigger.addEventListener("click", function () {
        requestAnimationFrame(function () {
          if (root.classList.contains("is-open")) portalMenuForMobile();
        });
        setTimeout(function () {
          if (root.classList.contains("is-open")) portalMenuForMobile();
        }, 30);
      }, true);
    }
  }

  document.addEventListener("click", function (event) {
    const option = event.target.closest(".jl-language-menu button[data-lang]");
    if (!option) return;
    queueClose();
  }, true);

  function bindI18nCleanup() {
    if (!window.i18next || typeof window.i18next.on !== "function") return false;
    window.i18next.on("languageChanged", queueClose);
    return true;
  }

  window.addEventListener("resize", function () {
    if (window.innerWidth > MOBILE_BP) {
      restoreMenuForDesktop();
      closeLanguageUi();
    }
  });

  bindMobilePositioning();

  if (!bindI18nCleanup()) {
    let attempts = 0;
    const timer = setInterval(function () {
      attempts += 1;
      bindMobilePositioning();
      if (bindI18nCleanup() || attempts >= 20) clearInterval(timer);
    }, 250);
  }
})();