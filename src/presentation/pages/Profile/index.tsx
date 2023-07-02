import { Auth, User } from "@firebase/auth";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Snackbar,
  SnackbarCloseReason,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import container from "../../../config/inversify.config";
import DataTypes from "../../../data/di/DataTypes";
import DomainTypes from "../../../domain/di/DomainTypes";
import Patient from "../../../domain/entities/Patient";
import GetPatientUseCase from "../../../domain/usecases/patient/GetPatientUseCase";
import AppDrawer from "../../components/AppDrawer";
import ToastMessage from "../../utils/ToastMessage";
import showLocalizedAuthError from "../../../utils/auth/AuthError";
import genderAsString from "../../../domain/Gender";

export default function EditProfile(): JSX.Element {
  const navigate = useNavigate();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [toast, setToast] = useState<ToastMessage>({
    showing: false,
    message: "Falha ao buscar dados",
  });

  const getPatientUseCase = container.get<GetPatientUseCase>(
    DomainTypes.GetPatientUseCase
  );
  const auth = container.get<Auth>(DataTypes.Auth);

  const handleToastClose = (
    _: Event | React.SyntheticEvent<any, Event>,
    reason: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") return;
    setToast({ ...toast, showing: false });
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
      if (!user) {
        navigate("/login", { replace: true });
        return;
      }

      getPatientUseCase
        .execute(user.uid || "")
        .then((patient) => {
          setPatient(patient);
        })
        .catch((e) => {
          setToast({
            showing: true,
            message: `Falha ao buscar dados do cadastro: ${showLocalizedAuthError(
              e.message
            )}`,
          });
        });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AppDrawer title="Cadastro" selectedIndex={1}>
      <Container>
        <Grid container spacing={2} rowSpacing={3}>
          <Grid
            item
            xs={12}
            sx={{ display: { md: "flex", lg: "none" } }}
            justifyContent="center"
          >
            <Box pb={4}>
              <Avatar
                src={user?.photoURL || ""}
                sx={{ width: 80, height: 80, margin: "auto" }}
              />
              <Typography variant="h5" marginTop="8px" textAlign="center">
                {user?.displayName
                  ? user?.displayName
                  : user?.email?.split("@")[0]}
              </Typography>
              <Typography variant="body1" textAlign="center" noWrap>
                {user?.email}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6">Data de nascimento</Typography>
            <Typography variant="body2">
              {patient?.birthDate?.toLocaleDateString()}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6">CPF</Typography>
            <Typography variant="body2">{patient?.cpf || ""}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6">RG</Typography>
            <Typography variant="body2">{patient?.rg || ""}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6">Telefone</Typography>
            <Typography variant="body2">
              {patient?.phoneNumber || ""}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6">Gênero</Typography>
            <Typography variant="body2">
              {genderAsString(patient?.gender)}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6">Endereço</Typography>
            <Typography variant="body2">
              {patient?.address?.location}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6">Bairro</Typography>
            <Typography variant="body2">
              {patient?.address?.neighborhood}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6">Número</Typography>
            <Typography variant="body2">{patient?.address?.number}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6">Cidade</Typography>
            <Typography variant="body2">{patient?.address?.city}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6">Estado</Typography>
            <Typography variant="body2">
              {patient?.address?.federationUnit}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6">País</Typography>
            <Typography variant="body2">{patient?.address?.country}</Typography>
          </Grid>
          <Grid item xs={12} mt={4} display="flex" justifyContent="center">
            <Button
              size="large"
              variant="contained"
              sx={{ marginTop: "16px" }}
              onClick={() => {
                navigate("/perfil/editar");
              }}
            >
              Atualizar cadastro
            </Button>
          </Grid>
        </Grid>
        <Snackbar
          open={toast.showing}
          autoHideDuration={3000}
          onClose={handleToastClose}
          message={toast.message}
        />
      </Container>
    </AppDrawer>
  );
}
