(function () {
  "use strict";

  function getConfig() {
    return window.JELNUSA_AFFILIATE_CONFIG || {};
  }

  function normalizeDestination(value) {
    return String(value || "")
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/&/g, " and ")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function destinationSearchText(value) {
    return String(value || "").trim().replace(/\s+/g, " ");
  }

  function addQueryParam(url, key, value) {
    if (!value) return url;
    try {
      var parsed = new URL(url, window.location.href);
      parsed.searchParams.set(key, value);
      return parsed.toString();
    } catch (_) {
      var separator = url.indexOf("?") >= 0 ? "&" : "?";
      return url + separator + encodeURIComponent(key) + "=" + encodeURIComponent(value);
    }
  }

  function providerFor(productType, preferredProvider) {
    var config = getConfig();
    var providers = config.providers || {};

    if (preferredProvider && providers[preferredProvider] && providers[preferredProvider].enabled) {
      var preferred = providers[preferredProvider];
      if ((preferred.productTypes || []).indexOf(productType) >= 0) {
        return { key: preferredProvider, config: preferred };
      }
    }

    return Object.keys(providers)
      .map(function (key) { return { key: key, config: providers[key] }; })
      .filter(function (item) {
        return item.config.enabled &&
          item.config.mode !== "manual-only" &&
          (item.config.productTypes || []).indexOf(productType) >= 0;
      })
      .sort(function (a, b) {
        return (a.config.priority || 999) - (b.config.priority || 999);
      })[0] || null;
  }

  function getManualOverride(destination, productType, providerKey) {
    var config = getConfig();
    var slug = normalizeDestination(destination);
    var destinationOverrides = (config.manualOverrides || {})[slug];
    if (!destinationOverrides) return null;

    var productOverrides = destinationOverrides[productType];
    if (!productOverrides) return null;

    if (providerKey && productOverrides[providerKey]) return productOverrides[providerKey];

    var firstKey = Object.keys(productOverrides)[0];
    return firstKey ? productOverrides[firstKey] : null;
  }

  function buildUrl(options) {
    options = options || {};
    var config = getConfig();
    var destination = destinationSearchText(options.destination);
    var productType = options.productType || config.defaultProductType || "stay";
    var preferredProvider = options.provider || null;

    if (!destination) return null;

    var manual = getManualOverride(destination, productType, preferredProvider);
    if (manual) return manual;

    var provider = providerFor(productType, preferredProvider);
    if (!provider || !provider.config.searchTemplate) return null;

    var url = provider.config.searchTemplate.replace(
      "{destination}",
      encodeURIComponent(destination)
    );

    if (provider.config.trackingParam && provider.config.trackingKey) {
      var tracking = (config.tracking || {})[provider.config.trackingKey];
      url = addQueryParam(url, provider.config.trackingParam, tracking);
    }

    return {
      url: url,
      provider: provider.key,
      productType: productType,
      destination: destination,
      tracked: Boolean(
        provider.config.trackingKey &&
        (config.tracking || {})[provider.config.trackingKey]
      )
    };
  }

  function getLabel(productType, locale) {
    var config = getConfig();
    var labels = config.labels || {};
    var selected = labels[locale] || labels[config.defaultLocale] || labels.id || {};
    return selected[productType] || productType;
  }

  function currentLocale() {
    var htmlLang = document.documentElement.getAttribute("lang");
    if (htmlLang) return htmlLang.toLowerCase().split("-")[0];

    var stored = localStorage.getItem("lang") || localStorage.getItem("language");
    if (stored) return stored.toLowerCase().split("-")[0];

    return getConfig().defaultLocale || "id";
  }

  function bindCards(root) {
    var scope = root || document;
    var cards = scope.querySelectorAll("[data-affiliate-destination]");

    cards.forEach(function (card) {
      var destination = card.getAttribute("data-affiliate-destination");
      var targets = card.querySelectorAll("[data-affiliate-product]");

      targets.forEach(function (target) {
        var productType = target.getAttribute("data-affiliate-product") || "stay";
        var provider = target.getAttribute("data-affiliate-provider") || null;
        var result = buildUrl({
          destination: destination,
          productType: productType,
          provider: provider
        });

        if (!result) {
          target.setAttribute("aria-disabled", "true");
          target.classList.add("affiliate-link-unavailable");
          return;
        }

        target.href = result.url;
        target.target = "_blank";
        target.rel = "noopener noreferrer sponsored";
        target.dataset.affiliateProviderResolved = result.provider;
        target.dataset.affiliateTracked = result.tracked ? "true" : "false";

        if (!target.getAttribute("data-affiliate-label-lock")) {
          target.textContent = getLabel(productType, currentLocale());
        }
      });
    });

    return cards.length;
  }

  function createContextualCta(options) {
    var result = buildUrl(options);
    if (!result) return null;

    return {
      label: getLabel(result.productType, options && options.locale ? options.locale : currentLocale()),
      url: result.url,
      provider: result.provider,
      destination: result.destination,
      productType: result.productType,
      tracked: result.tracked
    };
  }

  window.JelNusaAffiliate = {
    version: "0.1.0",
    normalizeDestination: normalizeDestination,
    buildUrl: buildUrl,
    bindCards: bindCards,
    createContextualCta: createContextualCta,
    getLabel: getLabel
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      bindCards(document);
    });
  } else {
    bindCards(document);
  }
})();