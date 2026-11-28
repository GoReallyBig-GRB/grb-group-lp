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
- [ ] Confirm the Uuda logo is fully above the screenshot, not overlapping it.
- [ ] Inspect footer layout, email and social icons at desktop breakpoints.
- [ ] Check social links against the official GoReallyBig accounts.
- [ ] Confirm the cinematic desktop hero scroll, reverse scroll and CTA alignment.
- [ ] Confirm hover states, keyboard navigation and focus visibility.
- [ ] Review all three product cards for consistent visual hierarchy.

## Operational acceptance

- [ ] Confirm `info@goreallybig.com` receives test email and can reply using the same address.
- [ ] Validate the external product previews and destination readiness.
- [ ] Check actual HTTP response headers include `X-Robots-Tag: noindex` on staging.
- [ ] Confirm HTTPS, certificate status and domain resolution.
- [ ] Check Cloudflare Web Analytics receives events.
- [ ] Audit image transfer size and consider optimized modern variants of the largest images.
- [ ] Verify Core Web Vitals on actual desktop and mobile devices.
- [ ] Configure a monitored availability check for staging and production endpoints.

## Production cutover — not done

1. Finish desktop design sign-off, then mobile optimization.
2. Move GoReallyBig Websites to its approved subdomain and confirm links and redirects.
3. Replace all staging preview links with public product destinations, or give unavailable products a deliberate upcoming state.
4. Prepare a separate Group production Pages project based on the approved `main` branch.
5. Remove staging-only `noindex` restrictions and staging analytics token from production; configure production analytics, canonical and Open Graph URLs.
6. Add the root custom domain to the Group's production project only after the Websites migration has been verified.
7. Run production smoke tests, monitoring and a rollback drill.

Do not copy the staging `robots.txt` or `_headers` `noindex` directive into the production artifact.
