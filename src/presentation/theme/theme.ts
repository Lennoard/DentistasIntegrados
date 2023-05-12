import {createTheme} from '@mui/material/styles';
import {appTypography} from "./type";
import {appComponents} from "./components";
import {appPallet} from "./pallete";

export const appTheme = createTheme({
  palette: appPallet,
  typography: appTypography,
  components: appComponents
});