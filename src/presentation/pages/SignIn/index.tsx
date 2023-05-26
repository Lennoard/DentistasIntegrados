import React, { useEffect, useRef, useState } from "react";
import imagerySignIn from "./imagerySignIn.png";
import logo from "./../../images/logo.png";
import "./signin.css";
import {
  Box,
  Button,
  Container,
  Grid,
  Modal,
  Snackbar,
  SnackbarCloseReason,
  TextField,
  Typography,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { primaryDark, primaryMain } from "../../theme/pallete";
import ToastMessage from "../../utils/ToastMessage";
import { useNavigate } from "react-router-dom";
import {
  Auth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  getAdditionalUserInfo,
  sendPasswordResetEmail,
  User,
} from "@firebase/auth";
import showLocalizedAuthError from "../../../utils/auth/AuthError";
import container from "../../../config/inversify.config";
import DataTypes from "../../../data/di/DataTypes";
import GoogleSignInButton from "../../components/GoogleSignInButton";
import DomainTypes from "../../../domain/di/DomainTypes";
import { AdditionalUserInfo } from "@firebase/auth";
import AddPatientUseCase from "../../../domain/usecases/patient/AddPatientUseCase";
import Patient from "../../../domain/entities/Patient";
import { Gender } from "../../../domain/Gender";

const auth = container.get<Auth>(DataTypes.Auth);
const HOME_ROUTE = "/home";

const dialogStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  borderRadius: "16px",
  width: "30%",
  minWidth: "400px",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

interface AuthCredential {
  email: string;
  password: string;
  recoveryEmail: string;
}

export default function SignIn(): JSX.Element {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState<AuthCredential>({
    email: "",
    password: "",
    recoveryEmail: "",
  });
  const [toast, setToast] = useState<ToastMessage>({
    showing: false,
    message: "Falha ao fazer login",
  });
  const [loading, setLoading] = useState(false);
  const [editingInPass, setEditingInPass] = useState(false);
  const [openPasswordResetModal, setPasswordResetModalOpen] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const recoverEmailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);

  const addPatientUseCase = container.get<AddPatientUseCase>(DomainTypes.AddPatientUseCase);

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

  const handleSignUp = async (user: User, userInfo: AdditionalUserInfo | null) => {
    const name = (userInfo?.username || user.displayName) || "Nome não encontrado";
    const patient = new Patient(
      user.uid,
      true,
      false,
      name,
      "",
      "",
      "",
      Gender.Other,
      user.email || "",
      new Date(),
      null
    );

    await addPatientUseCase.execute(patient);
    setLoading(false);
    navigate(HOME_ROUTE);
  }

  const performGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const credential = await signInWithPopup(auth, provider);
      const user = credential.user;
      const userInfo = getAdditionalUserInfo(credential);
      
      if (user) {
        if (userInfo?.isNewUser) {
          await handleSignUp(user, userInfo);
        } else {
          setLoading(false);
          navigate(HOME_ROUTE);
        }
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
  });

  return (
    <Container fixed disableGutters={true}>
      <Modal
        open={openPasswordResetModal}
        onClose={() => setPasswordResetModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={dialogStyle} textAlign="center">
          <Typography id="modal-modal-title" variant="h4">
            Esqueceu sua senha?
          </Typography>
          <Typography
            id="modal-modal-description"
            variant="subtitle1"
            sx={{ mt: 2 }}
          >
            Digite seu e-mail cadastrado no campo abaixo para receber um e-mail
            de reuperação de senha e escolher uma nova.
          </Typography>
          <TextField
            key="email"
            type="email"
            label="Email"
            margin="dense"
            fullWidth={true}
            sx={{ marginY: "24px" }}
            inputRef={recoverEmailRef}
            value={credentials.recoveryEmail}
            onChange={(event) => {
              setCredentials({
                ...credentials,
                recoveryEmail: event.target.value,
              });
            }}
          />
          <Typography variant="body2" sx={{ mt: 2 }}>
            *Lembre-se de verificar sua caixa de spam, caso não receba o e-mail
          </Typography>

          <Button
            variant="contained"
            sx={{ minWidth: "120px", margin: "36px auto 8px auto" }}
            onClick={(_) => {
              sendPasswordResetEmail(auth, credentials.recoveryEmail)
                .then(() => {
                  setToast({
                    showing: true,
                    message: "Email de recuperação enviado!",
                  });
                  setPasswordResetModalOpen(false);
                })
                .catch((e) => {
                  setToast({
                    showing: true,
                    message: `Falha ao enviar email: ${showLocalizedAuthError(e.mes)}`,
                  });
                });
            }}
          >
            Enviar
          </Button>
        </Box>
      </Modal>
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
              onClick={(_: any) => setPasswordResetModalOpen(true)}
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
                onClick={(_) => navigate("/cadastro")}
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
