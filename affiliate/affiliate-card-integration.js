(function () {
  "use strict";

  const MODAL_COPY = {
    id: {
      stayIntro: "Pilihan penginapan tersedia melalui partner booking kami. Gunakan tautan Akomodasi di bagian Hal yang Bisa Dipesan.",
      bookIntro: "Akomodasi sudah bisa dicek melalui partner. Aktivitas dan pengalaman lokal akan ditambahkan setelah partner yang sesuai tersedia.",
      accommodationAvailable: "Akomodasi — Tersedia",
      activitiesComing: "Aktivitas — Segera Hadir",
      experiencesComing: "Pengalaman lokal — Segera Hadir",
      ctaIntro: "Rencanakan perjalanan Anda dengan itinerary yang sesuai."
    },
    en: {
      stayIntro: "Accommodation options are available through our booking partner. Use the Accommodation link under Things to Book.",
      bookIntro: "Accommodation can now be checked through our partner. Activities and local experiences will be added when suitable partners are available.",
      accommodationAvailable: "Accommodation — Available",
      activitiesComing: "Activities — Coming Soon",
      experiencesComing: "Local experiences — Coming Soon",
      ctaIntro: "Plan your trip with an itinerary that fits your needs."
    },
    zh: {
      stayIntro: "该目的地的住宿可通过我们的预订合作伙伴查看。请使用“可预订项目”中的住宿链接。",
      bookIntro: "住宿现已可通过合作伙伴查询。活动和当地体验将在合适的合作伙伴上线后添加。",
      accommodationAvailable: "住宿 — 可查看",
      activitiesComing: "活动 — 即将推出",
      experiencesComing: "当地体验 — 即将推出",
      ctaIntro: "使用适合你的行程规划旅行。"
    },
    ja: {
      stayIntro: "この目的地の宿泊先は予約パートナー経由で確認できます。「予約できるもの」の宿泊リンクをご利用ください。",
      bookIntro: "宿泊先はパートナー経由で確認できます。アクティビティと現地体験は適切なパートナーが利用可能になり次第追加します。",
      accommodationAvailable: "宿泊 — 利用可能",
      activitiesComing: "アクティビティ — 近日公開",
      experiencesComing: "現地体験 — 近日公開",
      ctaIntro: "希望に合った旅程を作成して旅行を計画しましょう。"
    },
    ko: {
      stayIntro: "이 여행지의 숙소는 예약 파트너를 통해 확인할 수 있습니다. 예약 가능한 항목의 숙소 링크를 이용하세요.",
      bookIntro: "숙소는 파트너를 통해 확인할 수 있습니다. 액티비티와 현지 체험은 적합한 파트너가 준비되면 추가됩니다.",
      accommodationAvailable: "숙소 — 이용 가능",
      activitiesComing: "액티비티 — 출시 예정",
      experiencesComing: "현지 체험 — 출시 예정",
      ctaIntro: "원하는 일정에 맞춰 여행을 계획하세요."
    },
    ar: {
      stayIntro: "يمكن التحقق من خيارات الإقامة لهذه الوجهة عبر شريك الحجز. استخدم رابط الإقامة ضمن قسم الأشياء القابلة للحجز.",
      bookIntro: "يمكن الآن التحقق من الإقامة عبر الشريك. ستتم إضافة الأنشطة والتجارب المحلية عند توفر شركاء مناسبين.",
      accommodationAvailable: "الإقامة — متاحة",
      activitiesComing: "الأنشطة — قريبًا",
      experiencesComing: "التجارب المحلية — قريبًا",
      ctaIntro: "خطط لرحلتك باستخدام برنامج يناسب احتياجاتك."
    },
    nl: {
      stayIntro: "Accommodaties voor deze bestemming zijn beschikbaar via onze boekingspartner. Gebruik de accommodatielink onder Wat je kunt boeken.",
      bookIntro: "Accommodatie kan nu via onze partner worden bekeken. Activiteiten en lokale ervaringen worden toegevoegd zodra geschikte partners beschikbaar zijn.",
      accommodationAvailable: "Accommodatie — Beschikbaar",
      activitiesComing: "Activiteiten — Binnenkort",
      experiencesComing: "Lokale ervaringen — Binnenkort",
      ctaIntro: "Plan je reis met een route die bij je past."
    },
    th: {
      stayIntro: "ที่พักสำหรับจุดหมายนี้สามารถตรวจสอบได้ผ่านพาร์ทเนอร์การจองของเรา โปรดใช้ลิงก์ที่พักในส่วนสิ่งที่จองได้",
      bookIntro: "ขณะนี้สามารถตรวจสอบที่พักผ่านพาร์ทเนอร์ได้แล้ว กิจกรรมและประสบการณ์ท้องถิ่นจะเพิ่มเมื่อมีพาร์ทเนอร์ที่เหมาะสม",
      accommodationAvailable: "ที่พัก — พร้อมใช้งาน",
      activitiesComing: "กิจกรรม — เร็ว ๆ นี้",
      experiencesComing: "ประสบการณ์ท้องถิ่น — เร็ว ๆ นี้",
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
      const p = stayBox.querySelector("p");
      if (p) {
        p.removeAttribute("data-i18n");
        p.textContent = copy.stayIntro;
      }

      stayBox.querySelector(".jl-destination-stay-cta")?.remove();
      const old = stayBox.querySelector(".affiliate-coming-soon");
      if (old) old.remove();
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
        itemLink.target = "_blank";
        itemLink.rel = cta.tracked === false ? "noopener noreferrer" : "noopener noreferrer sponsored";
        itemLink.textContent = copy.accommodationAvailable + " ↗";
        itemLink.onclick = null;
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