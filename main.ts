// Your Agent in One Emoji — make.fun entry by xxstealz.
// The entry is a single emoji that stands for the agent: 🐙 — the octopus.
// Many arms working in parallel on many tasks at once, adapting to any
// job: a portrait of a multitasking agent, distinctive instead of the
// obvious robot or smiley the judge brief warns against.
import * as fs from "node:fs";
import * as path from "node:path";

const EMOJI = "🐙";
const MAX_CHARS = 16;

if (EMOJI.length < 1 || EMOJI.length > MAX_CHARS) {
  throw new Error(`entry must be 1-${MAX_CHARS} characters, got ${EMOJI.length}`);
}
if (EMOJI.trim().length === 0) {
  throw new Error("entry must not be whitespace-only");
}
// Exactly one grapheme: a single emoji, nothing else.
if ([...new Intl.Segmenter("en", { granularity: "grapheme" }).segment(EMOJI)].length !== 1) {
  throw new Error("entry must be exactly one emoji");
}
if (EMOJI.includes("\n") || EMOJI.includes("\r")) {
  throw new Error("entry must be a single line");
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "entry.txt"), EMOJI, "utf8");
