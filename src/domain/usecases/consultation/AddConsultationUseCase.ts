import Consultation from "../../entities/consultation/Consultation";

export default interface AddConsultationUseCase {
  execute: (consultation: Consultation) => Promise<void>;
}
