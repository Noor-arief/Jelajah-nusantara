from pathlib import Path
import json
import sys

ROOT = Path(__file__).resolve().parents[1]
INDEX = ROOT / "index.html"
CSS_PATH = ROOT / "assets" / "mobile-recovery.css"
REPORT = ROOT / "phase1-mobile-recovery-report.json"

MARKER = '<link rel="stylesheet" href="assets/mobile-recovery.css?v=20260928"/>'

CSS = r'''/* JelNusa Phase 1 — canonical mobile recovery layer
   Loaded after legacy inline CSS to resolve overlapping mobile overrides
   without rebuilding the monolithic page. */

@media (max-width: 760px) {
  html,
  body {
    width: 100%;
    max-width: 100%;
    overflow-x: clip;
  }

  body {
    -webkit-text-size-adjust: 100%;
  }

  header,
  main,
  section,
  footer,
  .hero,
  .hero-container,
  .section-container,
  .footer-container {
    max-width: 100%;
    min-width: 0;
    box-sizing: border-box;
  }

  .header-container {
    width: 100%;
    min-width: 0;
    gap: .65rem;
  }

  .logo,
  .logo-image {
    min-width: 0;
  }

  nav {
    max-width: min(86vw, 330px);
    height: 100dvh;
    padding-top: calc(5.25rem + env(safe-area-inset-top));
    padding-bottom: calc(1.25rem + env(safe-area-inset-bottom));
    overflow-y: auto;
    overscroll-behavior: contain;
  }

  .hero {
    min-height: 0 !important;
    padding-bottom: 1.25rem;
  }

  .hero-container {
    display: flex !important;
    flex-direction: column !important;
    width: 100% !important;
    padding: 0 !important;
    gap: 0 !important;
  }

  .hero-visual {
    order: 1 !important;
    width: calc(100% - 24px) !important;
    height: auto !important;
    min-height: 0 !important;
    max-height: none !important;
    aspect-ratio: 16 / 9 !important;
    margin: 12px auto 0 !important;
    border-radius: 18px !important;
    overflow: hidden !important;
  }

  .hero-video {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover !important;
    display: block !important;
  }

  .hero-content {
    order: 2 !important;
    width: 100% !important;
    padding: 1.25rem 1rem 0 !important;
    box-sizing: border-box !important;
  }

  .hero-content h1 {
    overflow-wrap: anywhere;
    text-wrap: balance;
  }

  .hero-content p {
    max-width: 100% !important;
  }

  .hero-buttons,
  .hero-cta {
    width: 100%;
  }

  .hero-buttons .btn,
  .hero-cta .btn,
  .destination-btn,
  .region-card-actions a,
  .region-card-actions button {
    min-height: 46px;
  }

  .section-container {
    width: 100% !important;
    padding-left: 1rem !important;
    padding-right: 1rem !important;
  }

  .region-tabs {
    max-width: calc(100vw - 2rem);
    scroll-padding-inline: 1rem;
    -webkit-overflow-scrolling: touch;
  }

  .region-results,
  .planning-grid,
  .pillars-grid,
  .feature-row,
  .stats-grid,
  .footer-grid,
  .destination-detail-grid,
  .destination-detail-info {
    min-width: 0;
  }

  .region-card,
  .planning-card,
  .pillar-card,
  .feature-content,
  .feature-image,
  .destination-card {
    min-width: 0;
    max-width: 100%;
  }

  .region-card img,
  .card-image img,
  .feature-image img {
    max-width: 100%;
  }

  .region-card-actions {
    display: grid;
    grid-template-columns: 1fr;
    width: 100%;
  }

  .region-card-actions > * {
    width: 100%;
    min-width: 0;
    box-sizing: border-box;
    white-space: normal;
    text-align: center;
  }

  #destinationDetailModal,
  .planner-modal,
  .site-modal,
  .legal-modal {
    padding: 12px !important;
    box-sizing: border-box !important;
  }

  #destinationDetailModal .destination-detail-panel,
  .planner-modal-card,
  .site-modal-panel,
  .legal-panel {
    width: 100% !important;
    max-width: 620px !important;
    max-height: calc(100dvh - 24px) !important;
    margin: auto !important;
    box-sizing: border-box !important;
    overscroll-behavior: contain;
  }

  input,
  select,
  textarea,
  button {
    max-width: 100%;
    box-sizing: border-box;
  }

  input,
  select,
  textarea {
    font-size: 16px;
  }

  img,
  video,
  iframe {
    max-width: 100%;
  }

  .jl-rtl .hero-content,
  .jl-rtl .section-header,
  .jl-rtl .region-card-body,
  .jl-rtl .planning-card,
  .jl-rtl .destination-detail-body {
    direction: rtl;
    text-align: right;
  }
}

@media (max-width: 430px) {
  .footer-grid {
    grid-template-columns: 1fr !important;
    gap: 1.4rem !important;
  }

  .stats-grid {
    grid-template-columns: 1fr 1fr !important;
  }

  .hero-content {
    padding-left: .9rem !important;
    padding-right: .9rem !important;
  }

  .section-container,
  .footer-container {
    padding-left: .9rem !important;
    padding-right: .9rem !important;
  }

  .region-tabs {
    max-width: calc(100vw - 1.8rem);
  }
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto !important;
  }

  *,
  *::before,
  *::after {
    animation-duration: .01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: .01ms !important;
  }
}
'''

