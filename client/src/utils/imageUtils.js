// Eagerly imports every image from the assets folder so components can
// look up DB-stored paths (e.g. "assets/images/characters/bluey.webp")
// at runtime without per-file static imports.
//
// `import: 'default'` tells Vite to pull only the default export (the
// resolved URL string) for each asset, so values are plain strings —
// no need for `.default` unwrapping.
const allImages = import.meta.glob(
  "../assets/images/**/*.{webp,png,jpg}",
  { eager: true, import: "default" }
);

/**
 * Resolves a DB image path to a Vite-bundled URL.
 * @param {string|undefined} dbPath  e.g. "assets/images/characters/bluey.webp"
 * @returns {string|null}
 */
export function getImageSrc(dbPath) {
  if (!dbPath) return null;
  const url = allImages[`../${dbPath}`];
  return typeof url === "string" ? url : null;
}
