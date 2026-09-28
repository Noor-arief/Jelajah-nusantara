/* JelNusa Phase 2 — FAQ, Legal & Trust Center */
(function(){
  "use strict";

  const COPY={
    en:{
      faq:"FAQ",affiliate:"Affiliate Disclosure",disclaimer:"Travel & AI Disclaimer",
      updated:"Last updated: 28 September 2026",
      faqIntro:"Quick answers about JelNusa, partner links, travel information, and NUSA.",
      faqs:[
        ["What is JelNusa?","JelNusa is a travel discovery and information platform focused on helping people explore destinations across Indonesia. It is not a hotel, airline, tour operator, travel agency, or booking provider."],
        ["Does JelNusa handle bookings or payments?","No. When an active partner link is available, any booking, payment, cancellation, or refund is handled directly by the third-party provider shown on the booking page."],
        ["Are partner links affiliate links?","Some active partner links may be affiliate links. When that applies, JelNusa may receive a commission from the partner at no additional cost to you. Affiliate relationships are disclosed where relevant."],
        ["How current is the travel information?","Travel conditions, prices, schedules, entry rules, closures, and local policies can change. Use JelNusa for planning and inspiration, then verify important details with current official sources or the relevant provider before traveling."],
        ["What is NUSA?","NUSA is JelNusa's AI travel assistant. It can help with destination ideas, itineraries, budget guidance, packing, and general travel questions."],
        ["Can NUSA make mistakes?","Yes. AI-generated answers can be incomplete, inaccurate, or outdated. Verify important safety, health, entry, legal, transport, weather, and booking information with authoritative current sources."],
        ["Does NUSA make bookings for me?","No. NUSA can help you plan and may point you to available partner options, but any transaction is completed directly with the relevant third-party provider."],
        ["How can I contact JelNusa?","Email JelNusa at arifmuhamad94@gmail.com. Partnership inquiries can also use the Partnership form on this website."]
      ],
      affiliateIntro:"JelNusa may use affiliate links when approved partner programs are active.",
      affiliateParas:[
        "If you use a clearly identified affiliate or partner link and complete a qualifying transaction, JelNusa may receive a commission from the partner at no additional cost to you.",
        "JelNusa does not process the booking or payment. Prices, availability, cancellations, refunds, and service delivery remain the responsibility of the third-party provider.",
        "A partner or affiliate link does not mean JelNusa guarantees the provider, the availability of an offer, or the quality of the third-party service.",
        "Partner links may be added, changed, or removed as approved programs become available."
      ],
      disclaimerIntro:"JelNusa and NUSA provide general travel information and planning assistance.",
      disclaimerParas:[
        "Travel information may change without notice. Verify entry requirements, permits, health and safety guidance, transport schedules, weather, closures, prices, and local rules using current official or authoritative sources.",
        "NUSA uses artificial intelligence. Its responses may contain errors, omissions, or outdated information and should not be treated as an official source.",
        "For urgent safety or emergency situations, contact the appropriate local authorities or emergency services rather than relying on JelNusa or NUSA.",
        "Where professional advice is appropriate, use a qualified professional or official authority."
      ],
      termsAI:"7. AI Assistant (NUSA)",
      termsAIText:"NUSA provides AI-generated travel planning assistance. Responses may be incomplete, inaccurate, or outdated. Users should verify important travel, safety, health, entry, legal, transport, weather, and booking information with authoritative current sources.",
      termsSafety:"8. Safety & Official Information",
      termsSafetyText:"JelNusa is not an emergency service or an official government, immigration, health, weather, transport, or safety authority. Travelers remain responsible for checking current official requirements and conditions relevant to their trip.",
      privacyAI:"10. AI Assistant Interactions",
      privacyAIText:"If you choose to use NUSA, the text you submit is processed through the technical services used to operate the AI assistant so a response can be generated. Avoid submitting passwords, payment-card details, government identification numbers, medical records, or other sensitive personal information that is not necessary for a travel question."
    },
    id:{
      faq:"FAQ",affiliate:"Pengungkapan Afiliasi",disclaimer:"Disclaimer Perjalanan & AI",
      updated:"Terakhir diperbarui: 28 September 2026",
      faqIntro:"Jawaban singkat tentang JelNusa, tautan partner, informasi perjalanan, dan NUSA.",
      faqs:[
        ["Apa itu JelNusa?","JelNusa adalah platform penemuan destinasi dan informasi perjalanan yang membantu pengguna menjelajahi berbagai destinasi di Indonesia. JelNusa bukan hotel, maskapai, operator tur, agen perjalanan, atau penyedia pemesanan."],
        ["Apakah JelNusa menangani pemesanan atau pembayaran?","Tidak. Jika tautan partner aktif tersedia, pemesanan, pembayaran, pembatalan, atau pengembalian dana dilakukan langsung dengan penyedia pihak ketiga yang ditampilkan pada halaman pemesanan."],
        ["Apakah tautan partner merupakan tautan afiliasi?","Sebagian tautan partner aktif dapat berupa tautan afiliasi. Jika berlaku, JelNusa dapat menerima komisi dari partner tanpa biaya tambahan bagi Anda. Hubungan afiliasi akan dijelaskan jika relevan."],
        ["Seberapa terkini informasi perjalanan di JelNusa?","Kondisi perjalanan, harga, jadwal, aturan masuk, penutupan, dan kebijakan lokal dapat berubah. Gunakan JelNusa untuk perencanaan dan inspirasi, lalu verifikasi informasi penting melalui sumber resmi terkini atau penyedia terkait sebelum bepergian."],
        ["Apa itu NUSA?","NUSA adalah AI Travel Assistant JelNusa yang dapat membantu ide destinasi, itinerary, estimasi anggaran, packing, dan pertanyaan perjalanan umum."],
        ["Apakah NUSA bisa salah?","Ya. Jawaban AI dapat tidak lengkap, tidak akurat, atau sudah tidak terkini. Verifikasi informasi penting mengenai keselamatan, kesehatan, aturan masuk, hukum, transportasi, cuaca, dan pemesanan melalui sumber resmi terkini."],
        ["Apakah NUSA bisa melakukan pemesanan untuk saya?","Tidak. NUSA dapat membantu perencanaan dan menunjukkan opsi partner yang tersedia, tetapi transaksi dilakukan langsung dengan penyedia pihak ketiga terkait."],
        ["Bagaimana menghubungi JelNusa?","Email JelNusa di arifmuhamad94@gmail.com. Pertanyaan kemitraan juga dapat disampaikan melalui formulir Kemitraan di website ini."]
      ],
      affiliateIntro:"JelNusa dapat menggunakan tautan afiliasi ketika program partner yang disetujui sudah aktif.",
      affiliateParas:[
        "Jika Anda menggunakan tautan afiliasi atau partner yang diberi label dengan jelas dan menyelesaikan transaksi yang memenuhi syarat, JelNusa dapat menerima komisi dari partner tanpa biaya tambahan bagi Anda.",
        "JelNusa tidak memproses pemesanan atau pembayaran. Harga, ketersediaan, pembatalan, pengembalian dana, dan penyediaan layanan tetap menjadi tanggung jawab penyedia pihak ketiga.",
        "Tautan partner atau afiliasi tidak berarti JelNusa menjamin penyedia, ketersediaan penawaran, atau kualitas layanan pihak ketiga.",
        "Tautan partner dapat ditambahkan, diubah, atau dihapus seiring tersedianya program yang disetujui."
      ],
      disclaimerIntro:"JelNusa dan NUSA menyediakan informasi perjalanan serta bantuan perencanaan umum.",
      disclaimerParas:[
        "Informasi perjalanan dapat berubah sewaktu-waktu. Verifikasi aturan masuk, izin, panduan kesehatan dan keselamatan, jadwal transportasi, cuaca, penutupan, harga, dan aturan lokal melalui sumber resmi atau otoritatif terkini.",
        "NUSA menggunakan kecerdasan buatan. Jawabannya dapat mengandung kesalahan, kekurangan, atau informasi yang tidak lagi terkini dan tidak boleh dianggap sebagai sumber resmi.",
        "Untuk keadaan darurat atau masalah keselamatan mendesak, hubungi otoritas lokal atau layanan darurat yang sesuai dan jangan hanya mengandalkan JelNusa atau NUSA.",
        "Jika diperlukan nasihat profesional, gunakan tenaga profesional yang berkualifikasi atau otoritas resmi."
      ],
      termsAI:"7. AI Assistant (NUSA)",
      termsAIText:"NUSA memberikan bantuan perencanaan perjalanan yang dihasilkan AI. Jawaban dapat tidak lengkap, tidak akurat, atau tidak terkini. Pengguna harus memverifikasi informasi penting tentang perjalanan, keselamatan, kesehatan, aturan masuk, hukum, transportasi, cuaca, dan pemesanan melalui sumber resmi terkini.",
      termsSafety:"8. Keselamatan & Informasi Resmi",
      termsSafetyText:"JelNusa bukan layanan darurat atau otoritas resmi pemerintah, imigrasi, kesehatan, cuaca, transportasi, maupun keselamatan. Pelancong tetap bertanggung jawab untuk memeriksa persyaratan dan kondisi resmi terkini yang relevan dengan perjalanannya.",
      privacyAI:"10. Interaksi dengan AI Assistant",
      privacyAIText:"Jika Anda memilih menggunakan NUSA, teks yang Anda kirim diproses melalui layanan teknis yang digunakan untuk menjalankan AI Assistant agar respons dapat dihasilkan. Hindari mengirim kata sandi, detail kartu pembayaran, nomor identitas pemerintah, rekam medis, atau informasi pribadi sensitif lain yang tidak diperlukan untuk pertanyaan perjalanan."
    },
    zh:{
      faq:"常见问题",affiliate:"联盟营销披露",disclaimer:"旅行与 AI 免责声明",
      updated:"最后更新：2026年9月28日",
      faqIntro:"关于 JelNusa、合作伙伴链接、旅行信息和 NUSA 的常见问题。",
      faqs:[
        ["JelNusa 是什么？","JelNusa 是一个专注于印度尼西亚目的地探索与旅行信息的平台。我们不是酒店、航空公司、旅行社、旅游运营商或预订服务提供商。"],
        ["JelNusa 会处理预订或付款吗？","不会。若有有效的合作伙伴链接，预订、付款、取消或退款均由预订页面显示的第三方服务提供商直接处理。"],
        ["合作伙伴链接是联盟营销链接吗？","部分有效的合作伙伴链接可能属于联盟营销链接。在适用情况下，JelNusa 可能从合作伙伴处获得佣金，您无需支付额外费用。相关联盟关系会在适当位置说明。"],
        ["旅行信息有多新？","旅行条件、价格、时间表、入境规则、关闭信息和当地政策可能发生变化。请将 JelNusa 用于规划和灵感，并在出行前通过最新官方来源或相关服务提供商核实重要信息。"],
        ["NUSA 是什么？","NUSA 是 JelNusa 的 AI 旅行助手，可协助目的地建议、行程规划、预算参考、行李准备及一般旅行问题。"],
        ["NUSA 会出错吗？","会。AI 生成的回答可能不完整、不准确或已经过时。重要的安全、健康、入境、法律、交通、天气和预订信息应通过最新权威来源核实。"],
        ["NUSA 能替我预订吗？","不能。NUSA 可以协助规划并提示可用的合作伙伴选项，但交易仍由相关第三方服务提供商直接完成。"],
        ["如何联系 JelNusa？","请发送邮件至 arifmuhamad94@gmail.com。合作咨询也可通过网站上的合作伙伴表单提交。"]
      ],
      affiliateIntro:"当获批的合作伙伴计划启用时，JelNusa 可能使用联盟营销链接。",
      affiliateParas:["如果您使用明确标注的联盟或合作伙伴链接并完成符合条件的交易，JelNusa 可能从合作伙伴处获得佣金，您无需支付额外费用。","JelNusa 不处理预订或付款。价格、可用性、取消、退款和服务交付由第三方提供商负责。","合作伙伴或联盟链接不代表 JelNusa 对提供商、优惠可用性或第三方服务质量作出保证。","随着获批计划的开放，合作伙伴链接可能被添加、修改或移除。"],
      disclaimerIntro:"JelNusa 与 NUSA 提供一般旅行信息和行程规划协助。",
      disclaimerParas:["旅行信息可能随时变化。请通过最新官方或权威来源核实入境要求、许可、健康与安全建议、交通时刻、天气、关闭信息、价格和当地规定。","NUSA 使用人工智能，其回答可能存在错误、遗漏或过时信息，不应被视为官方来源。","在紧急安全情况中，请联系当地有关部门或紧急服务，不要仅依赖 JelNusa 或 NUSA。","如需要专业建议，请咨询具备资质的专业人士或官方机构。"],
      termsAI:"7. AI 助手（NUSA）",termsAIText:"NUSA 提供 AI 生成的旅行规划协助。回答可能不完整、不准确或过时。用户应通过最新权威来源核实重要的旅行、安全、健康、入境、法律、交通、天气和预订信息。",
      termsSafety:"8. 安全与官方信息",termsSafetyText:"JelNusa 不是紧急服务，也不是政府、移民、卫生、气象、交通或安全官方机构。旅行者有责任核实与自身行程相关的最新官方要求和条件。",
      privacyAI:"10. AI 助手互动",privacyAIText:"如果您选择使用 NUSA，您提交的文本会通过运行 AI 助手所需的技术服务进行处理，以生成回复。请勿提交与旅行问题无关的密码、支付卡信息、政府身份证号码、医疗记录或其他敏感个人信息。"
    },
    ja:{
      faq:"よくある質問",affiliate:"アフィリエイト開示",disclaimer:"旅行・AI 免責事項",
      updated:"最終更新：2026年9月28日",
      faqIntro:"JelNusa、パートナーリンク、旅行情報、NUSA に関するよくある質問です。",
      faqs:[
        ["JelNusa とは？","JelNusa はインドネシア各地の目的地を探すための旅行情報プラットフォームです。ホテル、航空会社、ツアーオペレーター、旅行代理店、予約サービス提供者ではありません。"],
        ["JelNusa は予約や支払いを処理しますか？","いいえ。有効なパートナーリンクがある場合でも、予約、支払い、キャンセル、返金は予約ページに表示される第三者サービス提供者と直接行われます。"],
        ["パートナーリンクはアフィリエイトリンクですか？","一部の有効なパートナーリンクはアフィリエイトリンクの場合があります。その場合、利用者の追加費用なしで JelNusa がパートナーからコミッションを受け取ることがあります。該当する関係は必要に応じて明示します。"],
        ["旅行情報は最新ですか？","旅行状況、料金、時刻表、入国条件、閉鎖情報、現地ルールは変わる可能性があります。JelNusa は計画やアイデアに利用し、重要情報は出発前に最新の公式情報や関連提供者で確認してください。"],
        ["NUSA とは？","NUSA は JelNusa の AI 旅行アシスタントで、目的地選び、旅程、予算、持ち物、一般的な旅行質問をサポートします。"],
        ["NUSA は間違えることがありますか？","はい。AI の回答は不完全、不正確、または古い場合があります。安全、健康、入国、法律、交通、天候、予約など重要な情報は最新の信頼できる情報源で確認してください。"],
        ["NUSA は予約を代行しますか？","いいえ。NUSA は計画を支援し利用可能なパートナー選択肢を案内できますが、取引は第三者サービス提供者と直接行います。"],
        ["JelNusa への連絡方法は？","arifmuhamad94@gmail.com までメールしてください。提携に関するお問い合わせはサイトのパートナーシップフォームも利用できます。"]
      ],
      affiliateIntro:"承認されたパートナープログラムが有効な場合、JelNusa はアフィリエイトリンクを利用することがあります。",
      affiliateParas:["明確に表示されたアフィリエイトまたはパートナーリンクを利用して対象取引を完了した場合、追加費用なしで JelNusa がコミッションを受け取ることがあります。","JelNusa は予約や支払いを処理しません。料金、空き状況、キャンセル、返金、サービス提供は第三者提供者の責任です。","パートナーまたはアフィリエイトリンクは、JelNusa が提供者、オファーの可用性、第三者サービスの品質を保証することを意味しません。","承認プログラムの状況により、パートナーリンクは追加、変更、削除される場合があります。"],
      disclaimerIntro:"JelNusa と NUSA は一般的な旅行情報と計画支援を提供します。",
      disclaimerParas:["旅行情報は予告なく変わる場合があります。入国要件、許可、健康・安全情報、交通時刻、天候、閉鎖、料金、現地ルールは最新の公式または信頼できる情報源で確認してください。","NUSA は人工知能を使用します。回答に誤り、抜け、古い情報が含まれる可能性があり、公式情報として扱うべきではありません。","緊急時や安全上の問題では、JelNusa や NUSA だけに頼らず、現地当局または緊急サービスへ連絡してください。","専門的な助言が必要な場合は、資格を持つ専門家または公式機関を利用してください。"],
      termsAI:"7. AI アシスタント（NUSA）",termsAIText:"NUSA は AI による旅行計画支援を提供します。回答は不完全、不正確、または古い場合があります。重要な旅行、安全、健康、入国、法律、交通、天候、予約情報は最新の信頼できる情報源で確認してください。",
      termsSafety:"8. 安全と公式情報",termsSafetyText:"JelNusa は緊急サービスでも、政府、入国管理、保健、気象、交通、安全に関する公式機関でもありません。旅行者は自身の旅程に関する最新の公式要件と状況を確認する責任があります。",
      privacyAI:"10. AI アシスタントとのやり取り",privacyAIText:"NUSA を使用する場合、入力したテキストは回答生成のため AI アシスタント運用に必要な技術サービスを通じて処理されます。旅行質問に不要なパスワード、決済カード情報、公的身分証番号、医療記録、その他の機微な個人情報は送信しないでください。"
    },
    ko:{
      faq:"자주 묻는 질문",affiliate:"제휴 링크 공개",disclaimer:"여행 및 AI 면책 안내",
      updated:"최종 업데이트: 2026년 9월 28일",
      faqIntro:"JelNusa, 파트너 링크, 여행 정보 및 NUSA에 대한 빠른 안내입니다.",
      faqs:[
        ["JelNusa는 무엇인가요?","JelNusa는 인도네시아 여행지를 탐색하기 위한 여행 정보 플랫폼입니다. 호텔, 항공사, 투어 운영사, 여행사 또는 예약 서비스 제공자가 아닙니다."],
        ["JelNusa가 예약이나 결제를 처리하나요?","아니요. 활성 파트너 링크가 있는 경우에도 예약, 결제, 취소 및 환불은 예약 페이지에 표시된 제3자 제공업체와 직접 처리됩니다."],
        ["파트너 링크는 제휴 링크인가요?","일부 활성 파트너 링크는 제휴 링크일 수 있습니다. 해당되는 경우 추가 비용 없이 JelNusa가 파트너로부터 수수료를 받을 수 있으며 관련 관계는 필요한 곳에 표시됩니다."],
        ["여행 정보는 최신인가요?","여행 상황, 가격, 일정, 입국 규정, 폐쇄 및 현지 정책은 변경될 수 있습니다. JelNusa는 계획과 아이디어에 활용하고 중요한 내용은 출발 전 최신 공식 자료나 관련 제공업체에서 확인하세요."],
        ["NUSA는 무엇인가요?","NUSA는 JelNusa의 AI 여행 도우미로 여행지 추천, 일정, 예산, 짐 준비 및 일반 여행 질문을 도와줍니다."],
        ["NUSA가 틀릴 수 있나요?","네. AI 답변은 불완전하거나 부정확하거나 오래된 정보일 수 있습니다. 안전, 건강, 입국, 법률, 교통, 날씨 및 예약과 관련된 중요한 내용은 최신 권위 있는 출처로 확인하세요."],
        ["NUSA가 대신 예약해 주나요?","아니요. NUSA는 계획과 이용 가능한 파트너 옵션 안내를 도울 수 있지만 거래는 해당 제3자 제공업체와 직접 진행됩니다."],
        ["JelNusa에 어떻게 연락하나요?","arifmuhamad94@gmail.com 으로 이메일을 보내세요. 제휴 문의는 웹사이트의 파트너십 양식도 이용할 수 있습니다."]
      ],
      affiliateIntro:"승인된 파트너 프로그램이 활성화되면 JelNusa는 제휴 링크를 사용할 수 있습니다.",
      affiliateParas:["명확하게 표시된 제휴 또는 파트너 링크를 이용해 조건을 충족하는 거래를 완료하면 추가 비용 없이 JelNusa가 파트너로부터 수수료를 받을 수 있습니다.","JelNusa는 예약이나 결제를 처리하지 않습니다. 가격, 이용 가능 여부, 취소, 환불 및 서비스 제공은 제3자 제공업체의 책임입니다.","파트너 또는 제휴 링크는 JelNusa가 제공업체, 혜택의 이용 가능성 또는 제3자 서비스 품질을 보장한다는 의미가 아닙니다.","승인 프로그램 이용 가능 여부에 따라 파트너 링크는 추가, 변경 또는 제거될 수 있습니다."],
      disclaimerIntro:"JelNusa와 NUSA는 일반적인 여행 정보와 계획 지원을 제공합니다.",
      disclaimerParas:["여행 정보는 예고 없이 변경될 수 있습니다. 입국 요건, 허가, 건강·안전 지침, 교통 일정, 날씨, 폐쇄, 가격 및 현지 규정은 최신 공식 또는 권위 있는 자료에서 확인하세요.","NUSA는 인공지능을 사용합니다. 답변에는 오류, 누락 또는 오래된 정보가 포함될 수 있으며 공식 자료로 간주해서는 안 됩니다.","긴급하거나 안전과 관련된 상황에서는 JelNusa나 NUSA에만 의존하지 말고 현지 당국이나 응급 서비스에 연락하세요.","전문적인 조언이 필요한 경우 자격을 갖춘 전문가 또는 공식 기관을 이용하세요."],
      termsAI:"7. AI 여행 도우미 (NUSA)",termsAIText:"NUSA는 AI로 생성된 여행 계획 지원을 제공합니다. 답변은 불완전하거나 부정확하거나 오래될 수 있습니다. 중요한 여행, 안전, 건강, 입국, 법률, 교통, 날씨 및 예약 정보는 최신 권위 있는 자료로 확인하세요.",
      termsSafety:"8. 안전 및 공식 정보",termsSafetyText:"JelNusa는 응급 서비스나 정부, 출입국, 보건, 기상, 교통 또는 안전 관련 공식 기관이 아닙니다. 여행자는 자신의 일정에 적용되는 최신 공식 요건과 상황을 확인할 책임이 있습니다.",
      privacyAI:"10. AI 도우미 상호작용",privacyAIText:"NUSA를 사용할 경우 입력한 텍스트는 응답 생성을 위해 AI 도우미 운영에 필요한 기술 서비스를 통해 처리됩니다. 여행 질문에 필요하지 않은 비밀번호, 결제 카드 정보, 정부 발급 신분증 번호, 의료 기록 또는 기타 민감한 개인정보는 입력하지 마세요."
    },
    ar:{
      faq:"الأسئلة الشائعة",affiliate:"إفصاح التسويق بالعمولة",disclaimer:"إخلاء مسؤولية السفر والذكاء الاصطناعي",
      updated:"آخر تحديث: 28 سبتمبر 2026",
      faqIntro:"إجابات سريعة حول JelNusa وروابط الشركاء ومعلومات السفر وNUSA.",
      faqs:[
        ["ما هو JelNusa؟","JelNusa منصة لاكتشاف الوجهات ومعلومات السفر في إندونيسيا. لسنا فندقًا أو شركة طيران أو مشغل جولات أو وكالة سفر أو مزود حجز."],
        ["هل يعالج JelNusa الحجوزات أو المدفوعات؟","لا. عند توفر رابط شريك فعال، تتم الحجوزات والمدفوعات والإلغاءات والاستردادات مباشرة مع مزود الخدمة الخارجي الظاهر في صفحة الحجز."],
        ["هل روابط الشركاء روابط تسويق بالعمولة؟","قد تكون بعض روابط الشركاء الفعالة روابط تسويق بالعمولة. عند انطباق ذلك قد يحصل JelNusa على عمولة من الشريك دون تكلفة إضافية عليك، ويتم توضيح العلاقة عند الحاجة."],
        ["ما مدى حداثة معلومات السفر؟","قد تتغير ظروف السفر والأسعار والجداول ومتطلبات الدخول والإغلاقات والقواعد المحلية. استخدم JelNusa للتخطيط والإلهام وتحقق من المعلومات المهمة عبر المصادر الرسمية الحالية أو مقدم الخدمة المعني قبل السفر."],
        ["ما هو NUSA؟","NUSA هو مساعد السفر بالذكاء الاصطناعي من JelNusa، ويمكنه المساعدة في اقتراح الوجهات وخطط الرحلات والميزانية والتجهيز والأسئلة العامة حول السفر."],
        ["هل يمكن أن يخطئ NUSA؟","نعم. قد تكون إجابات الذكاء الاصطناعي غير مكتملة أو غير دقيقة أو قديمة. تحقق من معلومات السلامة والصحة والدخول والقوانين والنقل والطقس والحجوزات عبر مصادر حديثة وموثوقة."],
        ["هل يقوم NUSA بالحجز نيابةً عني؟","لا. يمكن لـNUSA المساعدة في التخطيط والإشارة إلى خيارات الشركاء المتاحة، لكن المعاملة تتم مباشرة مع مزود الخدمة الخارجي المعني."],
        ["كيف أتواصل مع JelNusa؟","راسل JelNusa عبر البريد arifmuhamad94@gmail.com. ويمكن أيضًا استخدام نموذج الشراكة في الموقع لاستفسارات التعاون."]
      ],
      affiliateIntro:"قد يستخدم JelNusa روابط تسويق بالعمولة عندما تكون برامج الشركاء المعتمدة فعالة.",
      affiliateParas:["إذا استخدمت رابطًا واضحًا للتسويق بالعمولة أو رابط شريك وأتممت معاملة مؤهلة، فقد يحصل JelNusa على عمولة من الشريك دون تكلفة إضافية عليك.","JelNusa لا يعالج الحجوزات أو المدفوعات. تظل الأسعار والتوفر والإلغاء والاسترداد وتقديم الخدمة من مسؤولية مزود الخدمة الخارجي.","وجود رابط شريك أو رابط تسويق بالعمولة لا يعني أن JelNusa يضمن المزود أو توفر العرض أو جودة خدمة الطرف الثالث.","قد تتم إضافة روابط الشركاء أو تعديلها أو إزالتها مع توفر البرامج المعتمدة."],
      disclaimerIntro:"يقدم JelNusa وNUSA معلومات سفر عامة ومساعدة في التخطيط.",
      disclaimerParas:["قد تتغير معلومات السفر دون إشعار. تحقق من متطلبات الدخول والتصاريح وإرشادات الصحة والسلامة وجداول النقل والطقس والإغلاقات والأسعار والقواعد المحلية عبر مصادر رسمية أو موثوقة وحديثة.","يستخدم NUSA الذكاء الاصطناعي، وقد تحتوي إجاباته على أخطاء أو نواقص أو معلومات قديمة ولا ينبغي اعتبارها مصدرًا رسميًا.","في حالات الطوارئ أو السلامة العاجلة تواصل مع السلطات المحلية أو خدمات الطوارئ المناسبة بدل الاعتماد على JelNusa أو NUSA وحدهما.","عند الحاجة إلى مشورة مهنية استخدم متخصصًا مؤهلًا أو جهة رسمية."],
      termsAI:"7. مساعد الذكاء الاصطناعي (NUSA)",termsAIText:"يقدم NUSA مساعدة في تخطيط السفر مولدة بالذكاء الاصطناعي. قد تكون الإجابات غير مكتملة أو غير دقيقة أو قديمة. يجب التحقق من معلومات السفر والسلامة والصحة والدخول والقوانين والنقل والطقس والحجوزات المهمة عبر مصادر حديثة وموثوقة.",
      termsSafety:"8. السلامة والمعلومات الرسمية",termsSafetyText:"JelNusa ليس خدمة طوارئ ولا جهة رسمية حكومية أو للهجرة أو الصحة أو الطقس أو النقل أو السلامة. يبقى المسافر مسؤولًا عن التحقق من المتطلبات والظروف الرسمية الحالية ذات الصلة برحلته.",
      privacyAI:"10. التفاعل مع مساعد الذكاء الاصطناعي",privacyAIText:"إذا اخترت استخدام NUSA، تتم معالجة النص الذي ترسله عبر الخدمات التقنية المستخدمة لتشغيل مساعد الذكاء الاصطناعي حتى يتم إنشاء الرد. تجنب إرسال كلمات المرور أو بيانات بطاقات الدفع أو أرقام الهوية الحكومية أو السجلات الطبية أو أي معلومات شخصية حساسة غير ضرورية لسؤال السفر."
    },
    nl:{
      faq:"Veelgestelde vragen",affiliate:"Affiliateverklaring",disclaimer:"Reis- & AI-disclaimer",
      updated:"Laatst bijgewerkt: 28 september 2026",
      faqIntro:"Snelle antwoorden over JelNusa, partnerlinks, reisinformatie en NUSA.",
      faqs:[
        ["Wat is JelNusa?","JelNusa is een platform voor het ontdekken van bestemmingen en reisinformatie in Indonesië. We zijn geen hotel, luchtvaartmaatschappij, touroperator, reisbureau of boekingsaanbieder."],
        ["Verwerkt JelNusa boekingen of betalingen?","Nee. Wanneer een actieve partnerlink beschikbaar is, worden boeking, betaling, annulering en terugbetaling rechtstreeks afgehandeld door de externe aanbieder die op de boekingspagina wordt vermeld."],
        ["Zijn partnerlinks affiliate-links?","Sommige actieve partnerlinks kunnen affiliate-links zijn. In dat geval kan JelNusa een commissie van de partner ontvangen zonder extra kosten voor u. De affiliate-relatie wordt vermeld waar relevant."],
        ["Hoe actueel is de reisinformatie?","Reisomstandigheden, prijzen, dienstregelingen, toegangsregels, sluitingen en lokaal beleid kunnen veranderen. Gebruik JelNusa voor planning en inspiratie en controleer belangrijke details vóór vertrek bij actuele officiële bronnen of de betreffende aanbieder."],
        ["Wat is NUSA?","NUSA is de AI-reisassistent van JelNusa en kan helpen met bestemmingsideeën, routes, budgetindicaties, inpakadvies en algemene reisvragen."],
        ["Kan NUSA fouten maken?","Ja. AI-antwoorden kunnen onvolledig, onjuist of verouderd zijn. Controleer belangrijke informatie over veiligheid, gezondheid, toegang, wetgeving, vervoer, weer en boekingen bij actuele gezaghebbende bronnen."],
        ["Kan NUSA voor mij boeken?","Nee. NUSA kan helpen plannen en beschikbare partneropties tonen, maar transacties worden rechtstreeks met de relevante externe aanbieder voltooid."],
        ["Hoe neem ik contact op met JelNusa?","Mail JelNusa via arifmuhamad94@gmail.com. Voor samenwerkingen kan ook het partnerschapsformulier op de website worden gebruikt."]
      ],
      affiliateIntro:"JelNusa kan affiliate-links gebruiken wanneer goedgekeurde partnerprogramma's actief zijn.",
      affiliateParas:["Als u een duidelijk gemarkeerde affiliate- of partnerlink gebruikt en een kwalificerende transactie voltooit, kan JelNusa een commissie van de partner ontvangen zonder extra kosten voor u.","JelNusa verwerkt geen boekingen of betalingen. Prijzen, beschikbaarheid, annuleringen, terugbetalingen en dienstverlening blijven de verantwoordelijkheid van de externe aanbieder.","Een partner- of affiliate-link betekent niet dat JelNusa de aanbieder, beschikbaarheid van een aanbieding of kwaliteit van de externe dienst garandeert.","Partnerlinks kunnen worden toegevoegd, gewijzigd of verwijderd wanneer goedgekeurde programma's beschikbaar worden."],
      disclaimerIntro:"JelNusa en NUSA bieden algemene reisinformatie en hulp bij reisplanning.",
      disclaimerParas:["Reisinformatie kan zonder voorafgaande kennisgeving veranderen. Controleer toegangsvoorwaarden, vergunningen, gezondheids- en veiligheidsadviezen, vervoersschema's, weer, sluitingen, prijzen en lokale regels bij actuele officiële of gezaghebbende bronnen.","NUSA gebruikt kunstmatige intelligentie. Antwoorden kunnen fouten, omissies of verouderde informatie bevatten en mogen niet als officiële bron worden beschouwd.","Neem bij nood- of urgente veiligheidssituaties contact op met de bevoegde lokale autoriteiten of hulpdiensten in plaats van alleen op JelNusa of NUSA te vertrouwen.","Gebruik een gekwalificeerde professional of officiële instantie wanneer professioneel advies nodig is."],
      termsAI:"7. AI-assistent (NUSA)",termsAIText:"NUSA biedt door AI gegenereerde hulp bij reisplanning. Antwoorden kunnen onvolledig, onjuist of verouderd zijn. Controleer belangrijke reis-, veiligheids-, gezondheids-, toegangs-, juridische, vervoers-, weer- en boekingsinformatie bij actuele gezaghebbende bronnen.",
      termsSafety:"8. Veiligheid & officiële informatie",termsSafetyText:"JelNusa is geen hulpdienst en geen officiële overheids-, immigratie-, gezondheids-, weer-, vervoers- of veiligheidsinstantie. Reizigers blijven verantwoordelijk voor het controleren van actuele officiële vereisten en omstandigheden die op hun reis van toepassing zijn.",
      privacyAI:"10. Interacties met de AI-assistent",privacyAIText:"Als u NUSA gebruikt, wordt de tekst die u invoert verwerkt via technische diensten die nodig zijn om de AI-assistent te laten werken en een antwoord te genereren. Verstrek geen wachtwoorden, betaalkaartgegevens, overheidsidentificatienummers, medische dossiers of andere gevoelige persoonsgegevens die niet nodig zijn voor een reisvraag."
    },
    th:{
      faq:"คำถามที่พบบ่อย",affiliate:"การเปิดเผยลิงก์แอฟฟิลิเอต",disclaimer:"ข้อจำกัดความรับผิดด้านการเดินทางและ AI",
      updated:"อัปเดตล่าสุด: 28 กันยายน 2026",
      faqIntro:"คำตอบสั้น ๆ เกี่ยวกับ JelNusa ลิงก์พันธมิตร ข้อมูลการเดินทาง และ NUSA",
      faqs:[
        ["JelNusa คืออะไร?","JelNusa เป็นแพลตฟอร์มค้นหาจุดหมายปลายทางและข้อมูลการเดินทางในอินโดนีเซีย เราไม่ใช่โรงแรม สายการบิน ผู้ประกอบการทัวร์ บริษัทนำเที่ยว หรือผู้ให้บริการจอง"],
        ["JelNusa จัดการการจองหรือการชำระเงินหรือไม่?","ไม่ หากมีลิงก์พันธมิตรที่ใช้งานอยู่ การจอง การชำระเงิน การยกเลิก และการคืนเงินจะดำเนินการโดยตรงกับผู้ให้บริการภายนอกที่แสดงในหน้าการจอง"],
        ["ลิงก์พันธมิตรเป็นลิงก์แอฟฟิลิเอตหรือไม่?","ลิงก์พันธมิตรที่ใช้งานอยู่บางรายการอาจเป็นลิงก์แอฟฟิลิเอต ในกรณีนั้น JelNusa อาจได้รับค่าคอมมิชชันจากพันธมิตรโดยไม่มีค่าใช้จ่ายเพิ่มเติมสำหรับคุณ และจะมีการเปิดเผยความสัมพันธ์เมื่อเกี่ยวข้อง"],
        ["ข้อมูลการเดินทางเป็นปัจจุบันแค่ไหน?","เงื่อนไขการเดินทาง ราคา ตารางเวลา กฎการเข้าเมือง การปิดสถานที่ และนโยบายท้องถิ่นอาจเปลี่ยนแปลงได้ ใช้ JelNusa เพื่อวางแผนและหาแรงบันดาลใจ แล้วตรวจสอบข้อมูลสำคัญกับแหล่งข้อมูลทางการล่าสุดหรือผู้ให้บริการที่เกี่ยวข้องก่อนเดินทาง"],
        ["NUSA คืออะไร?","NUSA คือผู้ช่วยการเดินทาง AI ของ JelNusa ซึ่งช่วยเรื่องไอเดียจุดหมายปลายทาง แผนการเดินทาง งบประมาณ การจัดกระเป๋า และคำถามทั่วไปเกี่ยวกับการเดินทาง"],
        ["NUSA อาจตอบผิดได้หรือไม่?","ได้ คำตอบจาก AI อาจไม่ครบ ไม่ถูกต้อง หรือไม่เป็นปัจจุบัน ควรตรวจสอบข้อมูลสำคัญด้านความปลอดภัย สุขภาพ การเข้าเมือง กฎหมาย การเดินทาง สภาพอากาศ และการจองจากแหล่งข้อมูลที่น่าเชื่อถือและเป็นปัจจุบัน"],
        ["NUSA จองให้ฉันได้ไหม?","ไม่ได้ NUSA ช่วยวางแผนและแนะนำตัวเลือกพันธมิตรที่มีอยู่ได้ แต่ธุรกรรมจะทำโดยตรงกับผู้ให้บริการภายนอกที่เกี่ยวข้อง"],
        ["ติดต่อ JelNusa อย่างไร?","ส่งอีเมลถึง JelNusa ที่ arifmuhamad94@gmail.com และสามารถใช้แบบฟอร์มพันธมิตรบนเว็บไซต์สำหรับการติดต่อด้านความร่วมมือได้"]
      ],
      affiliateIntro:"JelNusa อาจใช้ลิงก์แอฟฟิลิเอตเมื่อโปรแกรมพันธมิตรที่ได้รับอนุมัติเปิดใช้งานแล้ว",
      affiliateParas:["หากคุณใช้ลิงก์แอฟฟิลิเอตหรือลิงก์พันธมิตรที่ระบุไว้อย่างชัดเจนและทำธุรกรรมที่เข้าเงื่อนไข JelNusa อาจได้รับค่าคอมมิชชันจากพันธมิตรโดยไม่มีค่าใช้จ่ายเพิ่มเติมสำหรับคุณ","JelNusa ไม่ประมวลผลการจองหรือการชำระเงิน ราคา ความพร้อม การยกเลิก การคืนเงิน และการให้บริการยังคงเป็นความรับผิดชอบของผู้ให้บริการภายนอก","ลิงก์พันธมิตรหรือแอฟฟิลิเอตไม่ได้หมายความว่า JelNusa รับประกันผู้ให้บริการ ความพร้อมของข้อเสนอ หรือคุณภาพของบริการภายนอก","ลิงก์พันธมิตรอาจถูกเพิ่ม เปลี่ยน หรือยกเลิกเมื่อมีโปรแกรมที่ได้รับอนุมัติพร้อมใช้งาน"],
      disclaimerIntro:"JelNusa และ NUSA ให้ข้อมูลการเดินทางทั่วไปและความช่วยเหลือในการวางแผน",
      disclaimerParas:["ข้อมูลการเดินทางอาจเปลี่ยนได้โดยไม่แจ้งล่วงหน้า ควรตรวจสอบข้อกำหนดการเข้าเมือง ใบอนุญาต คำแนะนำด้านสุขภาพและความปลอดภัย ตารางการเดินทาง สภาพอากาศ การปิดสถานที่ ราคา และกฎท้องถิ่นจากแหล่งทางการหรือแหล่งที่น่าเชื่อถือและเป็นปัจจุบัน","NUSA ใช้ปัญญาประดิษฐ์ คำตอบอาจมีข้อผิดพลาด ข้อมูลตกหล่น หรือข้อมูลล้าสมัย และไม่ควรถูกใช้เป็นแหล่งข้อมูลทางการ","ในกรณีฉุกเฉินหรือสถานการณ์ด้านความปลอดภัยเร่งด่วน ให้ติดต่อหน่วยงานท้องถิ่นหรือบริการฉุกเฉินที่เหมาะสม แทนการพึ่ง JelNusa หรือ NUSA เพียงอย่างเดียว","เมื่อจำเป็นต้องได้รับคำแนะนำจากผู้เชี่ยวชาญ ควรใช้ผู้เชี่ยวชาญที่มีคุณสมบัติเหมาะสมหรือหน่วยงานทางการ"],
      termsAI:"7. ผู้ช่วย AI (NUSA)",termsAIText:"NUSA ให้ความช่วยเหลือในการวางแผนการเดินทางที่สร้างโดย AI คำตอบอาจไม่ครบ ไม่ถูกต้อง หรือไม่เป็นปัจจุบัน ผู้ใช้ควรตรวจสอบข้อมูลสำคัญด้านการเดินทาง ความปลอดภัย สุขภาพ การเข้าเมือง กฎหมาย การขนส่ง สภาพอากาศ และการจองจากแหล่งข้อมูลที่น่าเชื่อถือและเป็นปัจจุบัน",
      termsSafety:"8. ความปลอดภัยและข้อมูลทางการ",termsSafetyText:"JelNusa ไม่ใช่บริการฉุกเฉินหรือหน่วยงานทางการด้านรัฐบาล ตรวจคนเข้าเมือง สุขภาพ อากาศ การขนส่ง หรือความปลอดภัย ผู้เดินทางยังคงมีหน้าที่ตรวจสอบข้อกำหนดและเงื่อนไขทางการล่าสุดที่เกี่ยวข้องกับการเดินทางของตน",
      privacyAI:"10. การโต้ตอบกับผู้ช่วย AI",privacyAIText:"หากคุณเลือกใช้ NUSA ข้อความที่คุณส่งจะถูกประมวลผลผ่านบริการทางเทคนิคที่ใช้ในการทำงานของผู้ช่วย AI เพื่อสร้างคำตอบ หลีกเลี่ยงการส่งรหัสผ่าน ข้อมูลบัตรชำระเงิน หมายเลขประจำตัวที่ออกโดยรัฐบาล เวชระเบียน หรือข้อมูลส่วนบุคคลที่ละเอียดอ่อนอื่น ๆ ที่ไม่จำเป็นสำหรับคำถามด้านการเดินทาง"
    }
  };

  function lang(){
    const raw=(document.documentElement.lang||"en").toLowerCase();
    for(const k of ["zh","ja","ko","ar","nl","th","id"]) if(raw.startsWith(k)) return k;
    return "en";
  }
  function t(){return COPY[lang()]||COPY.en}

  function modal(id,title){
    const el=document.createElement("div");
    el.className="legal-modal";
    el.id=id;
    el.setAttribute("aria-hidden","true");
    el.innerHTML='<div class="legal-backdrop" data-jl-close></div><div class="legal-panel" role="dialog" aria-modal="true"><button class="legal-close" type="button" aria-label="Close" data-jl-close>×</button><div class="legal-content"><span class="legal-eyebrow">JelNusa</span><h2></h2><div class="jl-trust-body"></div></div></div>';
    document.body.appendChild(el);
    el.querySelectorAll("[data-jl-close]").forEach(x=>x.addEventListener("click",()=>close(el)));
    return el;
  }
  function open(el){el.classList.add("is-open");el.setAttribute("aria-hidden","false");document.body.style.overflow="hidden"}
  function close(el){el.classList.remove("is-open");el.setAttribute("aria-hidden","true");document.body.style.overflow=""}

  function renderFAQ(el){
    const c=t(); el.querySelector("h2").textContent=c.faq;
    el.querySelector(".jl-trust-body").innerHTML='<p class="legal-intro">'+c.faqIntro+'</p><div class="jl-trust-list">'+c.faqs.map(x=>'<details class="jl-trust-item"><summary>'+x[0]+'</summary><p>'+x[1]+'</p></details>').join("")+'</div><p class="jl-trust-meta">'+c.updated+'</p>';
  }
  function renderText(el,type){
    const c=t(), title=type==="affiliate"?c.affiliate:c.disclaimer;
    const intro=type==="affiliate"?c.affiliateIntro:c.disclaimerIntro;
    const paras=type==="affiliate"?c.affiliateParas:c.disclaimerParas;
    el.querySelector("h2").textContent=title;
    el.querySelector(".jl-trust-body").innerHTML='<p class="legal-intro">'+intro+'</p>'+paras.map(p=>'<p class="jl-trust-note">'+p+'</p>').join("")+'<p class="jl-trust-meta">'+c.updated+'</p>';
  }

  function legalAddenda(){
    const c=t();
    const terms=document.querySelector("#terms-and-conditions .legal-content");
    const privacy=document.querySelector("#privacy-policy .legal-content");
    if(terms){
      let box=terms.querySelector(".jl-terms-ai-addendum");
      if(!box){box=document.createElement("div");box.className="jl-terms-ai-addendum jl-trust-section";terms.insertBefore(box,terms.querySelector(".legal-last-updated"))}
      box.innerHTML='<h3>'+c.termsAI+'</h3><p>'+c.termsAIText+'</p><h3>'+c.termsSafety+'</h3><p>'+c.termsSafetyText+'</p>';
    }
    if(privacy){
      let box=privacy.querySelector(".jl-privacy-ai-addendum");
      if(!box){box=document.createElement("div");box.className="jl-privacy-ai-addendum jl-trust-section";privacy.insertBefore(box,privacy.querySelector(".legal-last-updated"))}
      box.innerHTML='<h3>'+c.privacyAI+'</h3><p>'+c.privacyAIText+'</p>';
    }
  }

  function footerLink(key,label,handler){
    const footer=document.querySelector("footer");
    if(!footer) return null;
    let a=footer.querySelector('[data-jl-trust="'+key+'"]');
    if(!a){
      const info=[...footer.querySelectorAll(".footer-section")].find(x=>/Information|Informasi|信息|情報|정보|معلومات|Informatie|ข้อมูล/i.test(x.querySelector("h4")?.textContent||"")) || footer.querySelector(".footer-section:last-of-type");
      const ul=info?.querySelector("ul"); if(!ul) return null;
      const li=document.createElement("li"); a=document.createElement("a");
      a.href="#"; a.dataset.jlTrust=key; a.className="jl-trust-footer-link"; li.appendChild(a); ul.appendChild(li);
      a.addEventListener("click",e=>{e.preventDefault();handler()});
    }
    a.textContent=label; return a;
  }

  function restoreExistingFooter(){
    const footer=document.querySelector("footer"); if(!footer) return;
    ["FAQ","Privacy Policy","Partnerships"].forEach(key=>{
      const a=footer.querySelector('[data-i18n="'+key+'"]');
      if(a){a.hidden=false;a.removeAttribute("aria-hidden");a.tabIndex=0}
    });
  }

  function bindExistingFAQ(faq){
    const a=document.querySelector('footer [data-i18n="FAQ"]');
    if(!a||a.dataset.jlFaqBound==="1") return;
    a.dataset.jlFaqBound="1";
    a.href="/faq/";
    a.removeAttribute("data-coming-soon");
  }

  function update(){
    const c=t();
    renderFAQ(document.getElementById("jl-faq"));
    renderText(document.getElementById("jl-affiliate"),"affiliate");
    renderText(document.getElementById("jl-disclaimer"),"disclaimer");
    legalAddenda();
    restoreExistingFooter();
    footerLink("affiliate",c.affiliate,()=>open(document.getElementById("jl-affiliate")));
    footerLink("disclaimer",c.disclaimer,()=>open(document.getElementById("jl-disclaimer")));
  }

  function init(){
    const faq=modal("jl-faq"), aff=modal("jl-affiliate"), disc=modal("jl-disclaimer");
    restoreExistingFooter(); bindExistingFAQ(faq); update();
    new MutationObserver(update).observe(document.documentElement,{attributes:true,attributeFilter:["lang","dir"]});
    document.addEventListener("keydown",e=>{if(e.key==="Escape")document.querySelectorAll(".legal-modal.is-open").forEach(close)});
  }

  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});else init();
})();