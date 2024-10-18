export const formatAltForIcon = (icon: string) =>
  `${
    icon.split("-")[1].charAt(0).toUpperCase() + icon.split("-")[1].slice(1)
  } icon`;
