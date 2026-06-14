const { DateTime } = require("luxon");
const US_STATES = require("./src/_data/usStates.js");
const STYLE_CATALOG = require("./src/_data/styleCatalog.js");

// One slug function used everywhere so URLs are predictable and collision-free.
const slugify = (str) =>
  String(str || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

module.exports = function (eleventyConfig) {
  // Pass static assets straight through to the build output.
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/robots.txt": "robots.txt" });
  eleventyConfig.addPassthroughCopy({ "src/favicon.ico": "favicon.ico" });

  // Rebuild when CSS/JS change during local dev.
  eleventyConfig.addWatchTarget("src/assets/");

  // ---- Collections -------------------------------------------------------
  // Reviews and posts are defined by where the file lives, not by tags, so the
  // /reviews/ and /blog/ listing pages can stay in the sitemap without showing
  // up inside their own feeds. Author content as .md; index pages are .njk.
  const reviewGlob = "src/reviews/**/*.md";
  const postGlob = "src/blog/**/*.md";

  eleventyConfig.addCollection("reviews", (api) =>
    api.getFilteredByGlob(reviewGlob).sort((a, b) => b.date - a.date)
  );

  eleventyConfig.addCollection("posts", (api) =>
    api.getFilteredByGlob(postGlob).sort((a, b) => b.date - a.date)
  );

  // The front-page feed: reviews + blog posts interleaved, newest first.
  // We alternate review / blog / review / blog where possible, otherwise
  // fall back to strict reverse-chronological order.
  eleventyConfig.addCollection("feed", (api) => {
    const reviews = api.getFilteredByGlob(reviewGlob).sort((a, b) => b.date - a.date);
    const posts = api.getFilteredByGlob(postGlob).sort((a, b) => b.date - a.date);
    const out = [];
    const max = Math.max(reviews.length, posts.length);
    for (let i = 0; i < max; i++) {
      if (reviews[i]) out.push(reviews[i]);
      if (posts[i]) out.push(posts[i]);
    }
    return out;
  });

  // Group reviews by state for the legacy /cities/ directory list. Keyed by the
  // raw two-letter abbreviation found in front matter.
  eleventyConfig.addCollection("states", (api) => {
    const byState = {};
    api.getFilteredByGlob(reviewGlob).forEach((item) => {
      const state = (item.data.state || "Unknown").trim();
      (byState[state] = byState[state] || []).push(item);
    });
    return Object.keys(byState)
      .sort()
      .map((state) => ({
        name: state,
        slug: slugify(state),
        reviews: byState[state].sort((a, b) =>
          (a.data.city || "").localeCompare(b.data.city || "")
        ),
      }));
  });

  // ---- Programmatic SEO hubs --------------------------------------------
  // One landing page per state (all 50 + DC), per city we cover, and per style
  // tag. These power the location menu, the map page, and the style tags, and
  // give the site a complete geo × style footprint to rank on.

  // Helper: bucket every review by its state abbreviation, then by city.
  const indexReviewsByState = (api) => {
    const byAbbr = {};
    api.getFilteredByGlob(reviewGlob).forEach((item) => {
      const abbr = (item.data.state || "").trim().toUpperCase();
      const city = (item.data.city || "").trim();
      const bucket = (byAbbr[abbr] = byAbbr[abbr] || { reviews: [], cities: {} });
      bucket.reviews.push(item);
      if (city) (bucket.cities[city] = bucket.cities[city] || []).push(item);
    });
    return byAbbr;
  };

  // stateHubs: every state, whether or not it has reviews yet, with its cities.
  eleventyConfig.addCollection("stateHubs", (api) => {
    const byAbbr = indexReviewsByState(api);
    return US_STATES.map((st) => {
      const bucket = byAbbr[st.abbr] || { reviews: [], cities: {} };
      const cities = Object.keys(bucket.cities)
        .sort()
        .map((city) => ({
          name: city,
          slug: slugify(city),
          reviews: bucket.cities[city].sort((a, b) => b.date - a.date),
        }));
      return {
        name: st.name,
        abbr: st.abbr,
        slug: st.slug,
        cities,
        reviews: bucket.reviews.sort((a, b) => b.date - a.date),
        reviewCount: bucket.reviews.length,
      };
    });
  });

  // cityHubs: one page per (state, city) pair that actually has a review.
  eleventyConfig.addCollection("cityHubs", (api) => {
    const byAbbr = indexReviewsByState(api);
    const out = [];
    US_STATES.forEach((st) => {
      const bucket = byAbbr[st.abbr];
      if (!bucket) return;
      Object.keys(bucket.cities)
        .sort()
        .forEach((city) => {
          out.push({
            city,
            citySlug: slugify(city),
            stateName: st.name,
            stateAbbr: st.abbr,
            stateSlug: st.slug,
            reviews: bucket.cities[city].sort((a, b) => b.date - a.date),
          });
        });
    });
    return out;
  });

  // styleHubs: every catalog style, plus any ad-hoc style tag an author uses.
  // Reviews attach to a style by the slug of each entry in their `styles:` list.
  eleventyConfig.addCollection("styleHubs", (api) => {
    const map = {};
    STYLE_CATALOG.forEach((s) => {
      map[s.slug] = {
        name: s.name,
        slug: s.slug,
        tagline: s.tagline || "",
        blurb: s.blurb || "",
        reviews: [],
      };
    });
    api.getFilteredByGlob(reviewGlob).forEach((item) => {
      (item.data.styles || []).forEach((name) => {
        const slug = slugify(name);
        if (!slug) return;
        if (!map[slug]) {
          map[slug] = { name, slug, tagline: "", blurb: "", reviews: [] };
        }
        map[slug].reviews.push(item);
      });
    });
    return Object.values(map)
      .map((s) => ({ ...s, reviews: s.reviews.sort((a, b) => b.date - a.date) }))
      .sort((a, b) => a.name.localeCompare(b.name));
  });

  // mapData: a single plain, JSON-serializable object driving the interactive
  // map page (state buttons -> cities -> artists + style tags). Kept separate
  // from the template collections because template items aren't serializable.
  eleventyConfig.addCollection("mapData", (api) => {
    const byAbbr = indexReviewsByState(api);
    const states = US_STATES.map((st) => {
      const bucket = byAbbr[st.abbr] || { reviews: [], cities: {} };
      const cities = Object.keys(bucket.cities)
        .sort()
        .map((city) => ({
          name: city,
          slug: slugify(city),
          url: `/cities/${st.slug}/${slugify(city)}/`,
          artists: bucket.cities[city]
            .sort((a, b) => b.date - a.date)
            .map((r) => ({
              name: r.data.artist || r.data.title || "Artist",
              url: r.url,
              shop: r.data.shopName || "",
              styles: (r.data.styles || []).map((s) => ({
                name: s,
                slug: slugify(s),
              })),
            })),
        }));
      return {
        name: st.name,
        abbr: st.abbr,
        slug: st.slug,
        url: `/cities/${st.slug}/`,
        count: bucket.reviews.length,
        cities,
      };
    });
    return [{ states }];
  });

  // ---- Filters -----------------------------------------------------------
  eleventyConfig.addFilter("readableDate", (date, zone = "America/Chicago") =>
    DateTime.fromJSDate(date, { zone }).toFormat("LLLL d, yyyy")
  );

  eleventyConfig.addFilter("isoDate", (date) =>
    DateTime.fromJSDate(date, { zone: "utc" }).toISODate()
  );

  eleventyConfig.addFilter("year", () => new Date().getFullYear());

  // Map a two-letter state abbreviation (as used in review front matter) to its
  // URL slug, so reviews can link to their city/state hubs.
  const ABBR_TO_SLUG = US_STATES.reduce((m, s) => ((m[s.abbr] = s.slug), m), {});
  eleventyConfig.addFilter("stateSlug", (abbr) =>
    ABBR_TO_SLUG[String(abbr || "").trim().toUpperCase()] || slugify(abbr)
  );

  eleventyConfig.addFilter("slug", (str) =>
    String(str || "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
  );

  // Limit a list (used on the homepage feed).
  eleventyConfig.addFilter("limit", (arr, n) => (arr || []).slice(0, n));

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["njk", "md", "html"],
  };
};
