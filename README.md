# GoReallyBig Group

**It's not just words. It's a way of life.**

GoReallyBig Group is the parent brand behind a growing portfolio of digital businesses and products. This website introduces the thinking behind GoReallyBig, showcases its business lines, and connects visitors to each product's own website or application.

The idea is straightforward: **make big ideas feel less intimidating and more doable.** Because all big things usually start small.

**Repository:** [GoReallyBig-GRB/grb-group-lp](https://github.com/GoReallyBig-GRB/grb-group-lp)  
**Intended corporate domain:** [goreallybig.com](https://goreallybig.com)  
**Hosting target:** Cloudflare Pages

## The GoReallyBig portfolio

| Business / product | Focus | Destination |
| --- | --- | --- |
| **GoReallyBig Websites** | Professional websites for businesses seeking credibility, visibility and customer enquiries | [websites.goreallybig.com](https://websites.goreallybig.com) (planned migration target) |
| **JobPunter** | Job discovery, evidence-based opportunity matching, application preparation and career workflow management | [jobpunter.goreallybig.com](https://jobpunter.goreallybig.com) |
| **Uuda Studio** | Browser-based professional audio editing and processing, AI voiceovers and collaborative remote audio production | [uudastudio.goreallybig.com](https://uudastudio.goreallybig.com) |

**GoReallyBig Websites** designs professional, mobile-first websites that help businesses look credible, be discovered online and turn visitors into enquiries.

**JobPunter** helps job seekers find relevant opportunities, assess their fit against real experience, prepare applications, and manage their job-search process. It is a job-hunting product, not the Group website.

**Uuda Studio** is an audio production and editing workspace, **not a music-production DAW**. Its product direction includes professional audio editing and processing, connected sound/FX libraries, AI voiceovers, remote voice-talent recording with client monitoring, and recording sessions with remote co-hosts or guests for podcast and radio use cases.

These products maintain their own identity and destinations. The Group website is the umbrella introduction, not a replacement for their product sites.

## Site experience and content

This repository implements a responsive, single-page corporate landing page with navigation that jumps directly to four sections:

1. **Home** — the GoReallyBig identity and the oversized child-and-adult illustration, expressing imagination, possibility and the confidence to begin.
2. **Our Background** — “Everything big starts somewhere,” supported by a Rubik's cube and die representing puzzles, complexity, curiosity and taking a chance.
3. **Our Work** — prominent portfolio showcases with real product imagery and outbound links to GoReallyBig Websites, JobPunter and Uuda Studio.
4. **Our Mission** — an optimistic closing statement illustrated by the seated child looking back and smiling.

The visual language uses the GoReallyBig logo, deep blue, bright blue, lime green, generous whitespace, large typography and carefully composed artwork. The tone is professional, confident, relaxed and matter-of-fact, without sales-heavy corporate language.

### Interactive hero

On supported desktop screens, the opening hero uses a **native-scroll, sticky image reveal**. As the visitor scrolls, the illustration moves upward while the hero's copy remains stationary. When the artwork reaches the CTA area, the page continues into the next section. Scrolling upward reverses the effect.

The interaction uses ordinary browser scrolling rather than intercepting wheel or touch events. Smaller screens and users who prefer reduced motion receive a non-animated layout.

## Technical overview

- **Stack:** static HTML, CSS and vanilla JavaScript; no framework or package manager is required by the current repository.
- **Entry point:** `index.html` contains semantic page markup; `assets/site.css` contains the consolidated responsive styles, and `assets/site.js` contains the navigation and scroll interactions.
- **Assets:** `assets/`, containing brand logos, hero illustrations, portfolio screenshots and other site images.
- **Navigation:** same-page anchor links; business links open the associated destinations.
- **Responsive behavior:** CSS layouts for desktop and smaller screens, mobile navigation, and horizontal viewing of JobPunter's phone screenshots on narrow devices.
- **Accessibility consideration:** reduced-motion support for visitors who request it.

### Repository structure

```text
grb-group-lp/
├── index.html                 # Landing page, styles and JavaScript
├── assets/                    # Brand artwork and product imagery
│   ├── hero-giant-tight.png   # Hero illustration used by the page
│   ├── origin-cube.png        # Background-section illustration
│   ├── future-child.jpg       # Mission-section illustration
│   ├── website-showcase.png   # GoReallyBig Websites visual
│   ├── jp-*-full.png          # JobPunter mobile screen captures
│   ├── uuda-real.webp         # Uuda Studio editor screenshot
│   └── uuda-primary.webp      # Uuda Studio primary logo
└── README.md                  # Project documentation
```

There is currently no build manifest, package configuration or deployment workflow in the inspected repository.

## Run locally

No installation or build step is needed for the current static site. You can open `index.html` directly in a browser. For a local server, from the repository root run:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Cloudflare Pages deployment

**Deployment target: Cloudflare Pages, connected to this GitHub repository.** The repository inspection does not establish that a Cloudflare Pages project, custom domain or production deployment is already configured.

For a standard static-site Pages setup:

1. Create or select a Cloudflare Pages project and connect `GoReallyBig-GRB/grb-group-lp`.
2. Select the approved production branch (currently the repository's default branch is `main`).
3. Configure a static deployment: **no build command** and the repository root (`.`) as the output directory, if the Pages project interface requests one.
4. Deploy and verify the assigned `*.pages.dev` preview URL before connecting the production domain.
5. Add and verify `goreallybig.com` as the Group's custom domain, then configure `www.goreallybig.com` and its preferred redirect/canonical behavior if required.
6. Test desktop and mobile behavior, all brand assets, anchor links, outbound destinations, and the scroll-controlled hero.

Cloudflare settings and DNS changes must be validated against the actual Cloudflare account before cutover. No secret keys or environment variables are required by the inspected frontend code.

## Domain migration plan

The root domain is being reassigned from the existing **GoReallyBig Websites** business site to **GoReallyBig Group**.

| Address | Intended responsibility | Status in this README |
| --- | --- | --- |
| `goreallybig.com` | Group corporate landing page | Target state |
| `websites.goreallybig.com` | GoReallyBig Websites | Preferred target; already linked in current page code |
| `sites.goreallybig.com` | Alternative for GoReallyBig Websites | Option under consideration, not the URL currently linked |
| `jobpunter.goreallybig.com` | JobPunter | Existing product destination supplied for the project |
| `uudastudio.goreallybig.com` | Uuda Studio | Existing product destination supplied for the project |

**Recommended cutover order:**

1. Make the existing Websites site available and verify it at the chosen subdomain **before** changing the root domain.
2. Confirm the final Websites hostname. If choosing `sites.goreallybig.com`, update every `websites.goreallybig.com` link in `index.html` before publishing.
3. Preserve a working route from existing Websites bookmarks and shared links; define redirects where appropriate.
4. Deploy and inspect the Group site using a Pages preview domain.
5. Attach `goreallybig.com` to the Group's Pages project and remove or update the old site's conflicting custom-domain binding as needed.
6. Confirm SSL/TLS, DNS resolution, redirects, navigation, linked products, and performance after propagation.
7. Keep a rollback path to the previous Pages project/domain configuration until the new setup is confirmed stable.

**Important:** The migration is documented as planned. This README does not assert that DNS, Cloudflare Pages, redirects or the Websites relocation have already been completed.

## Maintenance guidance

- Keep product descriptions and links aligned with the actual business lines.
- Preserve the original logos and product screenshots as source assets; do not casually replace them with generic stock imagery.
- Check desktop and mobile composition after modifying the hero artwork, sticky scroll logic, typography or card sizing.
- Ensure image paths match files in `assets/` exactly, including filename case.
- Test navigation and external links before each release.
- Use pull-request review for material UI and production-domain changes; do not create deployment branches without project authorization.


## Staging environment

The Group landing page has a dedicated Cloudflare Pages project for staging:

- **URL:** [staging.goreallybig.com](https://staging.goreallybig.com)
- **Pages project:** `grb-group-staging`
- **Pages fallback:** `grb-group-staging.pages.dev`
- **Source repository:** `GoReallyBig-GRB/grb-group-lp`
- **Deployment branch:** `staging` (changes to this branch automatically publish to staging; `main` is reserved for eventual production)
- **Build:** static site with no build command; output directory `.`

The root domain `goreallybig.com` is **not** connected to this staging Pages project. Staging is intended for pre-production checks. A separate production deployment and deliberate domain cutover will be needed when ready.

## Current project state

The repository currently contains the landing page implementation and its visual assets on `main`. Before this documentation change, `README.md` was a short placeholder. Cloudflare Pages configuration, migration execution, production publication, and end-to-end browser acceptance are separate tasks to verify.

---

**GoReallyBig Group**  
*Everything big starts somewhere.*


## Mobile release hardening (November 2026)

- Reserved intrinsic `width` and `height` for every page image to prevent content jumping during lazy loading.
- Converted large showcase, hero, and production screenshots to optimised WebP while retaining visual source files in Git history.
- Horizontal JobPunter gallery supports touch swipes, keyboard focus, and arrow keys.
- Removed unused historic selectors and declarations shadowed by the same selector in the same media context; retained desktop cinematic-scroll geometry.
- Staging preserves `noindex` in both HTML and `_headers`. Production rollout must review `robots.txt`, `_headers`, canonical/OG URLs, and outbound product links separately.
