import React, {useEffect, useRef, useState} from "react";
import imagerySignIn from "./imagerySignIn.png";
import logo from "./../../images/logo.png";
import "./signin.css";
import {Box, Container, Grid, Snackbar, SnackbarCloseReason, TextField, Typography,} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import {primaryDark, primaryMain} from "../../theme/pallete";
import ToastMessage from "../../utils/ToastMessage";
import {useNavigate} from "react-router-dom";
import {Auth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup,} from "@firebase/auth";
import showLocalizedAuthError from "../../../utils/auth/AuthError";
import container from "../../../config/inversify.config";
import DataTypes from "../../../data/di/DataTypes";
import GoogleSignInButton from "../../components/GoogleSignInButton";

const auth = container.get<Auth>(DataTypes.Auth);
const HOME_ROUTE = "/home";

interface AuthCredential {
  email: string;
  password: string;
}

export default function SignIn(): JSX.Element {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState<AuthCredential>({
    email: "",
    password: "",
  });
  const [toast, setToast] = useState<ToastMessage>({
    showing: false,
    message: "Falha ao fazer login",
  });
  const [loading, setLoading] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const [editingInPass, setEditingInPass] = useState(false);

  const handleToastClose = (
    _: Event | React.SyntheticEvent<any, Event>,
    reason: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") return;
    setToast({ ...toast, showing: false });
  };

  const handleSignInClick = async (
    e: React.MouseEvent<HTMLButtonElement> | null
  ) => {
    e?.preventDefault();
    setLoading(true);

    const user = await performEmailAuth(
      credentials.email!!,
      credentials.password!!
    );

    if (user) {
      setLoading(false);
      navigate(HOME_ROUTE);
    }
  };

  const performGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const { user } = await signInWithPopup(auth, provider);
      if (user) {
        setLoading(false);
        navigate(HOME_ROUTE);
      }
    } catch (error: any) {
      setToast({
        showing: true,
        message: showLocalizedAuthError(error.message),
      });
      setLoading(false);
      return null;
    }
  };

  const performEmailAuth = async (email: string, password: string) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
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

  useEffect(() => {
    if (!editingInPass) {
      emailRef.current?.focus();
    } else {
      passRef.current?.focus();
    }
  }, []);

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
          <Box display="flex" flexDirection="row">
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
            Login
          </Typography>

          <GoogleSignInButton
            text="Entre com o Google"
            onClick={(_) => performGoogleSignIn()}
          />

          <Box
            display="flex"
            flexDirection="row"
            sx={{
              alignItems: "center",
              flexFlow: "row wrap",
              justifyContent: "space-around",
            }}
          >
            <div className={"signInDecorator"} />
            <Typography margin="32px 16px" variant="body1" textAlign="center">
              Ou faça login com email
            </Typography>
            <div className={"signInDecorator"} />
          </Box>

          <Box display="flex" flexDirection="column">
            <TextField
              key="email"
              type="email"
              label="Email"
              margin="dense"
              inputRef={emailRef}
              value={credentials.email}
              onChange={(event) => {
                setEditingInPass(false);
                setCredentials({ ...credentials, email: event.target.value });
              }}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  handleSignInClick(null);
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
                setEditingInPass(true);
                setCredentials({
                  ...credentials,
                  password: event.target.value,
                });
              }}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  handleSignInClick(null);
                }
              }}
              required
            />

            <Typography
              margin="32px 16px"
              variant="body2"
              textAlign="center"
              sx={{
                cursor: "pointer",
                margin: "32px auto",
                textDecoration: "underline",
              }}
            >
              Esqueceu a senha?
            </Typography>

            <LoadingButton
              loading={loading}
              variant="contained"
              sx={{ minWidth: "120px", margin: "8px auto" }}
              onClick={(e) => handleSignInClick(e)}
            >
              Entrar
            </LoadingButton>

            <Box
              display="flex"
              flexDirection="row"
              marginTop="32px"
              justifyContent="center"
            >
              <Typography variant="body2">Não tem uma conta?</Typography>
              <Typography
                color={primaryMain}
                variant="body2"
                marginLeft="4px"
                sx={{ cursor: "pointer" }}
              >
                Inscreva-se
              </Typography>
            </Box>

            <Snackbar
              open={toast.showing}
              autoHideDuration={3000}
              onClose={handleToastClose}
              message={toast.message}
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
