import {Components} from "@mui/material/styles/components";
import {Theme} from "@mui/material/styles/createTheme";
import {primaryDark, primaryMain} from "./pallete";

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