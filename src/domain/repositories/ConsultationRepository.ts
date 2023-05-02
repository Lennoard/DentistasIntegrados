import Consultation from "../entities/consultation/Consultation";
import { ConsultationStatus } from "../ConsultationStatus";

export default interface ConsultationRepository {
  addConsultation: (consultation: Consultation) => Promise<void>;
  getConsultation: (id: string) => Promise<Consultation | null>;
  getConsultations: (
    patientId: string | null,
    status: ConsultationStatus
  ) => Promise<Consultation[]>;
}
