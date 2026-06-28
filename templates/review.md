---
# === COPY ME ===
# Save as: src/reviews/<state>/<city>/<artist-slug>.md
# Example:  src/reviews/texas/austin/mars-vega.md  ->  /reviews/texas/austin/mars-vega/

title: "ARTIST NAME — Best Tattoo Artist in CITY, ST"   # browser/SEO title
artist: "ARTIST NAME"
city: "CITY"
state: "ST"                 # two-letter abbreviation, e.g. TX, CA
date: 2026-06-11            # publish date (YYYY-MM-DD)

shopName: "SHOP NAME"       # optional
shopUrl: ""                 # optional, full https:// link

instagram: "their_handle"   # without the @
website: ""                 # optional, full https:// link
booking: ""                 # optional booking link (adds a "Book" button)

styles:                     # 1–4 style tags — each links to /style/<slug>/
  # Prefer a CANONICAL style name (see src/_data/styleCatalog.js) so the artist
  # pools onto the big style hub everyone searches: Traditional, Neo-Traditional,
  # Blackwork, Fine-Line, Realism, Black & Grey, Japanese / Irezumi, Tribal,
  # Geometric, Watercolor, Illustrative, Botanical, Lettering & Script, Surrealism,
  # Anime & Manga, Psychedelic, Patriotic, Ignorant / Naïve. You can still add a
  # custom tag — it spins up its own /style/ page automatically.
  - "Fine-Line"
  - "Neo-Traditional"

excerpt: "One punchy sentence on why this artist takes the city. Shows on the homepage card."

# --- Optional per-artist branding -----------------------------------------
# accent: "#b8472a"         # tints this review toward the artist's brand color
# photo: "/assets/img/artists/artist-slug.webp"        # round portrait up top
# heroImage: "/assets/img/artists/artist-slug-hero.webp"  # faint hero backdrop
# gallery:
#   - { src: "/assets/img/artists/artist-slug-1.webp", alt: "Description", caption: "Optional caption" }
#   - { src: "/assets/img/artists/artist-slug-2.webp", alt: "Description" }
---

Open with why this artist is *the one* in their city. Make it read like you mean it.

## Why they take the crown

What sets their work apart — linework, color, healing, consistency, range.

## The style

What they're known for and the kind of pieces they do best.

## Booking & where to find them

How and where to book. Point people to the Instagram and shop.
