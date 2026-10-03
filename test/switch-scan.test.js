import { test } from "node:test";
import assert from "node:assert";

test("module loads", async () => {
  const mod = await import("../src/switch-scan.js");
  assert.equal(typeof mod.startScanning, "function");
});
