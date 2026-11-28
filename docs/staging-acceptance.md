# GoReallyBig — staging acceptance and production cutover

This checklist documents changes applied to the **staging** branch. The public-facing name stays **GoReallyBig**.

## Staging configuration

- Pages project: `grb-group-staging`, branch: `staging`
- Staging hostname: `https://staging.goreallybig.com`
- Staging is intentionally blocked from search indexing through `robots.txt`, `_headers` and a robots meta tag.
- Cloudflare Web Analytics: separate staging property.
- `main` is reserved for the future production deployment; it is not currently connected to the Group root domain.

## Current site destinations

| Business | Staging page currently links to | Intended production destination |
| --- | --- | --- |
| GoReallyBig Websites | `https://goreallybig.com` (existing Websites site until the migration) | `https://websites.goreallybig.com` |
| JobPunter | `https://jobpuntertest.goreallybig.com` | `https://jobpunter.goreallybig.com` |
| Uuda Studio | `https://uudatest.goreallybig.com` | `https://uudastudio.goreallybig.com` |

**Do not merge staging-specific links into the public production release without replacing and verifying every destination.**

## Desktop acceptance

- [ ] Review Uuda Studio visual once the genuine replacement screenshot is available.
- [x] Confirm the Uuda logo is positioned above the waveform interface rather than covering the waveform (desktop full-page render; replacement image still pending).
- [x] Inspect footer layout, email and social icons at 1440px desktop width (browser-rendered at the footer). Additional breakpoint QA remains outstanding.
- [x] Check social links against the official GoReallyBig accounts (exact destinations copied from `goreallybig-website/index.html`).
- [ ] Confirm the cinematic desktop hero scroll, reverse scroll and CTA alignment.
- [ ] Confirm hover states, keyboard navigation and focus visibility.
- [x] Review product cards in a rendered full-page desktop view with images requested; Uuda replacement screenshot and explicit approval remain open.

## Operational acceptance

- [ ] Confirm `info@goreallybig.com` receives test email and can reply using the same address.
- [ ] Validate the external product previews and destination readiness.
- [ ] Check actual HTTP response headers include `X-Robots-Tag: noindex` on staging.
- [x] Confirm HTTPS, certificate status and Cloudflare custom-domain validation (Cloudflare Pages reports `active` and deployment `success`).
- [ ] Check Cloudflare Web Analytics receives events.
- [x] Audit selected image transfer sizes: `website-showcase.png` ~2.20 MB, `origin-cube.png` ~1.29 MB, `hero-giant-tight.png` ~0.82 MB, `uuda-real.webp` ~0.07 MB. Compression/replacement of the large PNGs remains a separate task.
- [ ] Verify Core Web Vitals on actual desktop and mobile devices.
- [ ] Configure a monitored availability check for staging and production endpoints.

## Browser QA evidence (2026-11-28)

- Browser-rendered at **1440 × 900**: hero headline and CTA composition preserved; no horizontal document overflow observed.
- The Background cube artwork loads and displays correctly when scrolled into view.
- The footer logo, contact address and all five social icons load correctly when the footer is brought into view.
- A full-page screenshot without visiting off-screen sections leaves some lazy-loaded images blank. This is a **capture limitation**, not evidence that the assets are missing: direct asset checks return HTTP 200.
- The Group page remains staging-only and blocked from indexing. Its product links deliberately use the currently agreed preview destinations.
- Remaining visual approvals: replacement Uuda Studio screenshot; cinematic hero transition/reverse behavior; hover, keyboard and focus tests; mobile optimization after desktop sign-off.

## Production cutover — not done

1. Finish desktop design sign-off, then mobile optimization.
2. Move GoReallyBig Websites to its approved subdomain and confirm links and redirects.
3. Replace all staging preview links with public product destinations, or give unavailable products a deliberate upcoming state.
4. Prepare a separate Group production Pages project based on the approved `main` branch.
5. Remove staging-only `noindex` restrictions and staging analytics token from production; configure production analytics, canonical and Open Graph URLs.
6. Add the root custom domain to the Group's production project only after the Websites migration has been verified.
7. Run production smoke tests, monitoring and a rollback drill.

Do not copy the staging `robots.txt` or `_headers` `noindex` directive into the production artifact.
