export const formatAltForIcon = (icon: string): string => {
  const parts = icon.split("-");
  const formattedName = parts[1] || parts[0] || "Undefined";

  return `${
    formattedName.charAt(0).toUpperCase() + formattedName.slice(1)
  } icon`;
};

export const setLocalStorageAuthToken = (token: string): void =>
  localStorage.setItem("authToken", JSON.stringify(token));

export function getLocalStorageAuthToken(): string | null {
  const token = localStorage.getItem("authToken");
  return token ? JSON.parse(token) : null;
}
