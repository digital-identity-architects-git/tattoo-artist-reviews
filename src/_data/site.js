// Global site configuration — referenced site-wide as {{ site.* }}.
module.exports = {
  name: "Tattoo Artist Review",
  shortName: "TAR",
  tagline: "The baddest tattoo artist in every city.",
  description:
    "Hand-picked reviews of the best tattoo artists across all 50 states — who they are, why they're the best in their city, and where to book them.",
  // Canonical domain (no trailing slash).
  url: "https://tattoo-artist-review.com",
  locale: "en_US",
  author: "Tattoo Artist Review",

  // Contact / outreach — shown in the header CTA and footer site-wide.
  contact: {
    email: "tattootalk@tattoo-artist-review.com",
    phone: "512-679-9023",
    phoneHref: "tel:+15126799023",
    instagram: "onthelistseries",
    instagramUrl: "https://instagram.com/onthelistseries",
  },

  // Primary navigation (rendered in the site-wide header menu).
  nav: [
    { label: "Home", url: "/" },
    { label: "Reviews", url: "/reviews/" },
    { label: "Cities", url: "/cities/" },
    { label: "Blog", url: "/blog/" },
    { label: "Get Reviewed", url: "/get-reviewed/" },
  ],

  // Default social share image (place at src/assets/img/header-image.webp).
  defaultImage: "/assets/img/header-image.webp",
};
