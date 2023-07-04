import { Auth } from "@firebase/auth";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Container,
  Grid,
  MenuItem,
  Snackbar,
  SnackbarCloseReason,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import container from "../../../../config/inversify.config";
import DataTypes from "../../../../data/di/DataTypes";
import { Gender } from "../../../../domain/Gender";
import DomainTypes from "../../../../domain/di/DomainTypes";
import Address from "../../../../domain/entities/Address";
import Patient from "../../../../domain/entities/Patient";
import GetPatientUseCase from "../../../../domain/usecases/patient/GetPatientUseCase";
import AppDrawer from "../../../components/AppDrawer";
import ToastMessage from "../../../utils/ToastMessage";
import UpdatePatientUseCase from "../../../../domain/usecases/patient/UpdatePatientUseCase";
import moment from "moment";
import showLocalizedAuthError from "../../../../utils/auth/AuthError";

interface ProfileUpdateFields {
  birthDate: string;
  cpf: string;
  rg: string;
  phoneNumber: string;
  gender: number;
  neighborhood: string;
  number: string;
  location: string;
  city: string;
  federationUnit: string;
  country: string;
}

export default function EditProfile(): JSX.Element {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [patient, setPatient] = useState<Patient | null>(null);
  const [profileUpdateFields, setProfileUpdateFields] =
    useState<ProfileUpdateFields>({
      birthDate: "",
      cpf: "",
      rg: "",
      phoneNumber: "",
      gender: Gender.Other,
      neighborhood: "",
      number: "",
      location: "",
      city: "",
      federationUnit: "",
      country: "",
    });
  const [toast, setToast] = useState<ToastMessage>({
    showing: false,
    message: "Falha ao buscar dados",
  });
  const cpfRef = useRef<HTMLInputElement>(null);
  const rgRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const bdayRef = useRef(null);
  const genderRef = useRef<HTMLInputElement>(null);
  const locationRef = useRef<HTMLInputElement>(null);
  const neighborhoodRef = useRef<HTMLInputElement>(null);
  const numberRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  const federationUnitRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);

  const getPatientUseCase = container.get<GetPatientUseCase>(
    DomainTypes.GetPatientUseCase
  );
  const updatePatientUseCase = container.get<UpdatePatientUseCase>(
    DomainTypes.UpdatePatientUseCase
  );
  const auth = container.get<Auth>(DataTypes.Auth);

  const handleToastClose = (
    _: Event | React.SyntheticEvent<any, Event>,
    reason: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") return;
    setToast({ ...toast, showing: false });
  };

  const handleSendClick = async (
    e: React.MouseEvent<HTMLButtonElement> | null
  ) => {
    e?.preventDefault();

    if (patient == null) {
      setToast({
        showing: true,
        message: "Falha ao salvar",
      });
      return;
    }

    setLoading(true);

    if (moment(profileUpdateFields.birthDate).isValid()) {
      patient.birthDate = new Date(profileUpdateFields.birthDate);
    }

    patient.completedRegistration = true;
    patient.cpf = profileUpdateFields.cpf;
    patient.rg = profileUpdateFields.rg;
    patient.phoneNumber = profileUpdateFields.phoneNumber;
    patient.gender = profileUpdateFields.gender;
    patient.address = new Address(
      profileUpdateFields.location,
      profileUpdateFields.neighborhood,
      profileUpdateFields.number as unknown as number,
      profileUpdateFields.city,
      profileUpdateFields.federationUnit,
      profileUpdateFields.country
    );

    updatePatientUseCase
      .execute(patient)
      .then(() => {
        setLoading(false);
        setToast({
          showing: true,
          message: "Cadastro atualizado!",
        });

        const urlParams = new URLSearchParams(window.location.search);
        console.log("next", urlParams.get("next"));
        console.log("params", urlParams);
        const newConsultation = urlParams.get("next") === "new-consultation";

        if (newConsultation) {
          setTimeout(() => {
            navigate("/consultas/nova");
          }, 2300);
        }
      })
      .catch((e) => {
        setLoading(false);
        setToast({
          showing: true,
          message: "Falha ao atualizar cadastro",
        });
      });
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/login", { replace: true });
        return;
      }

      getPatientUseCase
        .execute(auth.currentUser?.uid || "")
        .then((patient) => {
          setLoading(false);
          setPatient(patient);
          setProfileUpdateFields({
            ...profileUpdateFields,
            rg: patient?.rg || "",
            cpf: patient?.cpf || "",
            birthDate: moment(patient?.birthDate).format("DD/MM/YYYY"),
            phoneNumber: patient?.phoneNumber || "",
            gender: patient?.gender || Gender.Other,
            location: patient?.address?.location || "",
            neighborhood: patient?.address?.neighborhood || "",
            number: patient?.address?.number?.toString() || "",
            city: patient?.address?.city || "",
            federationUnit: patient?.address?.federationUnit || "",
            country: patient?.address?.country || "",
          });
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
    <AppDrawer title="Editar perfil" selectedIndex={1}>
      <Container>
        <Grid container spacing={4} rowSpacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <DatePicker
              sx={{ width: "100%", marginTop: "8px" }}
              label="Data de nascimento"
              ref={bdayRef}
              format="DD/MM/YYYY"
              onChange={(newValue) =>
                setProfileUpdateFields({
                  ...profileUpdateFields,
                  birthDate: newValue?.toString() || "",
                })
              }
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              key="cpf"
              type="text"
              label="CPF"
              margin="dense"
              fullWidth={true}
              inputRef={cpfRef}
              value={profileUpdateFields.cpf}
              onChange={(event) => {
                setProfileUpdateFields({
                  ...profileUpdateFields,
                  cpf: event.target.value,
                });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              key="rg"
              type="text"
              label="RG"
              margin="dense"
              fullWidth={true}
              inputRef={rgRef}
              value={profileUpdateFields.rg}
              onChange={(event) => {
                setProfileUpdateFields({
                  ...profileUpdateFields,
                  rg: event.target.value,
                });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              key="phoneNumber"
              type="tel"
              label="Telefone"
              margin="dense"
              fullWidth={true}
              inputRef={phoneRef}
              value={profileUpdateFields.phoneNumber}
              onChange={(event) => {
                setProfileUpdateFields({
                  ...profileUpdateFields,
                  phoneNumber: event.target.value,
                });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              select
              key="gender"
              type="text"
              label="Gênero"
              margin="dense"
              fullWidth={true}
              inputRef={genderRef}
              value={profileUpdateFields.gender}
              onChange={(event) => {
                setProfileUpdateFields({
                  ...profileUpdateFields,
                  gender: event.target.value as unknown as number,
                });
              }}
            >
              <MenuItem value={Gender.Other}>Outro</MenuItem>
              <MenuItem value={Gender.Male}>Masculino</MenuItem>
              <MenuItem value={Gender.Female}>Feminino</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              key="location"
              type="text"
              label="Endereço"
              margin="dense"
              fullWidth={true}
              inputRef={locationRef}
              value={profileUpdateFields.location}
              onChange={(event) => {
                setProfileUpdateFields({
                  ...profileUpdateFields,
                  location: event.target.value,
                });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              key="neighborhood"
              type="text"
              label="Bairro"
              margin="dense"
              fullWidth={true}
              inputRef={neighborhoodRef}
              value={profileUpdateFields.neighborhood}
              onChange={(event) => {
                setProfileUpdateFields({
                  ...profileUpdateFields,
                  neighborhood: event.target.value,
                });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              key="number"
              type="text"
              label="Número"
              margin="dense"
              fullWidth={true}
              inputRef={numberRef}
              value={profileUpdateFields.number}
              onChange={(event) => {
                setProfileUpdateFields({
                  ...profileUpdateFields,
                  number: event.target.value,
                });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              key="city"
              type="text"
              label="Cidade"
              margin="dense"
              fullWidth={true}
              inputRef={cityRef}
              value={profileUpdateFields.city}
              onChange={(event) => {
                setProfileUpdateFields({
                  ...profileUpdateFields,
                  city: event.target.value,
                });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              key="federationUnit"
              type="text"
              label="Estado"
              margin="dense"
              fullWidth={true}
              inputRef={federationUnitRef}
              value={profileUpdateFields.federationUnit}
              onChange={(event) => {
                setProfileUpdateFields({
                  ...profileUpdateFields,
                  federationUnit: event.target.value,
                });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              key="country"
              type="text"
              label="País"
              margin="dense"
              fullWidth={true}
              inputRef={countryRef}
              value={profileUpdateFields.country}
              onChange={(event) => {
                setProfileUpdateFields({
                  ...profileUpdateFields,
                  country: event.target.value,
                });
              }}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} mt={4} display="flex" justifyContent="center">
          <LoadingButton
            loading={loading}
            variant="contained"
            sx={{ minWidth: "120px", margin: "36px auto" }}
            onClick={(e) => handleSendClick(e)}
          >
            Salvar
          </LoadingButton>
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
