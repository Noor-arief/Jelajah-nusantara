(function () {
  "use strict";

  window.JELNUSA_AFFILIATE_CONFIG = {
    version: "0.2.0",
    defaultLocale: "id",
    defaultProductType: "stay",

    tracking: {
      bookingAid: "",
      agodaCid: ""
    },

    providers: {
      booking: {
        enabled: true,
        productTypes: ["stay"],
        priority: 10,
        searchTemplate: "https://www.booking.com/searchresults.html?ss={destination}",
        trackingParam: "aid",
        trackingKey: "bookingAid"
      },
      agoda: {
        enabled: false,
        productTypes: ["stay"],
        priority: 20,
        searchTemplate: "https://www.agoda.com/search?text={destination}",
        trackingParam: "cid",
        trackingKey: "agodaCid",
        note: "Enable only after a real Agoda affiliate CID is available."
      },
      traveloka: {
        enabled: false,
        productTypes: ["stay", "activity", "flight"],
        priority: 30,
        mode: "manual-only",
        note: "Use only account-generated Traveloka affiliate links. Do not invent or synthesize tracking links."
      }
    },

    labels: {
      id: { stay: "Cari Penginapan", activity: "Cari Aktivitas", flight: "Cari Penerbangan" },
      en: { stay: "Find Stays", activity: "Find Activities", flight: "Find Flights" },
      zh: { stay: "查找住宿", activity: "查找活动", flight: "查找航班" },
      ja: { stay: "宿泊先を探す", activity: "アクティビティを探す", flight: "航空券を探す" },
      ko: { stay: "숙소 찾기", activity: "액티비티 찾기", flight: "항공편 찾기" },
      ar: { stay: "ابحث عن إقامة", activity: "ابحث عن أنشطة", flight: "ابحث عن رحلات" },
      nl: { stay: "Vind verblijf", activity: "Vind activiteiten", flight: "Vind vluchten" },
      th: { stay: "ค้นหาที่พัก", activity: "ค้นหากิจกรรม", flight: "ค้นหาเที่ยวบิน" }
    },

    manualOverrides: {}
  };
})();