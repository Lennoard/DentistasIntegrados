import { Auth, sendPasswordResetEmail } from "@firebase/auth";
import {
  Box,
  Button,
  Container,
  FormControlLabel,
  Grid,
  Modal,
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
import { ConsultationStatus } from "../../../../domain/ConsultationStatus";
import { QuestionType } from "../../../../domain/ConsultationType";
import DomainTypes from "../../../../domain/di/DomainTypes";
import Patient from "../../../../domain/entities/Patient";
import Consultation from "../../../../domain/entities/consultation/Consultation";
import Odontogram from "../../../../domain/entities/consultation/Odontogram";
import Question from "../../../../domain/entities/consultation/Question";
import AddConsultationUseCase from "../../../../domain/usecases/consultation/AddConsultationUseCase";
import GetQuestionsUseCase from "../../../../domain/usecases/consultation/GetQuestionsUseCase";
import GetPatientUseCase from "../../../../domain/usecases/patient/GetPatientUseCase";
import showLocalizedAuthError from "../../../../utils/auth/AuthError";
import AppDrawer from "../../../components/AppDrawer";
import { primaryMain } from "../../../theme/pallete";
import ToastMessage from "../../../utils/ToastMessage";
import { dialogStyle } from "../../../theme/theme";

export default function NewConsultation(): JSX.Element {
  const navigate = useNavigate();
  const [openCompleteRegistrationModal, setCompleteRegistrationModalOpen] =
    useState(false);
  const [patient, setPatient] = useState<Patient | null>(null);
  const [buttonEnabled, setButtonEnabled] = useState<boolean>(false);
  const [mainComplaint, setComplaint] = useState<string>("");
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
  const addConsultationUseCase = container.get<AddConsultationUseCase>(
    DomainTypes.AddConsultationUseCase
  );
  const auth = container.get<Auth>(DataTypes.Auth);

  const handleToastClose = (
    _: Event | React.SyntheticEvent<any, Event>,
    reason: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") return;
    setToast({ ...toast, showing: false });
  };

  const updateQuestionAnswer = (questionId: string, answer: any) => {
    const index = questions.findIndex((it) => it.id === questionId);
    questions[index].answer = answer;
    setQuestions(questions);
  };

  const updateQuestionData = (questionId: string, data: string) => {
    const index = questions.findIndex((it) => it.id === questionId);
    questions[index].data = data;
    setQuestions(questions);
  };

  const checkFields = () => {
    setButtonEnabled(
      mainComplaint.length > 0 &&
        questions.find((it) => it.answer == null) == null
    );
  };

  const saveConsultation = () => {
    const consultation = new Consultation(
      "",
      patient?.id || "",
      new Odontogram([], ""),
      questions,
      [],
      mainComplaint,
      new Date(),
      ConsultationStatus.Requested
    );

    addConsultationUseCase
      .execute(consultation)
      .then(() => {
        setToast({
          showing: true,
          message: "Consulta requisitada!",
        });
      })
      .catch((e) => {
        console.log(e);
        setToast({
          showing: true,
          message: `Falha ao salvar consulta: ${showLocalizedAuthError(
            e.message
          )}`,
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
        .execute(user.uid || "")
        .then((patient) => {
          setPatient(patient);
          if (patient?.completedRegistration || false) {
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
          } else {
            setCompleteRegistrationModalOpen(true);
          }
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
    <AppDrawer title="Marcar consulta" selectedIndex={2}>
      <Container>
        <Modal
          open={openCompleteRegistrationModal}
          disableEscapeKeyDown={true}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={dialogStyle} textAlign="center">
            <Typography id="modal-modal-title" variant="h3">
              Ops...
            </Typography>
            <Typography
              id="modal-modal-description"
              variant="subtitle1"
              sx={{ mt: 2 }}
            >
              É necessário um cadastro completo para marcar uma consulta
            </Typography>

            <Button
              variant="contained"
              sx={{ minWidth: "120px", margin: "36px auto 8px auto" }}
              onClick={(_) => {
                navigate("/perfil/editar?next=new-consultation");
              }}
            >
              Completar cadastro
            </Button>
          </Box>
        </Modal>

        <Typography
          color={primaryMain}
          variant="h4"
          mb={2}
          sx={{ borderBottom: "1px solid #CCC" }}
        >
          Queixas
        </Typography>
        <Grid container spacing={4} rowSpacing={4}>
          <Grid item xs={12} sm={6} md={6} lg={4}>
            <Typography variant="h6">Queixa principal</Typography>
            <TextField
              margin="dense"
              fullWidth={true}
              sx={{
                marginTop: "4px",
                marginBottom: "32px",
                minWidth: "300px",
              }}
              key="complaint"
              value={mainComplaint}
              onChange={(event) => {
                setComplaint(event.target.value);
                checkFields();
              }}
            />
          </Grid>
        </Grid>

        <Typography
          mb={2}
          color={primaryMain}
          variant="h4"
          sx={{ borderBottom: "1px solid #CCC" }}
        >
          Anamnese
        </Typography>
        <Grid container spacing={4} rowSpacing={4}>
          {questions.map((question) => (
            <QuestionGrid
              key={question.id}
              question={question}
              checkFn={checkFields}
              updateDataFn={updateQuestionData}
              updateAnswerFn={updateQuestionAnswer}
            />
          ))}
          <Grid item xs={12} mt={4} display="flex" justifyContent="center">
            <Button
              size="large"
              variant="contained"
              disabled={!buttonEnabled}
              sx={{ marginY: "16px" }}
              onClick={() => {
                saveConsultation();
              }}
            >
              Marcar consulta
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
  const [questionAnswer, setQuestionAnswer] = useState<any>(
    question.answer || ""
  );

  const BoolQuestion = () => {
    return (
      <RadioGroup
        row
        name={question.id}
        value={questionAnswer}
        onChange={(event) => {
          setQuestionAnswer(event.target.value);
          props.updateAnswerFn(props.question.id, event.target.value);
          props.checkFn();
        }}
      >
        <FormControlLabel value="Sim" control={<Radio />} label="Sim" />
        <FormControlLabel value="Não" control={<Radio />} label="Não" />
      </RadioGroup>
    );
  };

  const CustomQuestion = () => {
    return (
      <RadioGroup
        row
        name={question.id}
        value={questionAnswer}
        onChange={(event) => {
          setQuestionAnswer(event.target.value);
          props.updateAnswerFn(props.question.id, event.target.value);
          props.checkFn();
        }}
      >
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
        onChange={(event) => {
          props.updateDataFn(props.question.id, event.target.value);
          props.checkFn();
        }}
      />
    </Grid>
  );
}

interface QuestionGridProps {
  question: Question;
  updateAnswerFn: (questionId: string, answer: any) => void;
  updateDataFn: (questionId: string, data: string) => void;
  checkFn: () => void;
}
