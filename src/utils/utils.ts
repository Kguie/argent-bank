export const formatAltForIcon = (icon: string) => {
  const parts = icon.split("-");
  const formattedName = parts[1] || parts[0] || "Undefined";

  return `${
    formattedName.charAt(0).toUpperCase() + formattedName.slice(1)
  } icon`;
};
