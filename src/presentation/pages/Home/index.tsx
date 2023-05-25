import { Container, Grid, Typography } from "@mui/material";
import AppDrawer from "../../components/AppDrawer";

export default function Home(): JSX.Element {
  return (
    <AppDrawer title="Home" selectedIndex={0}>
      <Container>
        <Grid container spacing={4} rowSpacing={3}>
          <Grid item xs={12}>
            <Typography variant="h6">Home</Typography>
            <Typography className="moving-text" variant="subtitle1">
              Em andamento!
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </AppDrawer>
  );
}
