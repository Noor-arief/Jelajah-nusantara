from pathlib import Path
import json

ROOT = Path(__file__).resolve().parents[1]
INDEX = ROOT / "index.html"
REPORT = ROOT / "phase7-seo-head-report.json"

OLD_TITLE = '<title>Jelajah Nusantara - Discover Indonesia Beyond the Usual Path</title>'
NEW_TITLE = '<title>JelNusa | Discover Indonesia Beyond the Usual Path</title>'

SEO_BLOCK = r'''
<meta name="description" content="JelNusa is an Indonesia travel discovery platform for destinations, hidden gems, practical guides, itinerary ideas, and AI-assisted trip planning with NUSA."/>
<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"/>
<link rel="canonical" href="https://jelnusa.com/"/>

<meta property="og:type" content="website"/>
<meta property="og:site_name" content="JelNusa"/>
<meta property="og:title" content="JelNusa | Discover Indonesia Beyond the Usual Path"/>
<meta property="og:description" content="Discover Indonesia destinations, hidden gems, practical travel guides, itinerary ideas, and AI-assisted trip planning with NUSA."/>
<meta property="og:url" content="https://jelnusa.com/"/>
<meta property="og:locale" content="en_US"/>

<meta name="twitter:card" content="summary"/>
<meta name="twitter:title" content="JelNusa | Discover Indonesia Beyond the Usual Path"/>
<meta name="twitter:description" content="Discover Indonesia destinations, hidden gems, practical travel guides, itinerary ideas, and AI-assisted trip planning with NUSA."/>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://jelnusa.com/#organization",
      "name": "JelNusa",
      "url": "https://jelnusa.com/",
      "sameAs": [
        "https://www.linkedin.com/company/jelnusa"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://jelnusa.com/#website",
      "url": "https://jelnusa.com/",
      "name": "JelNusa",
      "publisher": {
        "@id": "https://jelnusa.com/#organization"
      },
      "inLanguage": ["en","id","zh","ja","ko","ar","nl","th"]
    }
  ]
}
</script>'''.strip()

def main():
    html = INDEX.read_text(encoding="utf-8")
    before = len(html)

    protected = {
        "nusa_loader": "https://assistant.vireqo.id/client.js",
        "tenant": 'data-client-id="jelnusa-staging"',
        "hero_video": "hero-video.mp4",
    }
    for name, token in protected.items():
        if token not in html:
            raise RuntimeError(f"Protected token missing before patch: {name}")

    if 'rel="canonical" href="https://jelnusa.com/"' not in html:
        if OLD_TITLE in html:
            html = html.replace(OLD_TITLE, NEW_TITLE + "\n" + SEO_BLOCK, 1)
        elif NEW_TITLE in html:
            html = html.replace(NEW_TITLE, NEW_TITLE + "\n" + SEO_BLOCK, 1)
        else:
            raise RuntimeError("Expected title anchor not found; refusing unsafe patch")

    required = [
        '<meta name="description"',
        'rel="canonical" href="https://jelnusa.com/"',
        'property="og:title"',
        'property="og:url"',
        'name="twitter:card"',
        'type="application/ld+json"',
        '"@type": "Organization"',
        '"@type": "WebSite"',
    ]
    for token in required:
        if html.count(token) != 1:
            raise RuntimeError(f"SEO token count invalid for {token}: {html.count(token)}")

    if html.count("https://assistant.vireqo.id/client.js") != 1:
        raise RuntimeError("NUSA loader count changed")
    if html.count('data-client-id="jelnusa-staging"') != 1:
        raise RuntimeError("Tenant loader count changed")

    INDEX.write_text(html, encoding="utf-8")

    report = {
        "status": "PASS",
        "index_size_before": before,
        "index_size_after": len(html),
        "delta_bytes": len(html) - before,
        "canonical": "https://jelnusa.com/",
        "meta_description": True,
        "open_graph": True,
        "twitter_card": True,
        "structured_data": ["Organization", "WebSite"],
        "nusa_loader_preserved": True,
        "tenant_preserved": True,
    }
    REPORT.write_text(json.dumps(report, indent=2), encoding="utf-8")
    print(json.dumps(report, indent=2))

if __name__ == "__main__":
    main()
