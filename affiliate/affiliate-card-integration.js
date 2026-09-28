(function () {
  "use strict";

  const MODAL_COPY = {
    id: {
      stayIntro: "Cek pilihan penginapan untuk destinasi ini melalui partner booking kami.",
      sectionTitle: "Tempat Menginap",
      providerIntro: "Cek pilihan penginapan untuk destinasi ini melalui partner booking kami.",
      linkComing: "Link coming soon",
      ctaIntro: "Rencanakan perjalanan Anda dengan itinerary yang sesuai."
    },
    en: {
      stayIntro: "Check accommodation options for this destination through our booking partner.",
      sectionTitle: "Where to Stay",
      providerIntro: "Check accommodation options for this destination through our booking partners.",
      linkComing: "Link coming soon",
      ctaIntro: "Plan your trip with an itinerary that fits your needs."
    },
    zh: {
      stayIntro: "通过我们的预订合作伙伴查看该目的地的住宿选择。",
      sectionTitle: "住宿",
      providerIntro: "通过我们的预订合作伙伴查看该目的地的住宿选择。",
      linkComing: "链接即将上线",
      ctaIntro: "使用适合你的行程规划旅行。"
    },
    ja: {
      stayIntro: "予約パートナーを通じて、この目的地の宿泊先を確認できます。",
      sectionTitle: "宿泊先",
      providerIntro: "予約パートナーを通じて、この目的地の宿泊先を確認できます。",
      linkComing: "リンク近日公開",
      ctaIntro: "希望に合った旅程を作成して旅行を計画しましょう。"
    },
    ko: {
      stayIntro: "예약 파트너를 통해 이 여행지의 숙소 옵션을 확인하세요.",
      sectionTitle: "숙소",
      providerIntro: "예약 파트너를 통해 이 여행지의 숙소 옵션을 확인하세요.",
      linkComing: "링크 준비 중",
      ctaIntro: "원하는 일정에 맞춰 여행을 계획하세요."
    },
    ar: {
      stayIntro: "تحقق من خيارات الإقامة لهذه الوجهة عبر شريك الحجز.",
      sectionTitle: "أماكن الإقامة",
      providerIntro: "تحقق من خيارات الإقامة لهذه الوجهة عبر شركاء الحجز.",
      linkComing: "الرابط قريبًا",
      ctaIntro: "خطط لرحلتك باستخدام برنامج يناسب احتياجاتك."
    },
    nl: {
      stayIntro: "Bekijk accommodaties voor deze bestemming via onze boekingspartner.",
      sectionTitle: "Verblijven",
      providerIntro: "Bekijk accommodaties voor deze bestemming via onze boekingspartners.",
      linkComing: "Link binnenkort",
      ctaIntro: "Plan je reis met een route die bij je past."
    },
    th: {
      stayIntro: "ตรวจสอบตัวเลือกที่พักสำหรับจุดหมายนี้ผ่านพาร์ทเนอร์การจองของเรา",
      sectionTitle: "ที่พัก",
      providerIntro: "ตรวจสอบตัวเลือกที่พักสำหรับจุดหมายนี้ผ่านพาร์ทเนอร์การจองของเรา",
      linkComing: "ลิงก์เร็ว ๆ นี้",
      ctaIntro: "วางแผนทริปด้วยแผนการเดินทางที่เหมาะกับคุณ"
    }
  };

  function activeCopy() {
    const locale = window.JelNusaAffiliate ? window.JelNusaAffiliate.currentLocale() : "id";
    return MODAL_COPY[locale] || MODAL_COPY.id;
  }

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
    link.target = "_blank";
    link.rel = cta.tracked === false ? "noopener noreferrer" : "noopener noreferrer sponsored";
    link.dataset.affiliateProduct = "stay";
    link.dataset.affiliateProvider = cta.provider;
    link.dataset.affiliateTracked = cta.tracked === null ? "server" : (cta.tracked ? "true" : "false");
    link.dataset.affiliateDestination = destination;
    link.setAttribute("aria-label", cta.label + " — " + destination);
    link.innerHTML = '<span aria-hidden="true">🏨</span><span class="jl-affiliate-label"></span><span aria-hidden="true">↗</span>';
    link.querySelector(".jl-affiliate-label").textContent = cta.label;

    link.onclick = null;
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

  function enhanceDestinationModal() {
    if (!window.JelNusaAffiliate) return;
    const modal = document.getElementById("destinationDetailModal");
    if (!modal || !modal.classList.contains("is-open")) return;

    const title = modal.querySelector("#destinationDetailTitle");
    const destination = String(title?.textContent || "").trim();
    if (!destination) return;

    const cta = window.JelNusaAffiliate.createContextualCta({
      destination,
      productType: "stay"
    });
    if (!cta) return;

    const copy = activeCopy();
    const boxes = [...modal.querySelectorAll(".affiliate-box")];

    if (boxes[0]) {
      const stayBox = boxes[0];
      stayBox.classList.add("jl-ota-merged-box");

      const heading = stayBox.querySelector("h2, h3, h4");
      if (heading) {
        heading.removeAttribute("data-i18n");
        heading.textContent = copy.sectionTitle;
      }

      const p = stayBox.querySelector("p");
      if (p) {
        p.removeAttribute("data-i18n");
        p.textContent = copy.providerIntro;
      }

      stayBox.querySelector(".affiliate-coming-soon")?.remove();
      stayBox.querySelector(".jl-destination-stay-cta")?.remove();

      let providerList = stayBox.querySelector(".jl-ota-provider-list");
      if (!providerList) {
        providerList = document.createElement("div");
        providerList.className = "jl-ota-provider-list";
        stayBox.appendChild(providerList);
      }
      providerList.replaceChildren();

      ["booking", "agoda", "traveloka"].forEach(function (providerKey) {
        const providerNames = {
          booking: "Booking.com",
          agoda: "Agoda",
          traveloka: "Traveloka"
        };

        const result = window.JelNusaAffiliate.buildUrl({
          destination: destination,
          productType: "stay",
          provider: providerKey
        });

        const row = document.createElement("div");
        row.className = "jl-ota-provider-row";

        const name = document.createElement("span");
        name.className = "jl-ota-provider-name";
        name.textContent = providerNames[providerKey];

        const link = document.createElement("a");
        link.className = "jl-ota-provider-link";
        link.textContent = copy.linkComing;
        link.dataset.provider = providerKey;
        link.dataset.destination = destination;

        if (result && result.url) {
          link.href = result.url;
          link.target = "_blank";
          link.rel = result.tracked === false ? "noopener noreferrer" : "noopener noreferrer sponsored";
          link.dataset.pending = "false";
        } else {
          link.href = "#";
          link.dataset.pending = "true";
          link.setAttribute("aria-label", providerNames[providerKey] + " — " + copy.linkComing);
          link.addEventListener("click", function (event) {
            event.preventDefault();
          });
        }

        row.appendChild(name);
        row.appendChild(document.createTextNode(" : "));
        row.appendChild(link);
        providerList.appendChild(row);
      });
    }

    if (boxes[1]) {
      boxes[1].hidden = true;
      boxes[1].setAttribute("aria-hidden", "true");
    }

    const bottom = modal.querySelector(".destination-detail-cta");
    if (bottom) {
      const p = bottom.querySelector("p");
      if (p) {
        p.removeAttribute("data-i18n");
        p.textContent = copy.ctaIntro;
      }

      bottom.querySelector(".jl-destination-bottom-stay")?.remove();
    }
  }

  function observeDestinationModal() {
    const modal = document.getElementById("destinationDetailModal");
    if (!modal || modal.dataset.jlAffiliateObserved === "1") return;
    modal.dataset.jlAffiliateObserved = "1";
    new MutationObserver(function () {
      if (modal.classList.contains("is-open")) requestAnimationFrame(enhanceDestinationModal);
    }).observe(modal, { childList: true, subtree: true, attributes: true, attributeFilter: ["class"] });
  }

  function init() {
    bindAll();
    observeDestinationModal();
    enhanceDestinationModal();
    var results = document.getElementById("regionResults");
    if (results) {
      new MutationObserver(function () {
        requestAnimationFrame(bindAll);
      }).observe(results, { childList: true, subtree: true });
    }

    new MutationObserver(function () {
      refreshLabels();
      requestAnimationFrame(bindAll);
      requestAnimationFrame(enhanceDestinationModal);
    }).observe(document.documentElement, { attributes: true, attributeFilter: ["lang", "dir"] });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();