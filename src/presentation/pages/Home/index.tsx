import { Box, Container, Typography } from "@mui/material";
import { primaryDark } from "../../theme/pallete";

export default function Home(): JSX.Element {
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
          Home!
        </Typography>
        <Typography className="moving-text" variant="subtitle1">
          Em andamento!
        </Typography>
      </Box>
    </Container>
  );
}
