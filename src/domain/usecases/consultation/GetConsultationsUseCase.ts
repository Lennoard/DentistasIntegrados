import { ConsultationStatus } from "../../ConsultationStatus";
import Consultation from "../../entities/consultation/Consultation";
import ConsultationRepository from "../../repositories/ConsultationRepository";

export default interface GetConsultationsUseCase {
  execute: (
    patientId: string | null,
    status: ConsultationStatus
  ) => Promise<Consultation[]>;
}

export class GetConsultationsUseCaseImpl implements GetConsultationsUseCase {
  private repository: ConsultationRepository;

  constructor(repository: ConsultationRepository) {
    this.repository = repository;
  }

  execute(
    patientId: string | null,
    status: ConsultationStatus
  ): Promise<Consultation[]> {
    return this.repository.getConsultations(patientId, status);
  }
}
