import {PaletteOptions, SimplePaletteColorOptions} from "@mui/material/styles/createPalette";

export const appPallet: PaletteOptions = {
  primary: {
    main: "#0074DA",
    light: "#0094FC",
    dark: "#0144A9",
  },
  secondary: {
    main: "#0086ED",
    light: "#35A4FD",
    dark: "#0163C8",
  }
}

export const primaryMain = (appPallet.primary as SimplePaletteColorOptions).main
export const primaryDark = (appPallet.primary as SimplePaletteColorOptions).dark
export const primaryLight = (appPallet.primary as SimplePaletteColorOptions).light

export const secondaryMain = (appPallet.secondary as SimplePaletteColorOptions).main
export const secondaryDark = (appPallet.secondary as SimplePaletteColorOptions).dark
export const secondaryLight = (appPallet.secondary as SimplePaletteColorOptions).light
