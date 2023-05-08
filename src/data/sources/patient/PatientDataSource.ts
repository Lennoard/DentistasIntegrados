import Patient from "../../../domain/entities/Patient";

export default interface PatientDataSource {
  addPatient: (patient: Patient) => Promise<void>;
  getPatient: (id: string) => Promise<Patient | null>;
  getPatients: (active: boolean) => Promise<Patient[]>;
}
