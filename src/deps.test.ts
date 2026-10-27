import { describe, expect, test } from "vitest";
import { readFileSync } from "node:fs";

function installedVersion(name: string): string {
  const pkgPath = new URL(`../node_modules/${name}/package.json`, import.meta.url);
  return (JSON.parse(readFileSync(pkgPath, "utf8")) as { version: string }).version;
}

function major(version: string): number {
  return Number(version.split(".")[0]);
}

describe("dependency security bumps", () => {
  test("zod is installed at the CVE-fixed major version (4.x)", () => {
    expect(major(installedVersion("zod"))).toBeGreaterThanOrEqual(4);
  });
  test("vite is installed at the CVE-fixed major version (8.x)", () => {
    expect(major(installedVersion("vite"))).toBeGreaterThanOrEqual(8);
  });
});
