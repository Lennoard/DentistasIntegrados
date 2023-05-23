import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./style.css";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import { primaryDark } from "../../theme/pallete";
import flavio from "./images/flavio.png";
import nath from "./images/nathalia.png";
import fred from "./images/fred.png";

export default function LandingPage(): JSX.Element {
  const navigate = useNavigate();

  return (
    <Container disableGutters>
      <Box className="l1">
        <Grid
          container
          spacing={2}
          paddingY={4}
          sx={{ paddingX: { xs: 4, lg: 16 } }}
        >
          <Grid item xs={12} md={8}>
            <Typography color={primaryDark} variant="h3">
              Dentistas integrados
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            display="flex"
            alignItems="center"
            sx={{ justifyContent: { sm: "start", lg: "flex-end" } }}
          >
            <PhoneRoundedIcon htmlColor={primaryDark} />
            <Typography color={primaryDark} marginLeft="8px" variant="h6">
              (86) 9 9582-2912
            </Typography>
          </Grid>
          <Grid item xs={12} md={5} marginTop="360px">
            <Typography variant="h4">
              Cuidando do seu sorriso com excelência!
            </Typography>
            <Button
              size="large"
              variant="contained"
              sx={{ marginTop: "16px" }}
              onClick={() => {
                navigate("/nova-consulta");
              }}
            >
              Marque sua consulta
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Grid container sx={{ backgroundColor: primaryDark }}>
        <Grid xs={12} p={4} display="flex" justifyContent="center">
          <Typography color="white" variant="h4">
            Conheça nossos profissionais
          </Typography>
        </Grid>
        <Grid
          xs={12}
          sm={6}
          lg={4}
          p={4}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Avatar
            alt="Fred Remerson"
            src={fred}
            sx={{ width: "200px", height: "200px" }}
          />
          <Typography
            textAlign="center"
            color="white"
            variant="h5"
            marginTop="48px"
          >
            Dr. Fred Remerson
          </Typography>
          <Typography textAlign="center" color="white" variant="subtitle1">
            <ul>
              <li>Cirurgião-dentista</li>
              <li>Traumatologista</li>
              <li>Bucomaxilofacial</li>
              <li>Implantodontista</li>
            </ul>
          </Typography>
        </Grid>
        <Grid
          xs={12}
          sm={6}
          lg={4}
          p={4}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Avatar
            alt="Nathália Frade"
            src={nath}
            sx={{ width: "200px", height: "200px" }}
          />
          <Typography
            textAlign="center"
            color="white"
            variant="h5"
            marginTop="48px"
          >
            Dra. Nathália Frade
          </Typography>
          <Typography textAlign="center" color="white" variant="subtitle1">
            <ul>
              <li>Cirurgião-dentista</li>
              <li>Clínico geral</li>
              <li>Aperf. Periodontia</li>
              <li>Espec. Endodontia</li>
            </ul>
          </Typography>
        </Grid>
        <Grid
          xs={12}
          sm={6}
          lg={4}
          p={4}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Avatar
            alt="Flávio Rogério"
            src={flavio}
            sx={{ width: "200px", height: "200px" }}
          />
          <Typography
            textAlign="center"
            color="white"
            variant="h5"
            marginTop="48px"
          >
            Dr. Flávio Rogério
          </Typography>
          <Typography textAlign="center" color="white" variant="subtitle1">
            <ul>
              <li>Cirurgião-dentista</li>
              <li>Ortodontista</li>
              <li>Foco em ricketts e</li>
              <li>Straight-Wire</li>
            </ul>
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}
