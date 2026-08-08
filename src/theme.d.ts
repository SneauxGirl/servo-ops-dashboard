import type { PaletteColor, PaletteColorOptions } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    purple: PaletteColor;
  }

  interface PaletteOptions {
    purple?: PaletteColorOptions;
  }
}

declare module "@mui/material/Chip" {
  interface ChipPropsColorOverrides {
    purple: true;
  }
}

declare module "@mui/material/LinearProgress" {
  interface LinearProgressPropsColorOverrides {
    purple: true;
  }
}

export {};
