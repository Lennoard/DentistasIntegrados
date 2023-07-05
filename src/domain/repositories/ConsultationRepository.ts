import Consultation from "../entities/consultation/Consultation";
import { ConsultationStatus } from "../ConsultationStatus";
import Question from "../entities/consultation/Question";

export default interface ConsultationRepository {
  getQuestions: () => Promise<Question[]>;
  addConsultation: (consultation: Consultation) => Promise<void>;
  getConsultation: (id: string) => Promise<Consultation | null>;
  getConsultationsByStatus: (
    patientId: string | null,
    status: ConsultationStatus
  ) => Promise<Consultation[]>;
  getConsultations: (
    patientId: string | null
  ) => Promise<Consultation[]>;
}
