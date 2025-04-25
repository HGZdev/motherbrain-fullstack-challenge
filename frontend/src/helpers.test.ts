import { describe, test, expect } from "vitest";
import { debounce } from "./helpers";

describe("debounce", () => {
  test("should debounce a function", () => {
    let counter = 0;
    const increment = () => counter++;
    const debouncedIncrement = debounce(increment, 100);

    debouncedIncrement();
    debouncedIncrement();
    debouncedIncrement();

    expect(counter).toBe(0);
  });
  test("should call the function after the specified delay", async () => {
    let counter = 0;
    const increment = () => counter++;
    const debouncedIncrement = debounce(increment, 100);

    debouncedIncrement();

    await new Promise((resolve) => setTimeout(resolve, 150));

    expect(counter).toBe(1);
  });
  test("should call the function only once if called multiple times within the delay", async () => {
    let counter = 0;
    const increment = () => counter++;
    const debouncedIncrement = debounce(increment, 100);

    debouncedIncrement();
    debouncedIncrement();
    debouncedIncrement();

    await new Promise((resolve) => setTimeout(resolve, 150));

    expect(counter).toBe(1);
  });
});
