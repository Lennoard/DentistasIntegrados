import React from "react";
import "./presentation/css/global.css";
import { ThemeProvider } from "@mui/material/styles";
import { appTheme } from "./presentation/theme/theme";
import { AppRoutes } from "./router";

function App(): JSX.Element {
  return (
    <ThemeProvider theme={appTheme}>
      <AppRoutes />
    </ThemeProvider>
  );
}

export default App;
