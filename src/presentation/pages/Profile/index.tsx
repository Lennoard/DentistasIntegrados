import { Button, Container, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AppDrawer from "../../components/AppDrawer";

export default function Profile(): JSX.Element {
  const navigate = useNavigate();

  return (
    <AppDrawer title="Perfil" selectedIndex={1}>
      <Container>
        <Grid container spacing={4} rowSpacing={3}>
          <Grid item xs={12}>
            <Typography variant="h6">Perfil</Typography>
            <Typography className="moving-text" variant="subtitle1">
              Em andamento!
            </Typography>

            <Button
              size="large"
              variant="contained"
              sx={{ marginTop: "48px" }}
              onClick={() => {
                navigate("/perfil/editar");
              }}
            >
              Editar perfil
            </Button>
          </Grid>
        </Grid>
      </Container>
    </AppDrawer>
  );
}
