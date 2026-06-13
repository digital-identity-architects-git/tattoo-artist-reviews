// One-off generator: writes labeled placeholder WebP images into
// src/assets/img so every image slot the site expects is visible (and
// clearly marked as a TODO) until real artwork is dropped in.
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const BG = "#0a0a0b";
const PANEL = "#121214";
const LINE = "#2a2a2e";
const GOLD = "#c9a24b";
const GOLD_BRIGHT = "#e9cf85";
const TEXT_DIM = "#79746a";

const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function placeholder({ w, h, title, spec, path, round = false }) {
  const cx = w / 2;
  const titleSize = Math.round(Math.min(w, h) * (round ? 0.082 : 0.07));
  const specSize = Math.round(titleSize * 0.52);
  const pathSize = Math.round(titleSize * 0.42);
  const clip = round
    ? `<clipPath id="r"><circle cx="${cx}" cy="${h / 2}" r="${Math.min(w, h) / 2 - 6}"/></clipPath>`
    : "";
  const clipAttr = round ? ` clip-path="url(#r)"` : "";
  const frame = round
    ? `<circle cx="${cx}" cy="${h / 2}" r="${Math.min(w, h) / 2 - 8}" fill="none" stroke="${GOLD}" stroke-width="3"/>`
    : `<rect x="10" y="10" width="${w - 20}" height="${h - 20}" fill="none" stroke="${GOLD}" stroke-width="3" stroke-dasharray="14 10" rx="8"/>`;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${BG}"/>
      <stop offset="1" stop-color="${PANEL}"/>
    </linearGradient>
    ${clip}
  </defs>
  <g${clipAttr}>
    <rect width="${w}" height="${h}" fill="url(#g)"/>
    <rect width="${w}" height="${h}" fill="none" stroke="${LINE}" stroke-width="2"/>
  </g>
  ${frame}
  <g font-family="Georgia, 'Times New Roman', serif" text-anchor="middle">
    <text x="${cx}" y="${h / 2 - titleSize * 0.2}" fill="${GOLD_BRIGHT}" font-size="${titleSize}" font-weight="bold" letter-spacing="2">${esc(title)}</text>
    <text x="${cx}" y="${h / 2 + specSize * 1.4}" fill="${TEXT_DIM}" font-size="${specSize}">${esc(spec)}</text>
    <text x="${cx}" y="${h / 2 + specSize * 1.4 + pathSize * 1.7}" fill="${GOLD}" font-size="${pathSize}" font-family="monospace">${esc(path)}</text>
  </g>
</svg>`;
  return sharp(Buffer.from(svg)).webp({ quality: 82 });
}

const base = "src/assets/img";
await mkdir(`${base}/artists`, { recursive: true });
await mkdir(`${base}/blog`, { recursive: true });

const jobs = [
  {
    w: 1600, h: 600,
    title: "HEADER BANNER — REPLACE ME",
    spec: "Homepage hero · ~1600×600 · dark, high-contrast tattoo shot",
    path: "/assets/img/header-image.webp",
    out: `${base}/header-image.webp`,
  },
  {
    w: 600, h: 600, round: true,
    title: "PORTRAIT",
    spec: "Square · round-cropped on page",
    path: "artists/<artist-slug>.webp",
    out: `${base}/artists/_portrait-example.webp`,
  },
  {
    w: 1600, h: 700,
    title: "ARTIST HERO BACKDROP",
    spec: "Wide · faint backdrop behind a review",
    path: "artists/<artist-slug>-hero.webp",
    out: `${base}/artists/_hero-example.webp`,
  },
  {
    w: 800, h: 800,
    title: "GALLERY IMAGE",
    spec: "Square · one per piece of work (-1, -2, …)",
    path: "artists/<artist-slug>-1.webp",
    out: `${base}/artists/_gallery-example.webp`,
  },
  {
    w: 1200, h: 630,
    title: "BLOG CARD / SHARE IMAGE",
    spec: "1200×630 · optional per-post image",
    path: "blog/<slug>.webp",
    out: `${base}/blog/_blog-example.webp`,
  },
];

for (const j of jobs) {
  await placeholder(j).toFile(j.out);
  console.log("wrote", j.out);
}
