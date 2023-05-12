import {Components} from "@mui/material/styles/components";
import {Theme} from "@mui/material/styles/createTheme";
import {appPallet} from "./pallete";
import {SimplePaletteColorOptions} from "@mui/material/styles/createPalette";

const primaryMain = (appPallet.primary as SimplePaletteColorOptions).main
const primaryDark = (appPallet.primary as SimplePaletteColorOptions).dark

export const appComponents: Components<Omit<Theme, 'components'>> = {
  MuiButton: {
    styleOverrides: {
      root: {
        textTransform: "none",
        borderRadius: "24px",
      },
      contained: {
        background: `linear-gradient(to right, ${primaryDark}, ${primaryMain})`
      },
      outlined: {
        borderColor: primaryDark,
        color: primaryDark
      },
      text: {
        color: primaryDark
      }
    }
  }
}