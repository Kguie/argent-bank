import { formatAltForIcon } from "./utils"; // Modifier selon le chemin réel de la fonction

describe("formatAltForIcon", () => {
  test("formats icon name with capitalized second part", () => {
    const result = formatAltForIcon("icon-test");
    expect(result).toBe("Test icon");
  });

  test("returns correct alt text when icon has multiple dashes", () => {
    const result = formatAltForIcon("icon-sample-icon");
    expect(result).toBe("Sample icon");
  });

  test("handles single-word icon names correctly", () => {
    const result = formatAltForIcon("icon");
    expect(result).toBe("Icon icon");
  });

  test("handles empty string input gracefully", () => {
    const result = formatAltForIcon("");
    expect(result).toBe("Undefined icon");
  });

  test("handles unexpected format (without dashes) correctly", () => {
    const result = formatAltForIcon("testicon");
    expect(result).toBe("Testicon icon");
  });

  test("handles special characters in icon names correctly", () => {
    const result = formatAltForIcon("icon-te$t");
    expect(result).toBe("Te$t icon");
  });
});
