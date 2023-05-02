import { ConsultationStatus } from "../../ConsultationStatus";
import Consultation from "../../entities/consultation/Consultation";

export default interface GetConsultationsUseCase {
  execute: (
    patientId: string | null,
    status: ConsultationStatus
  ) => Promise<Consultation[]>;
}
