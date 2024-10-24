import {
  formatAltForIcon,
  getLocalStorageAuthToken,
  setLocalStorageAuthToken,
} from "./utils";

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

  test("handles empty string input", () => {
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

describe("Local Storage Auth Token Functions", () => {
  beforeEach(() => {
    // Réinitialiser le localStorage avant chaque test
    localStorage.clear();
  });

  test("sets token in localStorage when a valid token is provided", () => {
    const token = "my-secret-token";
    setLocalStorageAuthToken(token);

    // Vérifier que le token est bien stocké dans le localStorage
    expect(localStorage.getItem("authToken")).toBe(JSON.stringify(token));
  });

  test("removes token from localStorage when null is provided", () => {
    const token = "my-secret-token";
    setLocalStorageAuthToken(token); // d'abord, nous définissons un token

    // S'assurer que le token est défini
    expect(localStorage.getItem("authToken")).toBe(JSON.stringify(token));

    // Ensuite, nous supprimons le token
    setLocalStorageAuthToken(null);

    // Vérifier que le token a été supprimé
    expect(localStorage.getItem("authToken")).toBeNull();
  });

  test("retrieves the token from localStorage", () => {
    const token = "my-secret-token";
    localStorage.setItem("authToken", JSON.stringify(token));
    const retrievedToken = getLocalStorageAuthToken();

    // Vérifier que le token est correctement récupéré
    expect(retrievedToken).toBe(token);
  });

  test("returns null when there is no token in localStorage", () => {
    const retrievedToken = getLocalStorageAuthToken();

    // Vérifier que null est retourné lorsqu'aucun token n'est présent
    expect(retrievedToken).toBeNull();
  });
});
