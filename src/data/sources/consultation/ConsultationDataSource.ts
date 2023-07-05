import { ConsultationStatus } from "../../../domain/ConsultationStatus";
import Consultation from "../../../domain/entities/consultation/Consultation";
import Question from "../../../domain/entities/consultation/Question";

export default interface ConsultationDataSource {
  getQuestions: () => Promise<Question[]>;
  addConsultation: (consultation: Consultation) => Promise<void>;
  getConsultation: (id: string) => Promise<Consultation | null>;
  getConsultationsByStatus: (
    patientId: string | null,
    status: ConsultationStatus
  ) => Promise<Consultation[]>;
  getConsultations: (patientId: string | null) => Promise<Consultation[]>;
}
