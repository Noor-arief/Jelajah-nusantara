/* JelNusa Phase 1.5 — isolated motion controller */
(function(){
  "use strict";

  const REDUCED = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const NUSA_HOST_ID = "vireqo-ai-jelnusa-staging";

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

      .vireqo-ai-launcher:not([hidden]){
        animation:jlNusaLauncherIn 260ms cubic-bezier(.22,1,.36,1) both;
        transition:transform 180ms cubic-bezier(.22,1,.36,1),box-shadow 220ms ease;
      }
      .vireqo-ai-launcher:hover{transform:translateY(-2px)}
      .vireqo-ai-launcher:active{transform:scale(.97)}

      .vireqo-ai-avatar{
        animation:vireqoNusaFloat 3.8s ease-in-out infinite!important;
      }

      .vireqo-ai-widget:not([hidden]){
        animation:jlNusaWidgetIn 300ms cubic-bezier(.22,1,.36,1) both;
        transform-origin:bottom right;
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

  function init(){
    document.documentElement.classList.add("jl-phase15-motion");
    setupSectionMotion();
    setupNusaMotion();
  }

  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",init,{once:true});
  else init();
})();