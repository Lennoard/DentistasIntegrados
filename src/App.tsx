import React from "react";
import "./presentation/css/App.css";
import {ThemeProvider} from "@mui/material/styles";
import {appTheme} from "./presentation/theme/theme";
import {Button, Typography} from "@mui/material";

function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <Button variant="text">Hello World</Button>
      <Button variant="outlined">Hello World</Button>
      <Button variant="contained">Hello World</Button>

      <Typography variant="h1">Headline 1</Typography>
      <Typography variant="h2">Headline 2</Typography>
      <Typography variant="h3">Headline 3</Typography>
      <Typography variant="h4">Headline 4</Typography>
      <Typography variant="h5">Headline 5</Typography>
      <Typography variant="h6">Headline 6</Typography>
      <Typography variant="subtitle1">Subtitle 1</Typography>
      <Typography variant="subtitle2">Subtitle 2</Typography>
      <Typography variant="body1">Body 1: Lorem ipsum dolor</Typography>
      <Typography variant="body2">
        Body 2: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
        aliquet imperdiet turpis. Praesent consectetur ullamcorper neque.
        Vestibulum eget velit et ipsum finibus consequat. Integer et elit magna.
        Vivamus vulputate felis varius condimentum sollicitudin. Morbi eu turpis
        vitae magna dapibus pretium quis at odio. Morbi non quam a odio
        tincidunt ullamcorper in ut leo. Pellentesque lacinia semper tortor.
      </Typography>
    </ThemeProvider>
  );
}

export default App;
