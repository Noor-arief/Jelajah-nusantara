from pathlib import Path

path = Path("index.html")
html = path.read_text(encoding="utf-8")

MARKER = 'id="jelnusa-phase1-mobile-recovery-v1"'
if MARKER in html:
    print("Phase 1 mobile recovery already present; no change.")
    raise SystemExit(0)

required = [
    "</head>",
    "https://assistant.vireqo.id/client.js",
    'data-client-id="jelnusa-staging"',
    "i18next",
]
missing = [item for item in required if item not in html]
if missing:
    raise SystemExit(f"Refusing patch; required production markers missing: {missing}")

patch = r'''
<style id="jelnusa-phase1-mobile-recovery-v1">
/* Phase 1 mobile recovery — isolated final overrides.
   Scope: layout/responsiveness only. No content, locale, NUSA or backend behavior changes. */
@media (max-width: 760px) {
  html, body {
    width: 100%;
    max-width: 100%;
    overflow-x: hidden;
  }

  body {
    background-attachment: scroll !important;
    -webkit-text-size-adjust: 100%;
  }

  header {
    width: 100%;
    max-width: 100%;
  }

  .header-container {
    width: 100%;
    max-width: 100%;
    min-height: 60px !important;
    padding-left: max(.75rem, env(safe-area-inset-left)) !important;
    padding-right: max(.75rem, env(safe-area-inset-right)) !important;
    gap: .5rem !important;
    box-sizing: border-box;
  }

  .logo {
    min-width: 0;
    flex: 1 1 auto;
    overflow: hidden;
  }

  .logo-image {
    height: 48px !important;
    width: auto !important;
    max-width: min(42vw, 148px) !important;
    object-fit: contain;
  }

  .header-actions {
    flex: 0 0 auto;
    min-width: 0;
    gap: 6px !important;
  }

  .jl-language {
    min-width: 0;
  }

  .jl-language-trigger {
    height: 40px !important;
    max-width: 124px;
    padding: 0 9px !important;
  }

  nav {
    width: min(86vw, 330px) !important;
    max-width: calc(100vw - 24px) !important;
    height: 100dvh !important;
    padding-bottom: max(1.5rem, env(safe-area-inset-bottom)) !important;
  }

  .hero,
  .hero-container,
  .section-container,
  .footer-container {
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
  }

  .hero {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }

  .hero-container {
    overflow: hidden;
  }

  .hero-visual {
    width: calc(100% - 24px) !important;
    max-width: 720px !important;
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
    min-width: 0 !important;
    object-fit: cover !important;
    display: block !important;
  }

  .hero-content {
    width: 100%;
    max-width: 100%;
    padding: 1.15rem 1rem 0 !important;
    box-sizing: border-box;
  }

  .hero-content h1,
  .hero-content p,
  .section-header h2,
  .section-header p {
    max-width: 100%;
    overflow-wrap: anywhere;
  }

  .planning-grid,
  .discovery-strip,
  .region-grid,
  .region-results,
  .features-grid,
  .destinations-grid,
  .stats-grid {
    min-width: 0;
    max-width: 100%;
  }

  .region-card,
  .destination-card,
  .feature-card,
  .planning-card,
  .discovery-item {
    min-width: 0;
    max-width: 100%;
    box-sizing: border-box;
  }

  .region-card img,
  .destination-card img {
    max-width: 100%;
  }

  .region-card-actions,
  .hero-buttons,
  .hero-cta {
    width: 100%;
    max-width: 100%;
  }

  .destination-detail-modal,
  .planner-modal,
  .legal-modal,
  .site-modal {
    left: 0 !important;
    right: 0 !important;
    width: 100% !important;
    max-width: 100% !important;
    box-sizing: border-box !important;
  }

  .destination-detail-modal {
    padding: 12px !important;
  }

  .destination-detail-panel,
  .planner-modal-card,
  .legal-panel,
  .site-modal-panel {
    width: 100% !important;
    max-width: 620px !important;
    margin-left: auto !important;
    margin-right: auto !important;
    max-height: calc(100vh - 24px) !important;
    max-height: calc(100dvh - 24px) !important;
    box-sizing: border-box !important;
  }

  .destination-detail-content,
  .destination-detail-body,
  .destination-detail-grid,
  .destination-detail-info {
    min-width: 0;
    max-width: 100%;
    box-sizing: border-box;
  }

  .destination-detail-cta {
    flex-direction: column !important;
    align-items: stretch !important;
  }

  .destination-detail-cta .destination-btn {
    width: 100% !important;
    white-space: normal !important;
    text-align: center;
  }

  input,
  select,
  textarea,
  button {
    max-width: 100%;
  }

  input,
  select,
  textarea {
    font-size: 16px !important;
  }

  .footer-grid {
    width: 100%;
    min-width: 0;
  }
}

@media (max-width: 420px) {
  .logo-image {
    height: 44px !important;
    max-width: 132px !important;
  }

  .jl-language-trigger {
    max-width: 46px;
    min-width: 40px !important;
    width: 40px;
    padding: 0 7px !important;
  }

  .jl-language-code {
    display: none !important;
  }

  .hero-content {
    padding-left: .9rem !important;
    padding-right: .9rem !important;
  }

  .footer-grid {
    grid-template-columns: 1fr !important;
  }
}

@supports (overflow: clip) {
  @media (max-width: 760px) {
    body { overflow-x: clip; }
  }
}
</style>
'''

before = html
html = html.replace("</head>", patch + "\n</head>", 1)

# Safety invariants: preserve live integrations and document closure.
for marker in required[1:]:
    if marker not in html:
        raise SystemExit(f"Refusing write; integration marker lost: {marker}")
if not html.rstrip().endswith("</html>"):
    raise SystemExit("Refusing write; closing html marker missing")
if html.count(MARKER) != 1:
    raise SystemExit("Refusing write; mobile recovery marker count invalid")

path.write_text(html, encoding="utf-8")
print(f"Patched {path}: +{len(html) - len(before)} chars")
