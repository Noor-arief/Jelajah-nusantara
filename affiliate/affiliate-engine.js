(function () {
  "use strict";

  function getConfig() { return window.JELNUSA_AFFILIATE_CONFIG || {}; }

  function normalizeDestination(value) {
    return String(value || "").trim().toLowerCase().normalize("NFD")
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
      if ((preferred.productTypes || []).indexOf(productType) >= 0 && preferred.mode !== "manual-only") {
        return { key: preferredProvider, config: preferred };
      }
    }
    return Object.keys(providers).map(function (key) {
      return { key: key, config: providers[key] };
    }).filter(function (item) {
      return item.config.enabled &&
        item.config.mode !== "manual-only" &&
        (item.config.productTypes || []).indexOf(productType) >= 0;
    }).sort(function (a, b) {
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
    if (providerKey && productOverrides[providerKey]) {
      return { url: productOverrides[providerKey], provider: providerKey, tracked: true };
    }
    var firstKey = Object.keys(productOverrides)[0];
    return firstKey ? { url: productOverrides[firstKey], provider: firstKey, tracked: true } : null;
  }

  function buildUrl(options) {
    options = options || {};
    var config = getConfig();
    var destination = destinationSearchText(options.destination);
    var productType = options.productType || config.defaultProductType || "stay";
    var preferredProvider = options.provider || null;
    if (!destination) return null;

    var manual = getManualOverride(destination, productType, preferredProvider);
    if (manual) {
      return {
        url: manual.url,
        provider: manual.provider,
        productType: productType,
        destination: destination,
        tracked: true,
        source: "manual-override"
      };
    }

    var provider = providerFor(productType, preferredProvider);
    if (!provider || !provider.config.searchTemplate) return null;

    var url = provider.config.searchTemplate.replace("{destination}", encodeURIComponent(destination));
    if (provider.config.mode === "server-resolved") {
      return {
        url: url,
        provider: provider.key,
        productType: productType,
        destination: destination,
        tracked: null,
        source: "server-resolved"
      };
    }

    var tracking = provider.config.trackingKey
      ? (config.tracking || {})[provider.config.trackingKey]
      : "";

    if (provider.config.trackingParam && tracking) {
      url = addQueryParam(url, provider.config.trackingParam, tracking);
    }

    return {
      url: url,
      provider: provider.key,
      productType: productType,
      destination: destination,
      tracked: Boolean(tracking),
      source: tracking ? "generated-affiliate" : "generated-partner-search"
    };
  }

  function currentLocale() {
    var htmlLang = document.documentElement.getAttribute("lang");
    if (htmlLang) return htmlLang.toLowerCase().split("-")[0];
    return getConfig().defaultLocale || "id";
  }

  function getLabel(productType, locale) {
    var config = getConfig();
    var labels = config.labels || {};
    var selected = labels[locale] || labels[config.defaultLocale] || labels.id || {};
    return selected[productType] || productType;
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
      tracked: result.tracked,
      source: result.source
    };
  }

  function monetizationStatus() {
    var c = getConfig();
    return {
      booking: c.providers?.booking?.mode === "server-resolved" ? "server-resolved" : false,
      agoda: false,
      manualOverrides: Object.keys(c.manualOverrides || {}).length
    };
  }

  window.JelNusaAffiliate = {
    version: "0.2.0",
    normalizeDestination: normalizeDestination,
    buildUrl: buildUrl,
    createContextualCta: createContextualCta,
    getLabel: getLabel,
    currentLocale: currentLocale,
    monetizationStatus: monetizationStatus
  };
})();