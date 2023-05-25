import { Container, Grid, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AppDrawer from "../../../components/AppDrawer";
import { useRef, useState } from "react";

interface ProfileUpdateFields {
  birthDate: string;
  cpf: string;
  rg: string;
  phoneNumber: string;
  genre: string;
  neighborhood: string;
  number: string;
  location: string;
  city: string;
  federationUnit: string;
  country: string;
}

export default function EditProfile(): JSX.Element {
  const [profileUpdateFields, setProfileUpdateFields] = useState<ProfileUpdateFields>({
    birthDate: "",
    cpf: "",
    rg: "",
    phoneNumber: "",
    genre: "",
    neighborhood: "",
    number: "",
    location: "",
    city: "",
    federationUnit: "",
    country: "",
  });
  const navigate = useNavigate();
  const birthDateRef = useRef<HTMLInputElement>(null);
  const cpfRef = useRef<HTMLInputElement>(null);
  const rgRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const locationRef = useRef<HTMLInputElement>(null);
  const neighborhoodRef = useRef<HTMLInputElement>(null);
  const numberRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  const federationUnitRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);

  return (
    <AppDrawer title="Editar perfil" selectedIndex={1}>
      <Container>
        <Grid container spacing={4} rowSpacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              key="birthDate"
              type="date"
              label="Data de nascimento"
              margin="dense"
              fullWidth={true}
              inputRef={birthDateRef}
              value={profileUpdateFields.birthDate}
              onChange={(event) => {
                setProfileUpdateFields({
                  ...profileUpdateFields,
                  birthDate: event.target.value,
                });
              }}
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
      </Container>
    </AppDrawer>
  );
}
