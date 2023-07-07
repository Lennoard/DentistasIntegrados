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
  Tabs,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import container from "../../../config/inversify.config";
import DataTypes from "../../../data/di/DataTypes";
import consultationStatusAsString, {
  ConsultationStatus,
} from "../../../domain/ConsultationStatus";
import DomainTypes from "../../../domain/di/DomainTypes";
import Consultation from "../../../domain/entities/consultation/Consultation";
import GetConsultationsUseCase from "../../../domain/usecases/consultation/GetConsultationsUseCase";
import AppDrawer from "../../components/AppDrawer";
import ToastMessage from "../../utils/ToastMessage";

export default function Consultations(): JSX.Element {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(
    ConsultationStatus.Requested.toString()
  );
  const [toast, setToast] = useState<ToastMessage>({
    showing: false,
    message: "Falha ao buscar dados",
  });
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const getConsultationsUseCase = container.get<GetConsultationsUseCase>(
    DomainTypes.GetConsultationsUseCase
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

      getConsultationsUseCase.execute(user.uid).then((consultations) => {
        setConsultations(consultations);
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AppDrawer title="Consultas" selectedIndex={3}>
      <Container>
        <Box display="flex">
          <Typography variant="subtitle1">{`${
            consultations.filter(
              (it) => it.status === ConsultationStatus.Requested
            ).length
          } requisitada(s)`}</Typography>
          <Typography ml={1}>•</Typography>
          <Typography variant="subtitle1" ml={1}>
            {`${
              consultations.filter(
                (it) => it.status === ConsultationStatus.Finished
              ).length
            } finalizada(s)`}
          </Typography>
        </Box>

        <Tabs
          value={tabValue}
          onChange={(_s, newValue: string) => setTabValue(newValue)}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab
            value={ConsultationStatus.Requested.toString()}
            label="Requisitadas"
            sx={{ textTransform: "none" }}
          />
          <Tab
            value={ConsultationStatus.Ongoing.toString()}
            label="Em andamento"
            sx={{ textTransform: "none" }}
          />
          <Tab
            value={ConsultationStatus.Finished.toString()}
            label="Finalizadas"
            sx={{ textTransform: "none" }}
          />
          <Tab
            value={ConsultationStatus.Canceled.toString()}
            label="Canceladas"
            sx={{ textTransform: "none" }}
          />
        </Tabs>

        <TabPanel
          value={tabValue}
          index={ConsultationStatus.Requested}
          consultations={consultations.filter(
            (it) => it.status === ConsultationStatus.Requested
          )}
        />
        <TabPanel
          value={tabValue}
          index={ConsultationStatus.Ongoing}
          consultations={consultations.filter(
            (it) => it.status === ConsultationStatus.Ongoing
          )}
        />
        <TabPanel
          value={tabValue}
          index={ConsultationStatus.Finished}
          consultations={consultations.filter(
            (it) => it.status === ConsultationStatus.Finished
          )}
        />
        <TabPanel
          value={tabValue}
          index={ConsultationStatus.Canceled}
          consultations={consultations.filter(
            (it) => it.status === ConsultationStatus.Canceled
          )}
        />

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

interface TabPanelProps {
  dir?: string;
  index: number;
  value: string;
  consultations: Consultation[];
}

function TabPanel(props: TabPanelProps) {
  const { value, index, consultations } = props;

  return (
    <Box
      role="tabpanel"
      mt={2}
      hidden={value !== index.toString()}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
    >
      <Container disableGutters>
        <Grid container spacing={2} rowSpacing={2}>
          {value === index.toString() &&
            (consultations.length === 0 ? (
              <Grid item xs={12}>
                <Typography>Nenhuma consulta encontrada</Typography>
              </Grid>
            ) : (
              consultations.map((consultation) => (
                <ConsultationPanel
                  key={consultation.id}
                  consultation={consultation}
                />
              ))
            ))}
        </Grid>
      </Container>
    </Box>
  );
}

interface ConsultationPanelProps {
  consultation: Consultation;
}

function ConsultationPanel(props: ConsultationPanelProps) {
  const consultation = props.consultation;
  const navigate = useNavigate();

  return (
    <Grid item xs={12} sm={12} md={6}>
      <Paper variant="outlined">
        <Box display="flex" alignItems="flex-end" p={2}>
          <Box width="100%">
            <Typography>{`Consulta com ${consultation.doctorName}`}</Typography>
            <Typography>{`Data: ${
              consultation.date
                ? consultation.date.toLocaleString()
                : "Ainda não definida"
            }`}</Typography>
            <Typography>{`Status: ${consultationStatusAsString(
              consultation.status
            )}`}</Typography>
          </Box>
          <Button
            sx={{
              color: "#000",
              backgroundColor: "#8DC9FD",
              minWidth: "128px",
              maxHeight: "64px",
            }}
            variant="outlined"
            onClick={() =>
              navigate(`/consultas/detalhes?id=${consultation.id}`)
            }
          >
            Detalhes
            <br />
            da consulta
          </Button>
        </Box>
      </Paper>
    </Grid>
  );
}
