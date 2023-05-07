import Consultation from "../../entities/consultation/Consultation";
import ConsultationRepository from "../../repositories/ConsultationRepository";

export default interface AddConsultationUseCase {
  execute(consultation: Consultation): Promise<void>;
}

export class AddConsultationUseCaseImpl implements AddConsultationUseCase {
  private repository: ConsultationRepository;

  constructor(repository: ConsultationRepository) {
    this.repository = repository;
  }
  execute(consultation: Consultation): Promise<void> {
    return this.repository.addConsultation(consultation);
  }
}
