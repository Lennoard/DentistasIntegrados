import { Components } from "@mui/material/styles/components";
import { Theme } from "@mui/material/styles/createTheme";
import { primaryDark, primaryMain } from "./pallete";

export const appComponents: Components<Omit<Theme, "components">> = {
  MuiButton: {
    styleOverrides: {
      root: {
        textTransform: "none",
        borderRadius: "24px",
        "&.Mui-disabled": {
          background: "#E9E9E9",
          color: "#AEAEAE",
          cursor: "not-allowed!important"
        }
      },
      contained: {
        background: `linear-gradient(to right, ${primaryDark}, ${primaryMain})`,
      },
      outlined: {
        borderColor: "#E2F2FE",
        borderWidth: "2px",
        color: primaryDark,
      },
      text: {
        color: primaryDark,
      },
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        borderRadius: "32px",
        paddingLeft: "8px",
        paddingRight: "8px"
      },
    },
  },
};
