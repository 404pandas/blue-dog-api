// Eagerly load all images from the assets folder at build time.
const globResults = import.meta.glob(
  "../assets/images/**/*.{webp,png,jpg}",
  { eager: true, import: "default" }
);

// Build a lookup keyed by the "assets/images/..." portion of the path,
// so we match regardless of what prefix the DB stores (./src/, /src/, bare, etc.)
const byAssetPath = {};
for (const [key, url] of Object.entries(globResults)) {
  // key looks like: "../assets/images/characters/bluey.webp"
  const match = key.match(/assets\/images\/.+/);
  if (match) byAssetPath[match[0]] = url;
}

if (import.meta.env.DEV) {
  console.log("[imageUtils] loaded", Object.keys(byAssetPath).length, "images");
  console.log("[imageUtils] sample keys:", Object.keys(byAssetPath).slice(0, 3));
}

/**
 * Resolves a DB image path to a Vite-bundled URL.
 * Handles any prefix the DB path might have (./src/, /src/, bare assets/, etc.)
 * @param {string|undefined} dbPath
 * @returns {string|null}
 */
export function getImageSrc(dbPath) {
  if (!dbPath) return null;

  // Extract just the "assets/images/..." portion from whatever format is stored
  const match = dbPath.match(/assets\/images\/.+/);
  if (!match) return null;

  const url = byAssetPath[match[0]];

  if (import.meta.env.DEV && !url) {
    console.warn("[imageUtils] no match for:", dbPath, "→ looked up:", match[0]);
  }

  return typeof url === "string" ? url : null;
}
