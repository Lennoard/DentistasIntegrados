import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import { primaryDark } from "../../theme/pallete";
import { useNavigate } from "react-router-dom";

export default function SignUp(): JSX.Element {
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
          Cadastro!
        </Typography>
        <Typography className="moving-text" variant="subtitle1">
          Em andamento!
        </Typography>
      </Box>
    </Container>
  );
}
