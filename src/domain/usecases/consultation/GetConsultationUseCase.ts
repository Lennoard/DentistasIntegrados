import Consultation from "../../entities/consultation/Consultation";
import ConsultationRepository from "../../repositories/ConsultationRepository";

export default interface GetConsultationsUseCase {
  execute: (id: string) => Promise<Consultation | null>;
}

export class GetConsultationsUseCaseImpl implements GetConsultationsUseCase {
  private repository: ConsultationRepository;

  constructor(repository: ConsultationRepository) {
    this.repository = repository;
  }

  execute(id: string): Promise<Consultation | null> {
    return this.repository.getConsultation(id);
  }
}
