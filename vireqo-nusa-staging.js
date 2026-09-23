(function () {
  'use strict';
  if (window.__JELNUSA_NUSA_BOOTSTRAPPED__) return;
  window.__JELNUSA_NUSA_BOOTSTRAPPED__ = true;

  function install() {
    if (document.querySelector('script[data-client-id="jelnusa-staging"]')) return;
    var script = document.createElement('script');
    script.src = 'https://assistant.vireqo.id/client.js';
    script.dataset.clientId = 'jelnusa-staging';
    script.async = true;
    script.defer = true;
    script.onerror = function () {
      script.remove();
      console.error('[JelNusa] NUSA assistant could not be loaded.');
    };
    document.body.appendChild(script);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', install, { once: true });
  } else {
    install();
  }
})();
