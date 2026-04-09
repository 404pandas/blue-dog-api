// Eagerly imports every image from the assets folder so components can
// look up DB-stored paths (e.g. "assets/images/characters/bluey.webp")
// at runtime without per-file static imports.
const allImages = import.meta.glob(
  "../assets/images/**/*.{webp,png,jpg}",
  { eager: true }
);

/**
 * Resolves a DB image path to a Vite-bundled URL.
 * @param {string|undefined} dbPath  e.g. "assets/images/characters/bluey.webp"
 * @returns {string|null}
 */
export function getImageSrc(dbPath) {
  if (!dbPath) return null;
  const key = `../${dbPath}`;
  const mod = allImages[key];
  return mod?.default ?? null;
}
