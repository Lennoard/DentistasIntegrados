import { ConsultationStatus } from "../../ConsultationStatus";
import Consultation from "../../entities/consultation/Consultation";
import type ConsultationRepository from "../../repositories/ConsultationRepository";
import { inject, injectable } from "inversify";
import DataTypes from "../../../data/di/DataTypes";

export default interface GetConsultationsUseCase {
  execute: (
    patientId: string | null,
    status: ConsultationStatus
  ) => Promise<Consultation[]>;
}

@injectable()
export class GetConsultationsUseCaseImpl implements GetConsultationsUseCase {
  constructor(
    @inject(DataTypes.ConsultationRepository)
    private repository: ConsultationRepository
  ) {}

  execute(
    patientId: string | null,
    status: ConsultationStatus
  ): Promise<Consultation[]> {
    return this.repository.getConsultations(patientId, status);
  }
}
