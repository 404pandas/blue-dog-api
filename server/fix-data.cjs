const fs = require("fs");
const path = require("path");

// ── Canonical name maps ──────────────────────────────────────────────────────

// Episode name corrections (wrong → canonical)
const EPISODE_FIX = {
  "Magic Xylophone":            "The Magic Xylophone",
  "Baby Race":                  "Babyrace",
  "Pass the Parcel":            "Pass The Parcel",
  "Mums and Dads":              "Mums And Dads",
  "Fruitbat":                   "Fruit Bat",
  "Fruitbat (cameo)":           "Fruit Bat",
  "Seesaw":                     "See Saw",
  "Mr. Monkeyjocks":            "Mr Monkey Jocks",
  "Mt. Mumanddad":              "Mount MumandDad",
  "Shaun the Sheep":            "Shaun",
  "Mentioned in Double Babysitter": "Double Babysitter",
  "Supermarket":                "Shops",
  "The Teacher":                "Calypso",
  "School":                     "Mum School",
  "Granny's Day Out":           "Granny Mobile",
  "Buddy's Mum":                "Pass The Parcel",
  "Honk":                       "Feather Wand",
};

// Character name corrections (wrong → canonical)
const CHAR_FIX = {
  "Bluey":           "Bluey Christine Heeler",
  "Bluey Heeler":    "Bluey Christine Heeler",
  "Bingo":           "Bingo Heeler",
  "Bandit":          "Bandit Custard Heeler",
  "Bandit Heeler":   "Bandit Custard Heeler",
  "Chilli":          "Chilli Heeler",
  "Mackenzie":       "Mackenzie Border Collie",
  "Stripe Heeler":   "Uncle Stripe",
  "Trixie Heeler":   "Aunt Trixie",
  "Muffin Heeler":   "Muffin",
  "Socks Heeler":    "Socks",
  "Bentley":         "Bently",           // duplicate entry, canonical is Bently
};

// friends string → proper array (for characters where friends was a string)
const FRIENDS_FIX = {
  "Snickers":       ["Bluey Christine Heeler", "Bingo Heeler"],
  "Chloe":          ["Bluey Christine Heeler", "Bingo Heeler", "Mackenzie Border Collie", "Indy", "Honey", "Rusty", "Coco", "Gruber"],
  "Chloe's Mum":    ["Bandit Custard Heeler", "Chilli Heeler", "Mackenzie's Dad", "Mackenzie's Mum", "Marcus", "Daisy"],
  "Frank":          ["Chilli Heeler", "Bandit Custard Heeler", "Mackenzie's Dad", "Mackenzie's Mum", "Marcus", "Daisy"],
  "Judo":           ["Bluey Christine Heeler", "Bingo Heeler"],
  "Jean Luc":       ["Bluey Christine Heeler", "Bandit Custard Heeler"],
  "The Terriers":   ["Bluey Christine Heeler", "Bingo Heeler"],
  "Socks":          ["Muffin", "Bluey Christine Heeler", "Bingo Heeler"],
  "Missy":          ["Bluey Christine Heeler", "Bingo Heeler"],
  "Buddy":          ["Bingo Heeler"],
  "Buddy's Mum":    ["Chilli Heeler", "Bandit Custard Heeler"],
  "Bull Terriers":  ["Surfer"],
  "Winton":         ["Bluey Christine Heeler", "Bingo Heeler"],
  "Uncle Stripe":   ["Bluey Christine Heeler", "Bingo Heeler"],
  "Aunt Trixie":    ["Chilli Heeler"],
  "Bently":         ["Bluey Christine Heeler", "Bingo Heeler"],
  "Nana":           ["Uncle Stripe", "Chilli Heeler"],
  "Bosco":          ["Frisky"],
  "Captain":        ["Mia", "Mackenzie Border Collie", "Bluey Christine Heeler"],
};
const FRIENDS_EMPTY = ["Bob Heeler", "Customer 2"]; // these should just be []

// ── Helpers ──────────────────────────────────────────────────────────────────

function fixEpisodeName(name) {
  if (!name) return name;
  return EPISODE_FIX[name] || name;
}

function fixCharName(name) {
  if (!name) return name;
  return CHAR_FIX[name] || name;
}

function fixEpisodeArray(arr) {
  if (!arr) return arr;
  return arr.map(fixEpisodeName);
}

function fixCharArray(arr) {
  if (!arr) return arr;
  return arr.map(fixCharName);
}

