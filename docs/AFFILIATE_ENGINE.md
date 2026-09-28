# JelNusa Affiliate Link Engine

Status: foundation implemented on `feature/affiliate-link-engine`.

## Goal

Avoid manually maintaining one affiliate URL per destination card. Destination cards should provide a destination name/slug and product type; the engine resolves the provider and builds the outbound URL.

## Files

- `affiliate/affiliate-config.js` — provider configuration, tracking IDs, priorities, CTA translations and manual overrides.
- `affiliate/affiliate-engine.js` — destination normalization, provider routing, URL generation, card binding and contextual CTA generation.

## Safety

No fake affiliate IDs are committed. Agoda CID and Booking.com AID remain empty until approved account credentials are available.

Traveloka is intentionally `manual-only` in the initial config because account-generated product affiliate links may expire and therefore should not become permanent destination-card infrastructure.

## Card wiring

A destination container can declare:

```html
<article data-affiliate-destination="Nusa Penida">
  <a data-affiliate-product="stay"></a>
</article>
```

After both engine scripts are loaded, the CTA is resolved automatically.

Optional provider preference:

```html
<a data-affiliate-product="stay" data-affiliate-provider="booking"></a>
```

## NUSA usage

NUSA can request a contextual CTA without touching the DOM:

```js
window.JelNusaAffiliate.createContextualCta({
  destination: "Labuan Bajo",
  productType: "stay",
  locale: "en"
});
```

The same resolver can later be exposed through the NUSA client-assistant integration.

## Manual override

Use overrides only for special products/deals or providers that do not support durable generated destination URLs.

## Next integration step

1. Audit existing destination-card markup in `index.html`.
2. Add stable `data-affiliate-destination` attributes without redesigning cards.
3. Load the two scripts.
4. Validate generated links in all 8 languages and on mobile.
5. Fill real tracking IDs only after affiliate accounts are approved.
