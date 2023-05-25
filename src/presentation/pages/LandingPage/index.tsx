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
import FormatQuoteRoundedIcon from "@mui/icons-material/FormatQuoteRounded";
import PlaceRoundedIcon from "@mui/icons-material/PlaceRounded";
import { primaryDark } from "../../theme/pallete";
import flavio from "./images/flavio.png";
import nath from "./images/nathalia.png";
import fred from "./images/fred.png";
import logo from "./images/logo2.jpeg";

export default function LandingPage(): JSX.Element {
  document.body.style.background = "#e9e9e9";

  return (
    <Container disableGutters>
      <Splash />
      <MeetOurProfessionals />
      <WhyChooseUs />
      <Feedbacks />
      <Footer />
    </Container>
  );
}

const Splash = (): JSX.Element => {
  const navigate = useNavigate();

  return (
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
        <Grid
          item
          xs={12}
          md={5}
          sx={{ marginTop: { xs: "240px", sm: "360px" } }}
        >
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
  );
};

const MeetOurProfessionals = (): JSX.Element => {
  return (
    <Grid container sx={{ backgroundColor: primaryDark }}>
      <Grid xs={12} p={4} display="flex" justifyContent="center">
        <Typography color="white" variant="h4" marginTop={2}>
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
  );
};

const WhyChooseUs = (): JSX.Element => {
  return (
    <Box className="l2">
      <Grid container spacing={2} p={8}>
        <Grid item xs={12}>
          <Typography
            textAlign="center"
            color={primaryDark}
            variant="h3"
            marginBottom={8}
          >
            Por que nos escolher?
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={3}>
          <Avatar
            src={logo}
            alt="Logomarca"
            sx={{
              display: { xs: "none", sm: "block" },
              width: "240px",
              height: "240px",
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={9}>
          <Typography
            variant="subtitle1"
            sx={{ margin: { xs: "8px", sm: "16px", md: "24px" } }}
          >
            Nossa clínica conta com uma equipe de especialistas que realiza um
            plano de tratamento integrado e multiprofissional visando atender às
            expectativas do paciente. Cada paciente é único, exigindo um
            atendimento voltado às suas necessidades específicas. Queremos que
            nossos pacientes estejam sempre sorrindo, por isso, nosso time está
            sempre disposto a receber você.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

const Feedbacks = (): JSX.Element => {
  return (
    <Grid container sx={{ backgroundColor: primaryDark }}>
      <Grid xs={12} p={4}>
        <Typography color="white" textAlign="center" variant="h4" marginTop={4}>
          Feedbacks
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
        <FormatQuoteRoundedIcon
          htmlColor="white"
          fontSize="large"
          sx={{ fontSize: "200px" }}
        />
        <Box
          height="270px"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Typography textAlign="justify" color="white" variant="subtitle1">
            Eu simplesmente amei! Além do atendimento excelente de todos os
            funcionários, Dra. Nathália trouxe o meu sorriso de volta. O
            tratamento realmente devolveu minha autoestima.
          </Typography>
          <Typography
            textAlign="center"
            color="white"
            variant="h5"
            marginTop="48px"
          >
            Camila Andrade
          </Typography>
        </Box>
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
        <FormatQuoteRoundedIcon
          htmlColor="white"
          fontSize="large"
          sx={{ fontSize: "200px" }}
        />
        <Box
          height="270px"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Typography textAlign="justify" color="white" variant="subtitle1">
            Excelentes profissionais! Me deixaram segura e foram super atenciosos
            no meu atendimento. Super indico para tratamento de canal, acredito
            que não tenha melhor!
          </Typography>
          <Typography
            textAlign="center"
            color="white"
            variant="h5"
            marginTop="48px"
          >
            Thaís Monteiro
          </Typography>
        </Box>
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
        <FormatQuoteRoundedIcon
          htmlColor="white"
          fontSize="large"
          sx={{ fontSize: "200px" }}
        />
        <Box
          height="270px"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Typography textAlign="justify" color="white" variant="subtitle1">
            Sou paciente há anos da clínica, posso dizer que são excelentes
            profissionais nos quais confio muito. Sempre fui muito bem atendido
            por todos.
          </Typography>
          <Typography
            textAlign="center"
            color="white"
            variant="h5"
            marginTop="48px"
          >
            Gladimar Pereira
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

const Footer = (): JSX.Element => {
  return (
    <Grid container padding={2} sx={{ backgroundColor: "white" }}>
      <Grid item xs={12} sm={6} display="flex" alignItems="center">
        <PhoneRoundedIcon fontSize="large" htmlColor={primaryDark} />
        <Typography marginLeft="8px" variant="h6">
          (86) 9 9582-2912
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} display="flex" alignItems="center">
        <PlaceRoundedIcon htmlColor={primaryDark} sx={{ fontSize: "64px" }} />
        <Typography marginLeft="24px" variant="h6">
          R. Marechal Hermes da Fonseca, 429/ 1º andar, Consultório 3 - Lourival
          Parente - Teresina/PI
        </Typography>
      </Grid>
    </Grid>
  );
};
