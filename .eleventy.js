const { DateTime } = require("luxon");

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

  // Group reviews by state for the directory / browse pages.
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
        slug: state.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        reviews: byState[state].sort((a, b) =>
          (a.data.city || "").localeCompare(b.data.city || "")
        ),
      }));
  });

  // ---- Filters -----------------------------------------------------------
  eleventyConfig.addFilter("readableDate", (date, zone = "America/Chicago") =>
    DateTime.fromJSDate(date, { zone }).toFormat("LLLL d, yyyy")
  );

  eleventyConfig.addFilter("isoDate", (date) =>
    DateTime.fromJSDate(date, { zone: "utc" }).toISODate()
  );

  eleventyConfig.addFilter("year", () => new Date().getFullYear());

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
