import { copyFileSync, existsSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// The grader sets MAKEFUN_OUTPUT_DIR; fall back to /output when it is unset.
const outDir = process.env.MAKEFUN_OUTPUT_DIR?.trim() || "/output";
mkdirSync(outDir, { recursive: true });

const here = dirname(fileURLToPath(import.meta.url));
const src = join(here, "entry.png");
if (!existsSync(src)) {
  throw new Error("entry.png not found next to main.ts");
}
const dest = join(outDir, "entry.png");
copyFileSync(src, dest);

// A straight copy must be byte-identical; fail loudly if it is not.
if (statSync(dest).size !== statSync(src).size) {
  throw new Error("entry.png copy size mismatch");
}
