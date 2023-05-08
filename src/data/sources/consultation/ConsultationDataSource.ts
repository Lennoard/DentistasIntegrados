import Consultation from "../../../domain/entities/consultation/Consultation";
import { ConsultationStatus } from "../../../domain/ConsultationStatus";

export default interface ConsultationDataSource {
  addConsultation: (consultation: Consultation) => Promise<void>;
  getConsultation: (id: string) => Promise<Consultation | null>;
  getConsultations: (
    patientId: string | null,
    status: ConsultationStatus
  ) => Promise<Consultation[]>;
}
