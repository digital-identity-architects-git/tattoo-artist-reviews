# Tattoo Artist Review — Content & SEO Strategy

This is the playbook. It maps the keyword set (`keywords/keywords.csv`, tracked in
`keywords/KEYWORD-TRACKER.md`) onto a concrete page and blog strategy, and ties
both to the real-world goal: **within 6 months, artists are messaging _you_ for a
spot on the podcast.** We get there by owning the search results that artists'
future clients are already typing in — so being featured here visibly sends an
artist real bookings. That's the flywheel. Reviews → traffic → bookings →
artists want in → better reviews → more traffic.

---

## 1. The numbers we're playing for

The seed set is **2,130 unique keywords / ~13.0M monthly U.S. searches**. They
cluster cleanly by intent:

| Cluster | Keywords | Monthly volume | Where it lives on the site |
|---|---:|---:|---|
| **Local / "near me"** | 66 | **2.12M** | `/map/`, `/cities/<state>/`, `/cities/<state>/<city>/`, artist reviews |
| **Motifs / subjects / ideas** | 1,628 | **4.02M** | Blog galleries (one per motif) |
| **Audience (for men/women/couples)** | 65 | **1.51M** | Blog galleries |
| **Body placement** | 95 | **1.34M** | Blog galleries |
| **Aftercare / pain / healing** | 86 | 707K | Blog guides |
| **Styles** | 26 | 463K | `/style/<slug>/` hubs |
| **Lettering / fonts** | 29 | 331K | Blog + fonts hub |
| **Removal / cover-up** | 18 | 180K | Blog guides |
| **Meaning / symbolism** | 36 | 186K | Blog |
| **Pricing** | 12 | 44K | Blog guide |
| **Head terms** | 9 | 1.26M | Homepage + core (won on total authority) |
| **Icebox — supplies/DIY** | 51 | 261K | _Parked — see §6_ |
| **Toss — off-geo / temporary** | 8 | 607K | _Removed — see §2_ |

**The headline:** the money is local. "tattoo shops near me" alone is 1.22M/mo,
and the whole local cluster is 2.1M of high-intent, ready-to-book traffic. That
cluster is exactly what the new site architecture is built to capture. The
4M-volume motif/idea long tail is the blog engine that builds the domain
authority needed to _rank_ for that local intent.

---

## 2. Branded keywords — handled

You asked to strip branded keywords. After auditing all 2,130: **there are no
competitor-brand or your-own-brand terms in this set to remove.** It's a clean
generic seed list. The only thing masquerading as "branded" is dataset noise:

- **Off-geo (Ireland):** `tattoo ireland`, `tattoo ie`, etc. — irrelevant to a
  U.S. 50-state brand. **Tossed.**
- **Temporary/novelty:** `henna tattoo`, airbrush, press-on. Off-brand for a
  permanent-ink review site. **Tossed.**
- **Product brands** (Aquaphor, Saniderm, Hustle Butter) are aftercare _products_,
  not competitors — they stay, folded into aftercare blog guides where they're
  genuinely useful.

All tossed terms are isolated in the **TOSS** cluster of the tracker so they
never get a page. If you later have specific competitor brands you want to
defend against or avoid, send them and I'll add a kill-list.

---

## 3. The architecture = the semantic takeover (already built)

The point of a "semantic takeover" is to have a dedicated, crawlable page for
**every angle** a person can approach the niche from — geo and style — and to
interlink them so authority flows. That structure now exists in the repo:

```
/map/                                 Interactive U.S. map — the hub of hubs
/cities/                              All 50 states index
/cities/<state>/                      State hub  (×51, incl. DC — even empty ones)
/cities/<state>/<city>/               City hub   (one per city we cover)
/reviews/<state>/<city>/<artist>/     The artist review (the asset that converts)
/style/                               Style index
/style/<slug>/                        Style hub  (×18 canonical + any custom tag)
```

