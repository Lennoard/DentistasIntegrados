import PatientRepository from "../../domain/repositories/PatientRepository";
import PatientFirestoreDataSource from "../sources/PatientFirestoreDataSource";
import Patient from "../../domain/entities/Patient";

export default class PatientRepositoryImpl implements PatientRepository {
  private dataSource: PatientFirestoreDataSource;

  constructor(dataSource: PatientFirestoreDataSource) {
    this.dataSource = dataSource;
  }

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
