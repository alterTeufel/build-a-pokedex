import { expect, test } from "vitest";
import { Cache } from "./pokecache.js";

test.concurrent.each([
  {
    key: "https://example.com",
    val: "testdata",
    interval: 500,
  },
  {
    key: "https://example.com/path",
    val: "moretestdata",
    interval: 1000,
  },
])("expires entries after $interval ms", async ({ key, val, interval }) => {
  const cache = new Cache(interval);

  try {
    cache.add(key, val);
    expect(cache.get(key)).toBe(val);

    await new Promise((resolve) => setTimeout(resolve, interval * 2));
    expect(cache.get(key)).toBeUndefined();
  } finally {
    cache.stopReapLoop();
  }
});
