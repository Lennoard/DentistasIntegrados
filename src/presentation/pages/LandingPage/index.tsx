import { Box, Button, Container, Typography } from "@mui/material";
import { primaryDark } from "../../theme/pallete";
import { useNavigate } from "react-router-dom";

export default function LandingPage(): JSX.Element {
  const navigate = useNavigate();
  
  return (
    <Container>
      <Box
        sx={{
          height: "100vh",
          flexDirection: "column",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography className="moving-text" variant="h1" color={primaryDark}>
          Página inicial!
        </Typography>
        <Typography className="moving-text" variant="subtitle1">
          Em andamento!
        </Typography>

        <Button onClick={() => navigate("/login") }  className="moving-text" sx={{ m: 8 }} variant="contained">Fazer login</Button>
      </Box>
    </Container>
  );
}
