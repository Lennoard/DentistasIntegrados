import PatientRepository from "../../domain/repositories/PatientRepository";
import Patient from "../../domain/entities/Patient";
import PatientDataSource from "../sources/patient/PatientFirestoreDataSource";

export default class PatientRepositoryImpl implements PatientRepository {
  constructor(private dataSource: PatientDataSource) {}

  async addPatient(patient: Patient): Promise<void> {
    return await this.dataSource.addPatient(patient);
  }

  async getPatient(id: string): Promise<Patient | null> {
    return await this.dataSource.getPatient(id);
  }

  async getPatients(active: boolean): Promise<Patient[]> {
    return this.dataSource.getPatients(active);
  }
}
