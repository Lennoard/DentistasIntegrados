import Consultation from "../../entities/consultation/Consultation";
import type ConsultationRepository from "../../repositories/ConsultationRepository";
import {inject, injectable} from "inversify";
import DataTypes from "../../../data/di/DataTypes";

export default interface AddConsultationUseCase {
  execute(consultation: Consultation): Promise<void>;
}

@injectable()
export class AddConsultationUseCaseImpl implements AddConsultationUseCase {
  constructor(
    @inject(DataTypes.ConsultationRepository)
    private repository: ConsultationRepository
  ) {}
  execute(consultation: Consultation): Promise<void> {
    return this.repository.addConsultation(consultation);
  }
}
