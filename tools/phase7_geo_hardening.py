from pathlib import Path
import json
import re

ROOT = Path(__file__).resolve().parents[1]
INDEX = ROOT / "index.html"
REPORT = ROOT / "phase7-geo-hardening-report.json"

WEBPAGE = {
    "@type": "WebPage",
    "@id": "https://jelnusa.com/#webpage",
    "url": "https://jelnusa.com/",
    "name": "JelNusa | Discover Indonesia Beyond the Usual Path",
    "description": "JelNusa is an Indonesia travel discovery platform for destinations, hidden gems, practical guides, itinerary ideas, and AI-assisted trip planning with NUSA.",
    "isPartOf": {"@id": "https://jelnusa.com/#website"},
    "about": {"@id": "https://jelnusa.com/#organization"},
    "inLanguage": ["en", "id", "zh", "ja", "ko", "ar", "nl", "th"]
}

def main():
    html = INDEX.read_text(encoding="utf-8")
    before = len(html)

    protected = {
        "nusa_loader": "https://assistant.vireqo.id/client.js",
        "tenant": 'data-client-id="jelnusa-staging"',
        "canonical": 'rel="canonical" href="https://jelnusa.com/"',
        "organization": '"@type": "Organization"',
        "website": '"@type": "WebSite"',
    }
    for name, token in protected.items():
        if token not in html:
            raise RuntimeError(f"Protected token missing before GEO patch: {name}")

    pattern = re.compile(
        r'(<script\s+type="application/ld\+json">\s*)(\{.*?"@type"\s*:\s*"Organization".*?"@type"\s*:\s*"WebSite".*?\})(\s*</script>)',
        re.DOTALL,
    )
    match = pattern.search(html)
    if not match:
        raise RuntimeError("Primary JelNusa JSON-LD block not found; refusing unsafe patch")

    data = json.loads(match.group(2))
    graph = data.get("@graph")
    if not isinstance(graph, list):
        raise RuntimeError("JSON-LD @graph is missing or invalid")

    existing = [node for node in graph if isinstance(node, dict) and node.get("@type") == "WebPage"]
    if not existing:
        graph.append(WEBPAGE)
    elif len(existing) == 1:
        existing[0].update(WEBPAGE)
    else:
        raise RuntimeError("Multiple WebPage nodes found; refusing ambiguous patch")

    rendered = json.dumps(data, ensure_ascii=False, indent=2)
    html = html[:match.start(2)] + rendered + html[match.end(2):]

    required_once = [
        '"@type": "Organization"',
        '"@type": "WebSite"',
        '"@type": "WebPage"',
        '"@id": "https://jelnusa.com/#webpage"',
        'rel="canonical" href="https://jelnusa.com/"',
    ]
    for token in required_once:
        if html.count(token) != 1:
            raise RuntimeError(f"Unexpected GEO token count for {token}: {html.count(token)}")

    if html.count("https://assistant.vireqo.id/client.js") != 1:
        raise RuntimeError("NUSA loader count changed")
    if html.count('data-client-id="jelnusa-staging"') != 1:
        raise RuntimeError("Tenant id count changed")

    locales = sorted((ROOT / "locales").glob("*.json"))
    if len(locales) != 8:
        raise RuntimeError(f"Expected 8 locale files, found {len(locales)}")

    INDEX.write_text(html, encoding="utf-8")

    report = {
        "status": "PASS",
        "index_size_before": before,
        "index_size_after": len(html),
        "delta_bytes": len(html) - before,
        "structured_data": ["Organization", "WebSite", "WebPage"],
        "canonical": "https://jelnusa.com/",
        "llms_txt": (ROOT / "llms.txt").exists(),
        "nusa_loader_preserved": True,
        "tenant_preserved": True,
        "locale_count": len(locales),
        "shared_bima_or_railway_touched": False,
    }
    REPORT.write_text(json.dumps(report, indent=2), encoding="utf-8")
    print(json.dumps(report, indent=2))

if __name__ == "__main__":
    main()
