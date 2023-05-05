import ConsultationRepository from "../../domain/repositories/ConsultationRepository";
import ConsultationFirestoreDataSource from "../sources/ConsultationFirestoreDataSource";
import Consultation from "../../domain/entities/consultation/Consultation";
import { ConsultationStatus } from "../../domain/ConsultationStatus";

export default class ConsultationRepositoryImpl implements ConsultationRepository {
  private dataSource: ConsultationFirestoreDataSource;

  constructor(dataSource: ConsultationFirestoreDataSource) {
    this.dataSource = dataSource;
  }

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
