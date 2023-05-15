import React from "react";
import "./presentation/css/App.css";
import { ThemeProvider } from "@mui/material/styles";
import { appTheme } from "./presentation/theme/theme";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

function App(): JSX.Element {
  return (
    <ThemeProvider theme={appTheme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
