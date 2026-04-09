const fs = require("fs");

const chars = JSON.parse(fs.readFileSync("characterSeeds.json", "utf8"));

// Normalize curly apostrophe → straight apostrophe everywhere
const normalize = (s) => s.replace(/\u2019/g, "'");

// Short-name → canonical DB name fixes
const NAME_FIX = {
  "Bluey":           "Bluey Christine Heeler",
  "Bluey Heeler":    "Bluey Christine Heeler",
  "Bingo":           "Bingo Heeler",
  "Bandit":          "Bandit Custard Heeler",
  "Bandit Heeler":   "Bandit Custard Heeler",
  "Chilli":          "Chilli Heeler",
  "Chilli Heeler":   "Chilli Heeler",
  "Mackenzie":       "Mackenzie Border Collie",
  "Jean-Luc":        "Jean Luc",
  "Stripe Heeler":   "Uncle Stripe",
  "Trixie Heeler":   "Aunt Trixie",
  "Muffin Heeler":   "Muffin",
  "Socks Heeler":    "Socks",
  "Bentley":         "Bently",
};

// Fix a single friend string
const fixFriend = (f) => {
  const n = normalize(f);
  return NAME_FIX[n] ?? n;
};

// Track duplicate character names — keep first occurrence only
const seenNames = new Set();
const deduped = [];
for (const c of chars) {
  if (seenNames.has(c.characterName)) {
    console.log(`REMOVING DUPLICATE: ${c.characterName}`);
    continue;
  }
  seenNames.add(c.characterName);
  deduped.push(c);
}

// Fix friends in every character
const fixed = deduped.map((c) => {
  const out = { ...c };

  if (!out.friends) {
    out.friends = [];
  } else if (!Array.isArray(out.friends)) {
    // String → split by comma
    out.friends = out.friends.split(",").map((s) => s.trim()).filter(Boolean);
  }

  // Fix individual friend names
  out.friends = out.friends
    .map(fixFriend)
    .filter((f) => {
      // Remove generic non-linkable strings
      const generic = [
        "Other children from school",
        "Other family members",
        "Other kids in the neighborhood",
        "Other neighborhood pups",
        "Unknown – no established close friends in the show",
        "None known yet",
        "No known friends.",
      ];
      return !generic.includes(f);
    });

  return out;
});

fs.writeFileSync("characterSeeds.json", JSON.stringify(fixed, null, 2));

// ── Verify ───────────────────────────────────────────────────────────────────
const charNames = new Set(fixed.map((c) => c.characterName));
let remaining = 0;
for (const c of fixed) {
  for (const f of c.friends) {
    if (!charNames.has(f)) {
      console.log(`STILL UNRESOLVED: ${c.characterName} -> "${f}"`);
      remaining++;
    }
  }
}

console.log(`\n✓ characterSeeds.json — duplicates removed, friends fixed`);
console.log(`  ${remaining} friends reference minor characters not in the DB (expected)`);