**Every artist is now tagged two ways — by city and by style — and every tag is a
clickable, indexable page.** Click "psychedelic," "patriotic," or "Seattle" and
you land on a page that lists the artists for it. That's the facet system you
asked for, and it's what lets one artist rank for `psychedelic tattoo artist
seattle` without you hand-building that page.

**Why generate all 51 state hubs before they have artists:** each empty hub is a
live landing page targeting "best tattoo artists in `<state>`" _and_ a standing
"this crown is open" recruitment pitch. The map shows dark states as open
territory. That's free inventory and a built-in reason for artists to reach out.

### The interactive map
`/map/` renders all 50 states (+DC) as pressable buttons. Press a state → it
swaps to that state's cities → press a city → artists with their style tags.
Gold-lit states already have artists; dark ones are open. It works without
JavaScript too (each state button falls back to its hub page), so it's fully
crawlable.

---

## 4. Page strategy (the hubs)

These are evergreen, templated, and grow automatically as you publish reviews.
Each hub ships with substantial evergreen copy so it's **never a thin, empty
listing** (Google penalizes thin programmatic pages — this is the #1 risk with
a build like this, and the templates are written to avoid it).

| Page | Targets | Primary keywords | Job |
|---|---|---|---|
| Homepage | brand + head | `tattoo artist`, `tattoo` | Authority + freshest reviews |
| `/map/` | local browse | `tattoo artist near me` family | The flagship discovery experience |
| `/cities/<state>/` | state geo | `best tattoo artists in <state>` | Net for state-level + "open crown" CTA |
| `/cities/<state>/<city>/` | city geo | `tattoo shops in <city>`, `best tattoo artist <city>` | The local money page |
| `/style/<slug>/` | style intent | `<style> tattoo artist`, `<style> tattoo` | Cross style × geo |
| `/reviews/.../<artist>/` | the artist | `<artist name>`, `<style> tattoo <city>` | **The conversion asset** |

**The review is the product.** Everything else exists to funnel a ready-to-book
searcher into a single artist's review, which links straight to their Instagram,
shop, and booking. That measurable booking lift is your pitch to the next artist.

**Editorial standard for reviews:** minimum **1,000 words**, healed-work focus,
1–4 canonical style tags, real booking links. Use `templates/review.md`. Prefer
canonical style names (see `src/_data/styleCatalog.js`) so artists pool onto the
big style hubs instead of fragmenting into one-off tags.

---

## 5. Blog strategy — the authority + long-tail engine

The blog does two jobs: (1) vacuum up the 4M-volume motif/idea/placement long
tail, and (2) build the topical authority the local hubs need to rank. **Every
post is 1,000+ words, no exceptions**, and every post links _down_ into relevant
city, style, and artist pages — that internal linking is what turns blog traffic
into ranking power for the money pages.

Five repeatable post formats (so production never stalls):

1. **Motif gallery** — `X tattoo ideas` (1,628 kws, 4.0M vol). The core engine.
   _"40 Rose Tattoo Ideas (and the Artists Who Do Them Best)."_ Each gallery
   features real artists from the directory → links to their reviews. One post
   per motif: rose, butterfly, cross, dragon, snake, phoenix, medusa, skull,
   lotus, etc. **This is where most blog volume lives — start here.**
2. **Placement gallery** — `forearm/hand/neck/sleeve tattoos` (1.34M). Same
   format, sliced by body part and often by audience (`forearm tattoos for men`).
3. **Audience roundup** — `tattoos for men / women / couples / matching` (1.51M).
4. **Authority guides** — aftercare, pain chart, healing stages, pricing,
   removal, cover-ups (1.2M combined). These earn trust and backlinks. Fold the
   product terms (Aquaphor/Saniderm) in here.
5. **Meaning explainers** — `X tattoo meaning` (186K). Short to write, strong
   internal-link bait into the matching motif gallery.

**Podcast tie-in:** every podcast interview becomes a blog post _and_ feeds the
artist's review. The episode is the relationship; the review + gallery placement
is the deliverable that sends them bookings. That's the hook that gets the next
ten artists to call you.

**Cadence:** the homepage feed alternates review · blog · review · blog, so keep
roughly 1:1. Target ~3 reviews + 3 blog posts/week to start; front-load motif
galleries (fast to produce, highest volume) while you build the review base.

---

## 6. What we are deliberately NOT chasing (yet)

- **Supplies / DIY / machines** (`tattoo gun`, `tattoo machine`, `needles`,
  `stencils` — 261K). Wrong audience: these are aspiring/working tattooers and
  hobbyists, not people booking the artists you feature, and not your podcast
  guests' clients. Parked in the **Icebox**. Only revisit if you add an affiliate
  gear-review vertical.
- **Off-geo & temporary** — tossed (see §2).

Saying no here is the strategy. Chasing 261K of low-fit volume would dilute the
site's topical focus and slow the local rankings that actually matter.

---

## 7. Internal linking model (how authority flows)

```
Homepage ─┬─► /map/ ─► state hub ─► city hub ─► ARTIST REVIEW
          ├─► /style/ ─► style hub ─────────────► ARTIST REVIEW
          └─► /blog/ ─► motif gallery ──────────► ARTIST REVIEW
                         meaning post ─► motif gallery
artist review ─► its city hub, its state hub, each of its style hubs
```

Every page points _toward_ an artist review; every review points back _up_ to
its city/state/style hubs. No orphan pages. The sitemap (`/sitemap.xml`)
auto-includes everything.

---

## 8. 6-month roadmap (mapped to the podcast goal)

- **Month 1 — Foundation.** Architecture is live (done). Publish the first 15–20
  real reviews across 3–4 anchor cities. Ship 8–10 motif galleries (rose,
  butterfly, dragon, snake, cross, skull + the small/simple "ideas" terms).
- **Month 2 — Density.** Reach ~40 reviews. Light up 8–10 states on the map.
  Publish the 5 authority guides (aftercare, pain, cost, removal, healing).
- **Month 3 — Style takeover.** Ensure every canonical style hub has ≥3 featured
  artists. Add placement + audience galleries. First local rankings should
  appear.
- **Month 4 — Proof.** Start showing artists their referral traffic/booking lift.
  This is when inbound interest begins.
- **Month 5 — Flywheel.** Podcast episodes feeding reviews weekly; artists begin
  reaching out for spots.
- **Month 6 — Inbound.** Goal state: a waitlist for the podcast and the directory
  ranking for `best tattoo artist in <city>` in your anchor markets.

---

## 9. Working the tracker

`keywords/KEYWORD-TRACKER.md` lists all 2,130 keywords grouped by the clusters
above, each with a checkbox, monthly volume, and competition.

- **Check a box when the page/post that targets it goes live.**
- Work top-down by cluster: Local first (highest intent), then knock out motif
  galleries (highest volume), then guides.
- One published page typically checks off several keywords (a single rose gallery
  covers `rose tattoo`, `rose tattoo ideas`, `rose tattoos for men`, etc.).
- Re-run the generator if you refresh the CSV; clustering is deterministic.

Measure in Google Search Console by cluster: local impressions/clicks are the
leading indicator that the flywheel is turning.
