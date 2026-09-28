# Manual Affiliate Link Mapping

This file is the owner workflow for Phase 4 manual affiliate links.

1. Open each `booking_base_url`.
2. Generate the affiliate link from the owner's affiliate account.
3. Paste the generated URL into `manual_affiliate_url`.
4. Do not change `destination` or `region`.
5. Once filled, the mapping can be wired as a manual override so each JelNusa card and NUSA recommendation uses the exact owner-generated affiliate link.

Important:
- No affiliate ID is invented by JelNusa.
- Empty `manual_affiliate_url` means the server-resolved fallback stays active.
- Traveloka links, if used later, must also be owner-generated and mapped manually.
