import Consultation from "../../entities/consultation/Consultation";
import type ConsultationRepository from "../../repositories/ConsultationRepository";
import {inject, injectable} from "inversify";
import DataTypes from "../../../data/di/DataTypes";

export default interface GetConsultationUseCase {
  execute: (id: string) => Promise<Consultation | null>;
}

@injectable()
export class GetConsultationUseCaseImpl implements GetConsultationUseCase {
  constructor(
    @inject(DataTypes.ConsultationRepository)
    private repository: ConsultationRepository
  ) {}

  execute(id: string): Promise<Consultation | null> {
    return this.repository.getConsultation(id);
  }
}
