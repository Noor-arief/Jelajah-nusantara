/* JelNusa Phase 1.5 — isolated motion controller */
(function(){
  "use strict";

  const REDUCED = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const NUSA_HOST_ID = "vireqo-ai-jelnusa-staging";
  const NUSA_CALLOUT_COPY = {
    en: "Ask anything with NUSA",
    id: "Tanyakan apa pun ke NUSA",
    zh: "向 NUSA 询问任何问题",
    ja: "NUSAに何でも聞いてみよう",
    ko: "NUSA에게 무엇이든 물어보세요",
    ar: "اسأل NUSA عن أي شيء",
    nl: "Vraag NUSA gerust alles",
    th: "ถาม NUSA ได้ทุกเรื่อง"
  };

  function getActiveLanguage(){
    const raw=(document.documentElement.lang||"en").toLowerCase();
    if(raw.startsWith("zh")) return "zh";
    if(raw.startsWith("ja")) return "ja";
    if(raw.startsWith("ko")) return "ko";
    if(raw.startsWith("ar")) return "ar";
    if(raw.startsWith("nl")) return "nl";
    if(raw.startsWith("th")) return "th";
    if(raw.startsWith("id")) return "id";
    return "en";
  }

  function syncNusaCalloutCopy(root){
    if(!root) return;
    const callout=root.querySelector(".jl-nusa-callout");
    if(!callout) return;
    const lang=getActiveLanguage();
    callout.textContent=NUSA_CALLOUT_COPY[lang]||NUSA_CALLOUT_COPY.en;
    callout.lang=lang;
    callout.dir=lang==="ar"?"rtl":"ltr";
  }

  function setupSectionMotion(){
    const selectors=[
      ".regions-section .section-header",
      ".region-results .region-card",
      ".pillars .section-header",
      ".pillars .pillar-card",
      ".stats .stat-item",
      ".features .feature-row",
      ".planning-section .section-header",
      ".planning-section .planning-card",
      "#about"
    ];

    const targets=[...document.querySelectorAll(selectors.join(","))];
    if(!targets.length) return;

    if(REDUCED || !("IntersectionObserver" in window)){
      targets.forEach(el=>el.classList.add("jl-motion-visible"));
      return;
    }

    targets.forEach(el=>el.classList.add("jl-motion-target"));
    const io=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(!entry.isIntersecting) return;
        entry.target.classList.add("jl-motion-visible");
        io.unobserve(entry.target);
      });
    },{threshold:.08,rootMargin:"0px 0px -7% 0px"});
    targets.forEach(el=>io.observe(el));

    /* Dynamic region cards are re-rendered when tabs change. */
    const regionResults=document.getElementById("regionResults");
    if(regionResults){
      new MutationObserver(()=>{
        [...regionResults.querySelectorAll(".region-card")].forEach(el=>{
          if(el.classList.contains("jl-motion-target")||el.classList.contains("jl-motion-visible")) return;
          if(REDUCED){el.classList.add("jl-motion-visible");return;}
          el.classList.add("jl-motion-target");
          io.observe(el);
        });
      }).observe(regionResults,{childList:true});
    }
  }

  function nusaMotionCss(){
    return `
      @keyframes jlNusaLauncherIn{
        from{opacity:0;transform:translateY(8px) scale(.97)}
        to{opacity:1;transform:none}
      }
      @keyframes jlNusaWidgetIn{
        from{opacity:0;transform:translateY(12px) scale(.985)}
        to{opacity:1;transform:none}
      }
      @keyframes jlNusaMessageIn{
        from{opacity:0;transform:translateY(7px)}
        to{opacity:1;transform:none}
      }
      @keyframes jlNusaDotThink{
        0%,100%{transform:scale(1);opacity:.65}
        50%{transform:scale(1.45);opacity:1}
      }
      @keyframes jlNusaReady{
        0%{box-shadow:0 0 0 0 rgba(74,222,128,.3)}
        100%{box-shadow:0 0 0 7px rgba(74,222,128,0)}
      }

      .jl-nusa-callout{
        position:absolute;
        right:0;
        bottom:76px;
        max-width:220px;
        padding:9px 12px;
        border-radius:12px 12px 3px 12px;
        background:#fff;
        color:#163232;
        border:1px solid rgba(15,76,76,.14);
        box-shadow:0 10px 28px rgba(0,0,0,.14);
        font-size:12px;
        font-weight:700;
        line-height:1.25;
        white-space:nowrap;
        opacity:0;
        transform:translateY(6px) scale(.98);
        animation:jlNusaCalloutIn 320ms cubic-bezier(.22,1,.36,1) 500ms forwards;
        pointer-events:none;
      }
      .jl-nusa-callout::after{
        content:"";
        position:absolute;
        right:18px;
        bottom:-6px;
        width:12px;
        height:12px;
        background:#fff;
        border-right:1px solid rgba(15,76,76,.14);
        border-bottom:1px solid rgba(15,76,76,.14);
        transform:rotate(45deg);
      }
      @keyframes jlNusaCalloutIn{
        to{opacity:1;transform:none}
      }

      .vireqo-ai-launcher:not([hidden]){
        min-height:62px;
        padding:14px 22px!important;
        gap:11px!important;
        font-size:15px!important;
        letter-spacing:.01em;
        border:1px solid rgba(255,255,255,.22)!important;
        box-shadow:0 14px 34px rgba(15,76,76,.34),0 4px 12px rgba(0,0,0,.16)!important;
        animation:jlNusaLauncherIn 260ms cubic-bezier(.22,1,.36,1) both;
        transition:transform 180ms cubic-bezier(.22,1,.36,1),box-shadow 220ms ease,filter 220ms ease;
      }
      .vireqo-ai-launcher:hover{
        transform:translateY(-3px) scale(1.015);
        box-shadow:0 18px 40px rgba(15,76,76,.38),0 6px 16px rgba(0,0,0,.18)!important;
        filter:saturate(1.06);
      }
      .vireqo-ai-launcher:active{transform:scale(.97)}

      .vireqo-ai-avatar{
        width:34px!important;
        height:34px!important;
        flex-basis:34px!important;
        animation:vireqoNusaFloat 3.8s ease-in-out infinite!important;
      }

      .vireqo-ai-widget:not([hidden]){
        animation:jlNusaWidgetIn 300ms cubic-bezier(.22,1,.36,1) both;
        transform-origin:bottom right;
      }
      .vireqo-ai-shell:has(.vireqo-ai-widget:not([hidden])) .jl-nusa-callout{
        display:none!important;
      }

      .vireqo-ai-message.jl-nusa-message-enter{
        animation:jlNusaMessageIn 280ms cubic-bezier(.22,1,.36,1) both;
      }

      .vireqo-ai-quick-actions:not([hidden]) .vireqo-ai-quick-action{
        animation:jlNusaMessageIn 260ms cubic-bezier(.22,1,.36,1) both;
      }
      .vireqo-ai-quick-action{
        transition:transform 150ms cubic-bezier(.22,1,.36,1),background-color 180ms ease,border-color 180ms ease!important;
      }
      .vireqo-ai-quick-action:active{transform:scale(.96)}

      .vireqo-ai-widget.jl-nusa-thinking .vireqo-ai-online-dot{
        animation:jlNusaDotThink 900ms ease-in-out infinite;
      }
      .vireqo-ai-widget.jl-nusa-ready .vireqo-ai-online-dot{
        animation:jlNusaReady 650ms ease-out 1;
      }
      .vireqo-ai-widget.jl-nusa-thinking .vireqo-ai-inputbar button:disabled{
        opacity:.72;
      }

      @media (max-width:768px){
        .jl-nusa-callout{
          bottom:70px;
          right:2px;
          max-width:calc(100vw - 36px);
          font-size:11px;
          padding:8px 10px;
        }
        .vireqo-ai-shell{
          right:12px!important;
          bottom:12px!important;
        }
        .vireqo-ai-launcher{
          min-height:58px!important;
          padding:12px 18px!important;
          max-width:calc(100vw - 24px);
        }
        .vireqo-ai-widget{
          width:calc(100vw - 20px)!important;
          max-height:calc(100dvh - 20px)!important;
          border-radius:18px!important;
        }
        .vireqo-ai-inputbar input{font-size:16px!important}
      }

      @media (prefers-reduced-motion:reduce){
        .vireqo-ai-launcher,
        .vireqo-ai-avatar,
        .vireqo-ai-widget,
        .vireqo-ai-message,
        .vireqo-ai-quick-action,
        .vireqo-ai-online-dot{
          animation:none!important;
          transition:none!important;
          transform:none!important;
        }
      }
    `;
  }

  function enhanceNusa(host){
    if(!host || !host.shadowRoot) return false;
    const root=host.shadowRoot;
    if(root.getElementById("jl-nusa-motion-v1")) return true;

    const style=document.createElement("style");
    style.id="jl-nusa-motion-v1";
    style.textContent=nusaMotionCss();
    root.appendChild(style);

    const widget=root.querySelector(".vireqo-ai-widget");
    const messages=root.querySelector(".vireqo-ai-messages");
    const submit=root.querySelector(".vireqo-ai-inputbar button");
    const shell=root.querySelector(".vireqo-ai-shell");
    const launcher=root.querySelector(".vireqo-ai-launcher");

    if(shell && launcher && !root.querySelector(".jl-nusa-callout")){
      const callout=document.createElement("div");
      callout.className="jl-nusa-callout";
      callout.setAttribute("aria-hidden","true");
      shell.insertBefore(callout, launcher);
      syncNusaCalloutCopy(root);
    }

    if(host.dataset.jlCalloutI18n!=="1"){
      host.dataset.jlCalloutI18n="1";
      const langObserver=new MutationObserver(()=>syncNusaCalloutCopy(root));
      langObserver.observe(document.documentElement,{attributes:true,attributeFilter:["lang","dir"]});
      if(window.i18next && typeof window.i18next.on==="function"){
        window.i18next.on("languageChanged",()=>syncNusaCalloutCopy(root));
      }
    }
    syncNusaCalloutCopy(root);

    if(messages){
      [...messages.querySelectorAll(".vireqo-ai-message")].forEach(el=>el.classList.add("jl-nusa-message-enter"));
      new MutationObserver(mutations=>{
        mutations.forEach(m=>[...m.addedNodes].forEach(node=>{
          if(node.nodeType!==1) return;
          if(node.matches&&node.matches(".vireqo-ai-message")) node.classList.add("jl-nusa-message-enter");
          node.querySelectorAll&&node.querySelectorAll(".vireqo-ai-message").forEach(el=>el.classList.add("jl-nusa-message-enter"));
        }));
      }).observe(messages,{childList:true,subtree:true});
    }

    if(widget && submit){
      let readyTimer;
      const syncThinking=()=>{
        const thinking=submit.disabled;
        widget.classList.toggle("jl-nusa-thinking",thinking);
        if(!thinking){
          widget.classList.add("jl-nusa-ready");
          clearTimeout(readyTimer);
          readyTimer=setTimeout(()=>widget.classList.remove("jl-nusa-ready"),700);
        }else{
          widget.classList.remove("jl-nusa-ready");
        }
      };
      new MutationObserver(syncThinking).observe(submit,{attributes:true,attributeFilter:["disabled"]});
      syncThinking();
    }
    return true;
  }

  function setupNusaMotion(){
    const direct=document.getElementById(NUSA_HOST_ID);
    if(enhanceNusa(direct)) return;

    let tries=0;
    const timer=setInterval(()=>{
      tries+=1;
      if(enhanceNusa(document.getElementById(NUSA_HOST_ID))||tries>=40) clearInterval(timer);
    },250);
  }

  function setupFooterCleanup(){
    const footer=document.querySelector("footer");
    if(!footer) return;

    const links=[...footer.querySelectorAll("a")];

    /* Contact becomes a real mail action. */
    links.forEach(a=>{
      const label=(a.textContent||"").trim().toLowerCase();
      if(label==="contact"){
        a.href="mailto:arifmuhamad94@gmail.com";
      }
    });

    /* Hide placeholder/deferred navigation instead of leaving dead links. */
    const deferred=new Set([
      "blog","photo gallery","tools","packing list","faq",
      "privacy policy","partnerships"
    ]);
    links.forEach(a=>{
      const label=(a.textContent||"").trim().toLowerCase();
      if(deferred.has(label)){
        a.hidden=true;
        a.setAttribute("aria-hidden","true");
        a.tabIndex=-1;
      }
    });

    /* Remove legacy placeholder social buttons. */
    links.forEach(a=>{
      const href=(a.getAttribute("href")||"").trim();
      const label=(a.textContent||"").trim();
      if(href==="#" && ["📸","f","𝕏","P"].includes(label)){
        a.hidden=true;
        a.setAttribute("aria-hidden","true");
        a.tabIndex=-1;
      }
    });

    /* Keep only real JelNusa contact/social shortcuts visible. */
    const oldSocial=links.find(a=>{
      const label=(a.textContent||"").trim();
      const href=(a.getAttribute("href")||"").trim();
      return href==="#" && ["📸","f","𝕏","P"].includes(label);
    });
    const socialWrap=oldSocial&&oldSocial.parentElement;

    if(socialWrap && !socialWrap.querySelector(".jl-footer-linkedin")){
      const linkedin=document.createElement("a");
      linkedin.className="jl-footer-linkedin";
      linkedin.href="https://www.linkedin.com/company/jelnusa";
      linkedin.target="_blank";
      linkedin.rel="noopener noreferrer";
      linkedin.setAttribute("aria-label","LinkedIn JelNusa");
      linkedin.textContent="in";
      linkedin.title="LinkedIn JelNusa";
      socialWrap.appendChild(linkedin);
    }

    if(socialWrap && !socialWrap.querySelector(".jl-footer-email")){
      const email=document.createElement("a");
      email.className="jl-footer-email";
      email.href="mailto:arifmuhamad94@gmail.com";
      email.setAttribute("aria-label","Email JelNusa");
      email.textContent="✉";
      email.title="Email JelNusa";
      socialWrap.appendChild(email);
    }
  }

  function setupNavigationPolish(){
    document.addEventListener("click", function(event){
      const anchor=event.target.closest("header a, footer a");
      if(anchor){
        setTimeout(function(){
          try{ anchor.blur(); }catch(_){}
        },0);
      }

      const languageGuide=event.target.closest('a[href="#jelLanguageSwitcher"]');
      if(!languageGuide) return;

      event.preventDefault();

      const root=document.getElementById("jelLanguageSwitcher");
      const trigger=root && root.querySelector(".jl-language-trigger");
      if(!root || !trigger) return;

      root.scrollIntoView({behavior:"smooth",block:"center",inline:"nearest"});

      setTimeout(function(){
        if(window.JelNusaLanguageSelector && typeof window.JelNusaLanguageSelector.open==="function"){
          window.JelNusaLanguageSelector.open();
        }else{
          root.classList.add("is-open");
          trigger.setAttribute("aria-expanded","true");
        }
        try{ trigger.focus({preventScroll:true}); }catch(_){ trigger.focus(); }
      },180);
    },true);
  }

  function init(){
    document.documentElement.classList.add("jl-phase15-motion");
    setupSectionMotion();
    setupNusaMotion();
    setupFooterCleanup();
    setupNavigationPolish();
  }

  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",init,{once:true});
  else init();
})();