def main():
    html = INDEX.read_text(encoding="utf-8")

    # Remove the superseded inline recovery block if a previous transport-safe patch added it.
    inline_marker = '<style id="jelnusa-phase1-mobile-recovery-v1">'
    inline_start = html.find(inline_marker)
    if inline_start >= 0:
        inline_end = html.find("</style>", inline_start)
        if inline_end < 0:
            raise RuntimeError("Unclosed superseded inline mobile recovery block")
        html = html[:inline_start] + html[inline_end + len("</style>"):]

    original_size = len(html)

    required_before = {
        "assistant_loader": 'https://assistant.vireqo.id/client.js',
        "tenant_id": 'data-client-id="jelnusa-staging"',
        "hero_video": 'hero-video.mp4',
        "language_storage": 'jelnusa-lang',
    }
    for name, token in required_before.items():
        if token not in html:
            raise RuntimeError(f"Required production token missing before patch: {name}")

    if MARKER not in html:
        closing = html.rfind("</head>")
        if closing < 0:
            raise RuntimeError("Missing </head>; refusing unsafe patch")
        html = html[:closing] + MARKER + "\n" + html[closing:]

    if html.count(MARKER) != 1:
        raise RuntimeError("Mobile recovery stylesheet marker must occur exactly once")

    if html.count('https://assistant.vireqo.id/client.js') != 1:
        raise RuntimeError("NUSA loader count changed unexpectedly")

    if html.count('data-client-id="jelnusa-staging"') != 1:
        raise RuntimeError("JelNusa tenant loader count changed unexpectedly")

    INDEX.write_text(html, encoding="utf-8")
    CSS_PATH.parent.mkdir(parents=True, exist_ok=True)
    CSS_PATH.write_text(CSS, encoding="utf-8")

    locales = sorted(p.name for p in (ROOT / "locales").glob("*.json"))
    expected = sorted(["ar.json","en.json","id.json","ja.json","ko.json","nl.json","th.json","zh.json"])
    if locales != expected:
        raise RuntimeError(f"8-language locale baseline changed: {locales}")

    report = {
        "status": "PASS",
        "index_size_before": original_size,
        "index_size_after": len(html),
        "index_delta": len(html) - original_size,
        "stylesheet": str(CSS_PATH.relative_to(ROOT)),
        "stylesheet_bytes": len(CSS.encode("utf-8")),
        "nusa_loader_preserved": True,
        "jelnusa_tenant_preserved": True,
        "locale_files": locales,
        "production_services_touched": 0,
    }
    REPORT.write_text(json.dumps(report, indent=2), encoding="utf-8")
    print(json.dumps(report, indent=2))

if __name__ == "__main__":
    try:
        main()
    except Exception as exc:
        print(f"PHASE1_MOBILE_RECOVERY_FAIL: {exc}", file=sys.stderr)
        raise
