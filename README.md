# Tattoo Artist Review

Reviews of the baddest tattoo artist in every city in America. Static site built
with [Eleventy](https://www.11ty.dev/), deployed to the web host over FTP.

- **Live domain:** https://tattoo-artist-review.com
- **Contact:** [@onthelistseries](https://instagram.com/onthelistseries) ·
  512-679-9023 · tattootalk@tattoo-artist-review.com

---

## How it works (the 30-second version)

You write each **review** and **blog post** as a small Markdown file. Eleventy
turns the whole `src/` folder into plain static HTML in `_site/`. When changes
land on `main`, GitHub Actions builds the site and uploads `_site/` to
`public_html/` over FTP. You never touch the server by hand.

```
src/                      → you edit this
  index.njk               homepage (banner + blog roll feed)
  reviews/<state>/<city>/  artist reviews (one .md file each)
  blog/                    blog posts (one .md file each)
  _includes/               shared header, footer, layouts (the site-wide chrome)
  assets/css/theme.css     the gold-and-black look
  assets/img/              images (you upload header-image.webp here)
_site/                    → generated automatically, deployed to public_html/
```

The **header, menu, and footer are defined once** (`src/_includes/partials/`)
and appear on every page. Change them in one place, every page updates.

---

## The browse architecture (states · cities · styles · map)

Every artist is tagged two ways — by **city** and by **style** — and each tag is
its own indexable page that builds itself from the reviews:

| URL | What it is | Source |
| --- | --- | --- |
| `/map/` | Interactive U.S. map: press a state → cities → artists + tags | `src/map.njk` |
| `/cities/` | All 50 states index | `src/cities.njk` |
| `/cities/<state>/` | State hub (all 51 exist, even empty ones) | `src/state/state.njk` |
| `/cities/<state>/<city>/` | City hub — artists in that city | `src/city/city.njk` |
| `/style/` | All style tags | `src/styles-index.njk` |
| `/style/<slug>/` | Style hub (psychedelic, patriotic, blackwork…) | `src/style/style.njk` |

You don't build these by hand. Add a review with `state:`, `city:` and `styles:`
front matter and the matching state, city and style pages update automatically.
The 50-state menu lives in `src/_data/usStates.js`; the canonical style list (so
big styles have a page from day one) lives in `src/_data/styleCatalog.js`.

## Strategy & keyword tracking

- **`CONTENT-STRATEGY.md`** — the page + blog playbook (also exported to
  `docs/Tattoo-Artist-Review-Content-Strategy.pdf`).
- **`keywords/keywords.csv`** — the raw keyword set.
- **`keywords/KEYWORD-TRACKER.md`** — all keywords grouped by cluster with a
  checkbox each. **Tick a box when the page/post that targets it is live.**

---

## Running it locally (optional)

```bash
npm install
npm start        # live preview at http://localhost:8080
npm run build    # one-off build into _site/
```

---

## Adding a review (the daily work)

1. Copy `templates/review.md` into `src/reviews/<state>/<city>/<artist-slug>.md`
   — e.g. `src/reviews/texas/austin/mars-vega.md`.
   The folder path **is** the URL: `/reviews/texas/austin/mars-vega/`.
2. Fill in the front matter (the part between the `---` lines) and write the body.
3. Drop the artist's photo + work images in `src/assets/img/artists/` and point
   the `photo` / `gallery` fields at them.
4. Commit. On `main`, it deploys automatically.

See `templates/review.md` for every available field, and
`src/reviews/texas/austin/sample-artist.md` for a worked example.

### Branding a review to the artist

Every review already inherits the site-wide gold/black header. To tint the rest
of the page toward the artist's own brand, set an accent color in the front
matter:

```yaml
accent: "#b8472a"     # the artist's signature color
heroImage: "/assets/img/artists/mars-vega-hero.webp"
```

---

## Adding a blog post

Copy `templates/blog.md` into `src/blog/<slug>.md`, fill it in, commit. It shows
up in the homepage feed and at `/blog/`.

The homepage feed alternates **review · blog · review · blog** automatically, so
keep roughly one blog post flowing for each review to keep the rhythm.

---

## Deployment & required secrets

Deployment runs from `.github/workflows/deploy.yml`. It needs these set in
**Settings → Secrets and variables → Actions**:

**Secrets (sensitive):**

| Name           | What it is                          |
| -------------- | ----------------------------------- |
| `FTP_SERVER`   | FTP host (e.g. `ftp.yourhost.com`)  |
| `FTP_USERNAME` | FTP account username                |
| `FTP_PASSWORD` | FTP account password                |
| `FTP_PORT`     | FTP port (optional, defaults to 21) |

**Variables (non-sensitive, optional — sensible defaults already set):**

| Name             | Default          | What it is                          |
| ---------------- | ---------------- | ----------------------------------- |
| `FTP_PROTOCOL`   | `ftps`           | `ftp`, `ftps`, or `ftps-legacy`     |
| `FTP_SERVER_DIR` | `public_html/`   | Folder on the host to deploy into   |

> If you already created secrets under different names, either rename them to
> match the table above or tell me the names you used and I'll update the
> workflow.

Trigger a deploy any time from the **Actions** tab → *Build & Deploy* → *Run
workflow*, or just push to `main`.

---

## The header image

The homepage banner pulls from `/assets/img/header-image.webp`. Drop your banner
image at `src/assets/img/header-image.webp` and it ships with the next build. (If
you'd rather upload it straight to the server, put it at
`public_html/assets/img/header-image.webp` — the deploy is configured not to
delete files you place there manually.)