function fixFamily(family) {
  if (!family) return family;
  const f = { ...family };
  if (f.father) f.father = fixCharName(f.father);
  if (f.mother) f.mother = fixCharName(f.mother);
  if (f.sister) f.sister = fixCharName(f.sister);
  if (f.uncle)  f.uncle  = fixCharName(f.uncle);
  if (f.aunt)   f.aunt   = fixCharName(f.aunt);
  if (f.cousins)  f.cousins  = fixCharArray(f.cousins);
  if (f.children) f.children = fixCharArray(f.children);
  if (f.grandparents) {
    f.grandparents = { ...f.grandparents };
    if (f.grandparents.maternal) f.grandparents.maternal = fixCharArray(f.grandparents.maternal);
    if (f.grandparents.paternal) f.grandparents.paternal = fixCharArray(f.grandparents.paternal);
  }
  return f;
}

// ── Fix characters ────────────────────────────────────────────────────────────

const chars = JSON.parse(fs.readFileSync("characterSeeds.json", "utf8"));
const fixedChars = chars.map((c) => {
  const fixed = { ...c };

  // firstAppearance
  if (fixed.firstAppearance) {
    fixed.firstAppearance = fixEpisodeName(fixed.firstAppearance);
  }

  // notableEpisodes
  if (fixed.notableEpisodes) {
    fixed.notableEpisodes = fixEpisodeArray(fixed.notableEpisodes);
  }

  // family name refs
  if (fixed.family) {
    fixed.family = fixFamily(fixed.family);
  }

  // friends: fix string→array for known problem characters
  if (FRIENDS_FIX[c.characterName] !== undefined) {
    fixed.friends = FRIENDS_FIX[c.characterName];
  } else if (FRIENDS_EMPTY.includes(c.characterName)) {
    fixed.friends = [];
  } else if (typeof fixed.friends === "string") {
    // fallback: split by comma for any remaining string friends
    fixed.friends = fixed.friends.split(",").map((s) => s.trim()).filter(Boolean);
  }

  return fixed;
});

fs.writeFileSync("characterSeeds.json", JSON.stringify(fixedChars, null, 2));
console.log("✓ characterSeeds.json fixed");

// ── Fix locations ─────────────────────────────────────────────────────────────

const locs = JSON.parse(fs.readFileSync("locationSeeds.json", "utf8"));
const fixedLocs = locs.map((loc) => {
  const fixed = { ...loc };

  // appearances: comma-separated episode names
  if (fixed.appearances) {
    const names = fixed.appearances.split(",").map((s) => s.trim()).filter(Boolean);
    fixed.appearances = names.map(fixEpisodeName).join(", ");
  }

  // inhabitants: comma-separated character names
  if (fixed.inhabitants) {
    const names = fixed.inhabitants.split(",").map((s) => s.trim()).filter(Boolean);
    fixed.inhabitants = names.map(fixCharName).join(", ");
  }

  return fixed;
});

fs.writeFileSync("locationSeeds.json", JSON.stringify(fixedLocs, null, 2));
console.log("✓ locationSeeds.json fixed");

// ── Report remaining mismatches ───────────────────────────────────────────────

const episodes = JSON.parse(fs.readFileSync("episodeSeeds.json", "utf8"));
const epNames  = new Set(episodes.map((e) => e.episodeName));
const charNames = new Set(fixedChars.map((c) => c.characterName));

console.log("\n── Remaining firstAppearance mismatches (no episode entry): ──");
for (const c of fixedChars) {
  if (c.firstAppearance && !epNames.has(c.firstAppearance)) {
    console.log(`  ${c.characterName}: "${c.firstAppearance}"`);
  }
}

console.log("\n── Remaining notableEpisode mismatches (no episode entry): ──");
for (const c of fixedChars) {
  for (const ep of (c.notableEpisodes || [])) {
    if (!epNames.has(ep)) console.log(`  ${c.characterName}: "${ep}"`);
  }
}

console.log("\n── Remaining location appearance mismatches: ──");
for (const loc of fixedLocs) {
  if (!loc.appearances) continue;
  for (const name of loc.appearances.split(",").map((s) => s.trim())) {
    if (!epNames.has(name)) console.log(`  ${loc.locationName}: "${name}"`);
  }
}

console.log("\n── Remaining location inhabitant mismatches (no char entry): ──");
for (const loc of fixedLocs) {
  if (!loc.inhabitants) continue;
  for (const name of loc.inhabitants.split(",").map((s) => s.trim())) {
    if (!charNames.has(name)) console.log(`  ${loc.locationName}: "${name}"`);
  }
}
