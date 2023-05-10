import ConsultationRepository from "../../domain/repositories/ConsultationRepository";
import ConsultationFirestoreDataSource from "../sources/consultation/ConsultationFirestoreDataSource";
import Consultation from "../../domain/entities/consultation/Consultation";
import { ConsultationStatus } from "../../domain/ConsultationStatus";
import { inject, injectable } from "inversify";
import DataTypes from "../di/DataTypes";

@injectable()
export default class ConsultationRepositoryImpl
  implements ConsultationRepository
{
  constructor(
    @inject(DataTypes.ConsultationDataSource)
    private dataSource: ConsultationFirestoreDataSource
  ) {}

  async addConsultation(consultation: Consultation): Promise<void> {
    return await this.dataSource.addConsultation(consultation);
  }

  async getConsultation(id: string): Promise<Consultation | null> {
    return await this.dataSource.getConsultation(id);
  }

  async getConsultations(
    patientId: string | null,
    status: ConsultationStatus
  ): Promise<Consultation[]> {
    return this.dataSource.getConsultations(patientId, status);
  }
}
