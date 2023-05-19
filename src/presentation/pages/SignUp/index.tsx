import React, { useRef, useState } from "react";
import imagerySignIn from "./imagerySignIn.png";
import logo from "./../../images/logo.png";
import "./signin.css";
import {
  Box,
  Container,
  Grid,
  Snackbar,
  SnackbarCloseReason,
  TextField,
  Typography,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { primaryDark } from "../../theme/pallete";
import ToastMessage from "../../utils/ToastMessage";
import { useNavigate } from "react-router-dom";
import showLocalizedAuthError from "../../../utils/auth/AuthError";
import container from "../../../config/inversify.config";
import DomainTypes from "../../../domain/di/DomainTypes";
import CreateAccountUseCase from "../../../domain/usecases/CreateAccountUseCase";

const createAccountUseCase = container.get<CreateAccountUseCase>(DomainTypes.CreateAccountUseCase);
const HOME_ROUTE = "/home";

interface SignUpData {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export default function SignIn(): JSX.Element {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState<SignUpData>({
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });
  const [toast, setToast] = useState<ToastMessage>({
    showing: false,
    message: "Falha ao realizar cadastro",
  });
  const [loading, setLoading] = useState(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const confirmPassRef = useRef<HTMLInputElement>(null);

  const handleToastClose = (
    _: Event | React.SyntheticEvent<any, Event>,
    reason: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") return;
    setToast({ ...toast, showing: false });
  };

  const handleSignUpClick = async (
    e: React.MouseEvent<HTMLButtonElement> | null
  ) => {
    e?.preventDefault();
    const pass = credentials.password;
    const pass2 = credentials.passwordConfirmation;

    if (pass !== pass2) {
      setToast({ showing: true, message: "As senhas não correspondem" });
      return;
    }

    setLoading(true);

    const user = await performUserCreation(credentials.name, credentials.email, pass);

    if (user) {
      setLoading(false);
      navigate(HOME_ROUTE);
    } else {
      setToast({
        showing: true,
        message: "Falha ao criar usuário",
      });
    }
  };

  const performUserCreation = async (name: string, email: string, password: string) => {
    try {
      const user = await createAccountUseCase.execute(
        name,
        email,
        password
      );
      return user;
    } catch (error: any) {
      setToast({
        showing: true,
        message: showLocalizedAuthError(error.message),
      });
      setLoading(false);
      return null;
    }
  };

  return (
    <Container fixed disableGutters={true}>
      <Grid container rowSpacing={1} columnSpacing={4}>
        <Grid
          id="left"
          item
          sm={12}
          md={6}
          display={{
            md: "flex!important",
            sm: "none!important",
            xs: "none!important",
          }}
        >
          <Box display="flex" flexDirection="row" alignItems="center" >
            <Typography
              marginY="16px"
              variant="h5"
              color={primaryDark}
              marginRight="8px"
            >
              Dentistas Integrados
            </Typography>
            <img width="50px" height="52px" src={logo} alt="Logo" />
          </Box>
          <img id="app-logo" src={imagerySignIn} alt="Ilustração" />
        </Grid>
        <Grid
          id="right"
          item
          xs={12}
          sm={12}
          md={6}
          paddingX={{ lg: "100px!important" }}
        >
          <Box
            flexDirection="row"
            justifyContent="center"
            alignItems="center" 
            display={{
              md: "none!important",
              sm: "flex!important",
              xs: "flex!important",
            }}
          >
            <Typography
              marginY="16px"
              variant="h5"
              color={primaryDark}
              marginRight="8px"
            >
              Dentistas Integrados
            </Typography>
            <img width="48px" height="55px" src={logo} alt="Logo" />
          </Box>

          <Typography marginTop="16px" variant="h1" textAlign="center">
            Cadastro
          </Typography>

          <Box display="flex" flexDirection="column" marginTop={4}>
            <TextField
              key="name"
              type="text"
              label="Nome completo"
              margin="dense"
              inputRef={nameRef}
              value={credentials.name}
              onChange={(event) => {
                setCredentials({ ...credentials, name: event.target.value });
              }}
              required
            />

            <TextField
              key="email"
              type="email"
              label="Email"
              margin="dense"
              inputRef={emailRef}
              value={credentials.email}
              onChange={(event) =>
                setCredentials({ ...credentials, email: event.target.value })
              }
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  handleSignUpClick(null);
                }
              }}
              required
            />

            <TextField
              inputRef={passRef}
              key="password"
              type="password"
              label="Senha"
              margin="dense"
              value={credentials.password}
              onChange={(event) => {
                setCredentials({
                  ...credentials,
                  password: event.target.value,
                });
              }}
              required
            />

            <TextField
              inputRef={confirmPassRef}
              key="conform-password"
              type="password"
              label="Confirmar senha"
              margin="dense"
              value={credentials.passwordConfirmation}
              onChange={(event) => {
                setCredentials({
                  ...credentials,
                  passwordConfirmation: event.target.value,
                });
              }}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  handleSignUpClick(null);
                }
              }}
              required
            />
            <LoadingButton
              loading={loading}
              variant="contained"
              sx={{ minWidth: "120px", margin: "36px auto" }}
              onClick={(e) => handleSignUpClick(e)}
            >
              Finalizar
            </LoadingButton>

            <Snackbar
              open={toast.showing}
              autoHideDuration={4000}
              onClose={handleToastClose}
              message={toast.message}
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
