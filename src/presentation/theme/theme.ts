import { createTheme } from "@mui/material/styles";
import { appTypography } from "./type";
import { appComponents } from "./components";
import { appPallet } from "./pallete";

export const appTheme = createTheme({
  palette: appPallet,
  typography: appTypography,
  components: appComponents,
});

export const dialogStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  borderRadius: "16px",
  width: "30%",
  minWidth: "400px",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
