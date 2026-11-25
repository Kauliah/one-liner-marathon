import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The joke: one line, one setup, one turn. Therapy billed by the hour meets
// the language of the office — the punchline is the patient optimising the
// wrong thing.
const JOKE =
  "My therapist charges by the hour, so now I cry in bullet points.";

const MAX_CHARS = 280;

function checkLine(line: string): void {
  if (line.length < 1) {
    throw new Error("The joke must not be empty");
  }
  if (line.length > MAX_CHARS) {
    throw new Error(
      `The joke is ${line.length} characters, over the ${MAX_CHARS} limit`,
    );
  }
  if (line.trim() !== line) {
    throw new Error("The joke must not start or end with whitespace");
  }
  if (/[\r\n]/.test(line)) {
    throw new Error("The joke must be a single line with no line breaks");
  }
}

function main(): void {
  checkLine(JOKE);
  const dir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(dir, { recursive: true });
  const target = join(dir, "entry.txt");
  writeFileSync(target, JOKE, "utf8");
  console.log(`Wrote ${JOKE.length}-character one-liner to ${target}`);
}

main();
