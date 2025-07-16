export const platformShortName = (platform: string) => {
  switch (platform) {
    case "PlayStation 5":
      return "PS5";
    case "PlayStation 4":
      return "PS4";
    case "PlayStation 3":
      return "PS3";
    case "PlayStation 2":
      return "PS2";
    case "PlayStation":
      return "PS1";
    case "PlayStation Portable":
      return "PSP";
    case "Xbox Series S/X":
      return "XSX";
    case "Xbox One":
      return "XBO";
    case "Nintendo Switch":
      return "Switch";
    case "Nintendo 3DS":
      return "3DS";
    case "Nintendo DS":
      return "DS";
    case "Nintendo Wii U":
      return "Wii U";
    case "Nintendo Wii":
      return "Wii";
    case "Nintendo GameCube":
      return "GameCube";
    case "Nintendo 64":
      return "N64";
    case "PC (Microsoft Windows)":
      return "PC";
    case "iOS":
      return "iOS";
    default:
      return platform;
  }
};
