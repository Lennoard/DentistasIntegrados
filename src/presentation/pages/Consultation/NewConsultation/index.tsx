import { Auth } from "@firebase/auth";
import {
  Button,
  Container,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Snackbar,
  SnackbarCloseReason,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import container from "../../../../config/inversify.config";
import DataTypes from "../../../../data/di/DataTypes";
import DomainTypes from "../../../../domain/di/DomainTypes";
import Patient from "../../../../domain/entities/Patient";
import GetPatientUseCase from "../../../../domain/usecases/patient/GetPatientUseCase";
import AppDrawer from "../../../components/AppDrawer";
import ToastMessage from "../../../utils/ToastMessage";
import showLocalizedAuthError from "../../../../utils/auth/AuthError";
import GetQuestionsUseCase from "../../../../domain/usecases/consultation/GetQuestionsUseCase";
import Question from "../../../../domain/entities/consultation/Question";
import { QuestionType } from "../../../../domain/ConsultationType";
import { primaryMain } from "../../../theme/pallete";

export default function NewConsultation(): JSX.Element {
  const navigate = useNavigate();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [toast, setToast] = useState<ToastMessage>({
    showing: false,
    message: "Falha ao buscar dados",
  });

  const getPatientUseCase = container.get<GetPatientUseCase>(
    DomainTypes.GetPatientUseCase
  );
  const getQuestionsUseCase = container.get<GetQuestionsUseCase>(
    DomainTypes.GetQuestionsUseCase
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

      getQuestionsUseCase
        .execute()
        .then((questions) => {
          setQuestions(questions);
        })
        .catch((e) => {
          setToast({
            showing: true,
            message: `Falha ao buscar anamnese: ${showLocalizedAuthError(
              e.message
            )}`,
          });
        });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AppDrawer title="Marcar consulta" selectedIndex={2}>
      <Container>
        <Grid container spacing={4} rowSpacing={4}>
        <Typography color={primaryMain} variant="h5">Anamese</Typography>
          {questions.map((question) => (
            <QuestionGrid key={question.id} question={question} />
          ))}
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
          autoHideDuration={5000}
          onClose={handleToastClose}
          message={toast.message}
        />
      </Container>
    </AppDrawer>
  );
}

function QuestionGrid(props: QuestionGridProps) {
  const question = props.question;

  const BoolQuestion = () => {
    return (
      <RadioGroup row name={question.id}>
        <FormControlLabel value={1} control={<Radio />} label="Sim" />
        <FormControlLabel value={0} control={<Radio />} label="Não" />
      </RadioGroup>
    );
  };

  const CustomQuestion = () => {
    return (
      <RadioGroup row name={question.id}>
        {question.questionChoices?.map((choice) => (
          <FormControlLabel
            key={choice}
            value={choice}
            control={<Radio />}
            label={choice}
          />
        ))}
      </RadioGroup>
    );
  };

  return (
    <Grid item xs={12} sm={6} md={6} lg={4}>
      <Typography variant="h6">{question.question}</Typography>
      {question.questionType === QuestionType.Bool ? (
        <BoolQuestion />
      ) : (
        <CustomQuestion />
      )}
      <TextField
        key={`obs_${question.id}`}
        label="Observações"
        placeholder="Obs: "
        margin="dense"
        fullWidth={true}
        sx={{ marginY: "4px" }}
        onChange={(event) => {}}
      />
    </Grid>
  );
}

interface QuestionGridProps {
  question: Question;
}
