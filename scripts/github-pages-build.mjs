import { spawnSync } from "node:child_process";
import { existsSync, renameSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const middlewarePath = path.join(rootDir, "middleware.ts");
const middlewareBackup = path.join(rootDir, "middleware.ts.github-pages-bak");

function run(command, args) {
  const result = spawnSync(command, args, {
    cwd: rootDir,
    stdio: "inherit",
    shell: process.platform === "win32",
    env: {
      ...process.env,
      GITHUB_PAGES: "true",
      NEXT_PUBLIC_SITE_URL:
        process.env.NEXT_PUBLIC_SITE_URL ??
        "https://ahmadiftme8.github.io/fateme-ahmadi",
      NEXT_PUBLIC_BASE_PATH: process.env.NEXT_PUBLIC_BASE_PATH ?? "/fateme-ahmadi",
    },
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

function disableStaticExportBlockers() {
  if (existsSync(middlewarePath)) {
    renameSync(middlewarePath, middlewareBackup);
  }
}

function restoreStaticExportBlockers() {
  if (existsSync(middlewareBackup)) {
    renameSync(middlewareBackup, middlewarePath);
  }
}

disableStaticExportBlockers();

try {
  run("pnpm", ["run", "prebuild"]);
  run("pnpm", ["exec", "next", "build"]);

  const noJekyllPath = path.join(rootDir, "out", ".nojekyll");
  writeFileSync(noJekyllPath, "");
  console.log("Created out/.nojekyll");
} finally {
  restoreStaticExportBlockers();
}
