import { Auth } from "@firebase/auth";
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Snackbar,
  SnackbarCloseReason,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import container from "../../../../config/inversify.config";
import DataTypes from "../../../../data/di/DataTypes";
import odontogramImageAdult from "./odontograma1.png"
import odontogramImageEnfant  from "./odontograma2.png"
import consultationStatusAsString, {
  ConsultationStatus,
} from "../../../../domain/ConsultationStatus";
import DomainTypes from "../../../../domain/di/DomainTypes";
import Consultation from "../../../../domain/entities/consultation/Consultation";
import GetConsultationUseCase from "../../../../domain/usecases/consultation/GetConsultationUseCase";
import AppDrawer from "../../../components/AppDrawer";
import { primaryLight } from "../../../theme/pallete";
import ToastMessage from "../../../utils/ToastMessage";

export default function ConsultationDetails(): JSX.Element {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState<any>(0);
  const [toast, setToast] = useState<ToastMessage>({
    showing: false,
    message: "Falha ao buscar dados",
  });
  const [consultation, setConsultation] = useState<Consultation | null>(null);
  const getConsultationUseCase = container.get<GetConsultationUseCase>(
    DomainTypes.GetConsultationUseCase
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
      if (!user) {
        navigate("/login", { replace: true });
        return;
      }

      let consultationId =
        new URLSearchParams(window.location.search).get("id") || "";

      getConsultationUseCase.execute(consultationId).then((consultation) => {
        setConsultation(consultation);
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AppDrawer title="Detalhes da consulta" selectedIndex={3}>
      <Container>
        <Box display="flex">
          <Typography variant="subtitle1">{`Data: ${
            consultation?.date?.toLocaleString() || "Ainda não informada"
          } `}</Typography>
          <Typography ml={1} variant="subtitle1">
            •
          </Typography>
          <Typography
            ml={1}
            variant="subtitle1"
          >{`Status: ${consultationStatusAsString(
            consultation?.status || ConsultationStatus.Requested
          )}`}</Typography>
        </Box>

        <Tabs
          value={tabValue}
          sx={{ marginTop: "16px" }}
          onChange={(_, newValue) => setTabValue(newValue)}
          variant="fullWidth"
        >
          <Tab value={0} label="Avaliação" sx={{ textTransform: "none" }} />
          <Tab
            value={1}
            label="Procedimentos"
            disabled={
              consultation?.status !== ConsultationStatus.Ongoing &&
              consultation?.status !== ConsultationStatus.Finished
            }
            sx={{ textTransform: "none" }}
          />
        </Tabs>

        {tabValue === 0 && <Evaluation consultation={consultation} />}

        {tabValue === 1 && <Procedures consultation={consultation} />}

        <Snackbar
          open={toast.showing}
          autoHideDuration={5000}
          onClose={handleToastClose}
          message={toast.message}
        />
      </Container>
    </AppDrawer>
  );
}

interface ConsultationContentProps {
  consultation: Consultation | null;
}

function Evaluation(props: ConsultationContentProps) {
  const { consultation } = props;

  return (
    <Box role="tabpanel" mt={6}>
      <Container disableGutters>
        <Grid container spacing={2} rowSpacing={2}>
          {consultation == null ? (
            <Grid item xs={12}>
              <Typography>Consulta não encontrada</Typography>
            </Grid>
          ) : (
            <AvaliationPanel consultation={consultation} />
          )}
        </Grid>
      </Container>
    </Box>
  );
}

function Procedures(props: ConsultationContentProps) {
  const { consultation } = props;

  return (
    <Box role="tabpanel" mt={6}>
      <Container disableGutters>
        <Grid container spacing={4} rowSpacing={4}>
          <Grid item xs={12}>
            <Typography variant="h6">Tratamentos:</Typography>
            {consultation?.treatments?.length === 0 ? (
              <Typography variant="body1" color="#696969">
                Nenhum tratamento realizado ainda
              </Typography>
            ) : (
              <TableContainer component={Paper} sx={{ mt: "8px" }}>
                <Table
                  sx={{ minWidth: 650 }}
                  aria-label="Tabela de tratamentos"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>
                        Descrição
                      </TableCell>
                      <TableCell align="center" sx={{ fontWeight: "bold" }}>Data</TableCell>
                      <TableCell align="center" sx={{ fontWeight: "bold" }}>Valor</TableCell>
                      <TableCell align="center" sx={{ fontWeight: "bold" }}>
                        Pagamento
                      </TableCell>
                      <TableCell align="center" sx={{ fontWeight: "bold" }}>Débito</TableCell>
                      <TableCell align="center" sx={{ fontWeight: "bold" }}>Reconhecido</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {consultation?.treatments.map((treatment) => (
                      <TableRow
                        key={treatment.description}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {treatment.description}
                        </TableCell>
                        <TableCell align="center">
                          {treatment.date.toLocaleDateString()}
                        </TableCell>
                        <TableCell align="center">{treatment.value.toFixed(2)}</TableCell>
                        <TableCell align="center">
                          {treatment.paymentAmount.toFixed(2)}
                        </TableCell>
                        <TableCell align="center">{treatment.getDebt().toFixed(2)}</TableCell>
                        <TableCell align="center">
                          {treatment.acknowledged ? "✅" : "❌"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Odontograma:</Typography>
            <TableContainer component={Paper} sx={{ mt: "8px" }}>
                <Table
                  sx={{ minWidth: 650 }}
                  aria-label="Tabela de tratamentos"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>
                        Número do dente
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Procedimento</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {consultation?.odontogram?.teeth.map((tooth) => (
                      <TableRow
                        key={tooth.number}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {tooth.number}
                        </TableCell>
                        <TableCell>{tooth.procedure}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            <Typography mt={2} color="#696969">{`Nota: ${consultation?.odontogram.notes || ""}`}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">Referência:</Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={6} display="flex" justifyContent="center">
            <img src={odontogramImageAdult} style={{ height: "360px" }}  alt="Odontograma para adultos" />
          </Grid>
          <Grid item xs={12} sm={12} md={6} display="flex" justifyContent="center" >
            <img src={odontogramImageEnfant} style={{ height: "360px" }}  alt="Odontograma infantil"  />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

interface AvaliationPanelProps {
  consultation: Consultation;
}

function AvaliationPanel(props: AvaliationPanelProps) {
  const consultation = props.consultation;

  return (
    <Grid container spacing={4} rowSpacing={4}>
      <Grid item xs={12} sm={6} md={6} lg={4}>
        <Typography variant="h6">Queixa principal:</Typography>
        <Typography variant="body1">{`"${consultation.mainComplaints}"`}</Typography>
      </Grid>
      {consultation.anamnesis.map((question) => (
        <Grid key={question.id} item xs={12} sm={6} md={6} lg={4}>
          <Typography variant="h6">{question.question}</Typography>
          <Typography variant="body1" color={primaryLight}>
            {question.answer}
          </Typography>
          {question.data ? (
            <i>
              <Typography
                variant="body2"
                color="#696969"
              >{`Obs: "${question.data}"`}</Typography>
            </i>
          ) : (
            <></>
          )}
        </Grid>
      ))}

      {consultation.status === ConsultationStatus.Requested ? (
        <Grid item xs={12}>
          <Button sx={{ background: "#F00" }} variant="contained">
            Cancelar consulta
          </Button>
        </Grid>
      ) : (
        <></>
      )}
    </Grid>
  );
}
