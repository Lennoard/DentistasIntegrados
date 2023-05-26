import "./presentation/css/global.css";
import { ThemeProvider } from "@mui/material/styles";
import { appTheme } from "./presentation/theme/theme";
import { AppRoutes } from "./router";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

function App(): JSX.Element {
  return (
    <ThemeProvider theme={appTheme}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <AppRoutes />
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
