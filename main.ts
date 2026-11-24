// Break Production, Own It — batch3 entry (breakprod)
// No rollback plan was harmed; there never was one.
// Writes the outage line to the output dir exactly as graded:
// clears the CONTENTS of the output dir (never the dir itself,
// which is a mount point), then writes entry.txt with no
// trailing newline.

import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The excuse, verbatim from the incident channel at 17:04.
const OUTAGE_LINE =
  "FATAL: I deployed at 16:59 on a Friday because all 4,000 tests passed locally. 'Locally' is doing a lot of heavy lifting in that sentence. So is 'passed.'";

function outputDir(): string {
  return process.env.OUTPUT_DIR ?? "/output";
}

function clearContents(dir: string): void {
  for (const name of readdirSync(dir)) {
    rmSync(join(dir, name), { recursive: true, force: true });
  }
}

function main(): void {
  const dir = outputDir();
  mkdirSync(dir, { recursive: true });
  clearContents(dir);
  writeFileSync(join(dir, "entry.txt"), OUTAGE_LINE, "utf8");
}

main();
