import { TypographyOptions } from "@mui/material/styles/createTypography";
import { Palette } from "@mui/material/styles/createPalette";

export const appTypography:
  | TypographyOptions
  | ((palette: Palette) => TypographyOptions) = {
  h1: {
    fontFamily: "Work Sans",
    fontSize: 61,
    fontWeight: 700,
  },
  h2: {
    fontFamily: "Work Sans",
    fontSize: 49,
    fontWeight: 700,
  },
  h3: {
    fontFamily: "Work Sans",
    fontSize: 39,
    fontWeight: 700,
  },
  h4: {
    fontFamily: "Work Sans",
    fontSize: 31,
    fontWeight: 700,
  },
  h5: {
    fontFamily: "Work Sans",
    fontSize: 25,
    fontWeight: 600,
  },
  h6: {
    fontFamily: "Work Sans",
    fontSize: 20,
    fontWeight: 600,
  },
  subtitle1: {
    fontFamily: "Urbanist",
    fontSize: 18,
    fontWeight: 500,
  },
  subtitle2: {
    fontFamily: "Urbanist",
    fontSize: 16,
    fontWeight: 400,
  },
  body1: {
    fontFamily: "Urbanist",
    fontSize: 16,
    fontWeight: 500,
  },
  body2: {
    fontFamily: "Urbanist",
    fontSize: 15,
    fontWeight: 400,
  },
  button: {
    fontFamily: "Urbanist",
    fontSize: 15,
    fontWeight: 600,
  },
};
