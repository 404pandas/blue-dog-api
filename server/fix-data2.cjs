const fs = require("fs");

const episodes = JSON.parse(fs.readFileSync("episodeSeeds.json", "utf8"));
const epNames = new Set(episodes.map((e) => e.episodeName));

// ── Characters: null out firstAppearance/notableEpisodes with no DB match ────
const chars = JSON.parse(fs.readFileSync("characterSeeds.json", "utf8"));
let charFixes = 0;
const fixedChars = chars.map((c) => {
  const fixed = { ...c };

  if (fixed.firstAppearance && !epNames.has(fixed.firstAppearance)) {
    console.log(`  CLEAR firstAppearance "${fixed.firstAppearance}" for ${c.characterName}`);
    delete fixed.firstAppearance;
    charFixes++;
  }

  if (fixed.notableEpisodes) {
    const before = fixed.notableEpisodes.length;
    fixed.notableEpisodes = fixed.notableEpisodes.filter((ep) => {
      if (!epNames.has(ep)) {
        console.log(`  REMOVE notableEpisode "${ep}" for ${c.characterName}`);
        return false;
      }
      return true;
    });
    charFixes += before - fixed.notableEpisodes.length;
  }

  return fixed;
});

fs.writeFileSync("characterSeeds.json", JSON.stringify(fixedChars, null, 2));
console.log(`\n✓ characterSeeds.json — removed ${charFixes} broken episode references`);
