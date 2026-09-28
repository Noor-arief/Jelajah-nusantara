(function () {
  "use strict";

  const MODAL_COPY = {
    id: {
      stayIntro: "Cek pilihan penginapan untuk destinasi ini melalui partner booking kami.",
      bookIntro: "Akomodasi sudah bisa dicek melalui partner. Aktivitas dan pengalaman lokal akan ditambahkan setelah partner yang sesuai tersedia.",
      accommodationAvailable: "Akomodasi — Tersedia",
      activitiesComing: "Aktivitas — Segera Hadir",
      experiencesComing: "Pengalaman lokal — Segera Hadir",
      ctaIntro: "Rencanakan perjalanan atau cek pilihan penginapan yang tersedia."
    },
    en: {
      stayIntro: "Check accommodation options for this destination through our booking partner.",
      bookIntro: "Accommodation can now be checked through our partner. Activities and local experiences will be added when suitable partners are available.",
      accommodationAvailable: "Accommodation — Available",
      activitiesComing: "Activities — Coming Soon",
      experiencesComing: "Local experiences — Coming Soon",
      ctaIntro: "Plan your trip or check available accommodation options."
    },
    zh: {
      stayIntro: "通过我们的预订合作伙伴查看该目的地的住宿选择。",
      bookIntro: "住宿现已可通过合作伙伴查询。活动和当地体验将在合适的合作伙伴上线后添加。",
      accommodationAvailable: "住宿 — 可查看",
      activitiesComing: "活动 — 即将推出",
      experiencesComing: "当地体验 — 即将推出",
      ctaIntro: "规划行程或查看可用住宿。"
    },
    ja: {
      stayIntro: "予約パートナーを通じて、この目的地の宿泊先を確認できます。",
      bookIntro: "宿泊先はパートナー経由で確認できます。アクティビティと現地体験は適切なパートナーが利用可能になり次第追加します。",
      accommodationAvailable: "宿泊 — 利用可能",
      activitiesComing: "アクティビティ — 近日公開",
      experiencesComing: "現地体験 — 近日公開",
      ctaIntro: "旅程を作成するか、利用可能な宿泊先を確認してください。"
    },
    ko: {
      stayIntro: "예약 파트너를 통해 이 여행지의 숙소 옵션을 확인하세요.",
      bookIntro: "숙소는 파트너를 통해 확인할 수 있습니다. 액티비티와 현지 체험은 적합한 파트너가 준비되면 추가됩니다.",
      accommodationAvailable: "숙소 — 이용 가능",
      activitiesComing: "액티비티 — 출시 예정",
      experiencesComing: "현지 체험 — 출시 예정",
      ctaIntro: "여행을 계획하거나 이용 가능한 숙소를 확인하세요."
    },
    ar: {
      stayIntro: "تحقق من خيارات الإقامة لهذه الوجهة عبر شريك الحجز.",
      bookIntro: "يمكن الآن التحقق من الإقامة عبر الشريك. ستتم إضافة الأنشطة والتجارب المحلية عند توفر شركاء مناسبين.",
      accommodationAvailable: "الإقامة — متاحة",
      activitiesComing: "الأنشطة — قريبًا",
      experiencesComing: "التجارب المحلية — قريبًا",
      ctaIntro: "خطط لرحلتك أو تحقق من خيارات الإقامة المتاحة."
    },
    nl: {
      stayIntro: "Bekijk accommodaties voor deze bestemming via onze boekingspartner.",
      bookIntro: "Accommodatie kan nu via onze partner worden bekeken. Activiteiten en lokale ervaringen worden toegevoegd zodra geschikte partners beschikbaar zijn.",
      accommodationAvailable: "Accommodatie — Beschikbaar",
      activitiesComing: "Activiteiten — Binnenkort",
      experiencesComing: "Lokale ervaringen — Binnenkort",
      ctaIntro: "Plan je reis of bekijk beschikbare accommodaties."
    },
    th: {
      stayIntro: "ตรวจสอบตัวเลือกที่พักสำหรับจุดหมายนี้ผ่านพาร์ทเนอร์การจองของเรา",
      bookIntro: "ขณะนี้สามารถตรวจสอบที่พักผ่านพาร์ทเนอร์ได้แล้ว กิจกรรมและประสบการณ์ท้องถิ่นจะเพิ่มเมื่อมีพาร์ทเนอร์ที่เหมาะสม",
      accommodationAvailable: "ที่พัก — พร้อมใช้งาน",
      activitiesComing: "กิจกรรม — เร็ว ๆ นี้",
      experiencesComing: "ประสบการณ์ท้องถิ่น — เร็ว ๆ นี้",
      ctaIntro: "วางแผนทริปหรือดูตัวเลือกที่พักที่พร้อมใช้งาน"
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
      event.preventDefault();
      event.stopPropagation();
      window.location.assign(cta.url);
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
      const p = stayBox.querySelector("p");
      if (p) {
        p.removeAttribute("data-i18n");
        p.textContent = copy.stayIntro;
      }

      let link = stayBox.querySelector(".jl-destination-stay-cta");
      const old = stayBox.querySelector(".affiliate-coming-soon");
      if (!link) {
        link = document.createElement("a");
        link.className = "affiliate-coming-soon jl-destination-stay-cta";
        if (old) old.replaceWith(link);
        else stayBox.appendChild(link);
      }
      link.href = cta.url;
      link.removeAttribute("target");
      link.rel = cta.tracked === false ? "noopener noreferrer" : "noopener noreferrer sponsored";
      link.dataset.affiliateDestination = destination;
      link.dataset.affiliateProvider = cta.provider;
      link.innerHTML = '<span aria-hidden="true">🏨</span> <span class="jl-modal-stay-label"></span> <span aria-hidden="true">↗</span>';
      link.querySelector(".jl-modal-stay-label").textContent = cta.label;
      link.onclick = function (event) {
        event.preventDefault();
        event.stopPropagation();
        window.location.assign(cta.url);
      };
    }

    if (boxes[1]) {
      const bookBox = boxes[1];
      const p = bookBox.querySelector("p");
      if (p) {
        p.removeAttribute("data-i18n");
        p.textContent = copy.bookIntro;
      }
      const items = bookBox.querySelectorAll("li");
      if (items[0]) {
        items[0].removeAttribute("data-i18n");
        let itemLink = items[0].querySelector(".jl-things-book-stay");
        if (!itemLink) {
          items[0].replaceChildren();
          itemLink = document.createElement("a");
          itemLink.className = "jl-things-book-stay";
          items[0].appendChild(itemLink);
        }
        itemLink.href = cta.url;
        itemLink.removeAttribute("target");
        itemLink.rel = cta.tracked === false ? "noopener noreferrer" : "noopener noreferrer sponsored";
        itemLink.textContent = copy.accommodationAvailable + " ↗";
        itemLink.onclick = function (event) {
          event.preventDefault();
          event.stopPropagation();
          window.location.assign(cta.url);
        };
      }
      if (items[1]) {
        items[1].removeAttribute("data-i18n");
        items[1].textContent = copy.activitiesComing;
      }
      if (items[2]) {
        items[2].removeAttribute("data-i18n");
        items[2].textContent = copy.experiencesComing;
      }
    }

    const bottom = modal.querySelector(".destination-detail-cta");
    if (bottom) {
      const p = bottom.querySelector("p");
      if (p) {
        p.removeAttribute("data-i18n");
        p.textContent = copy.ctaIntro;
      }

      let stayLink = bottom.querySelector(".jl-destination-bottom-stay");
      if (!stayLink) {
        stayLink = document.createElement("a");
        stayLink.className = "destination-btn jl-destination-bottom-stay";
        const planner = bottom.querySelector(".destination-btn");
        if (planner) planner.insertAdjacentElement("beforebegin", stayLink);
        else bottom.appendChild(stayLink);
      }
      stayLink.href = cta.url;
      stayLink.removeAttribute("target");
      stayLink.rel = cta.tracked === false ? "noopener noreferrer" : "noopener noreferrer sponsored";
      stayLink.textContent = cta.label + " →";
      stayLink.onclick = function (event) {
        event.preventDefault();
        event.stopPropagation();
        window.location.assign(cta.url);
      };
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