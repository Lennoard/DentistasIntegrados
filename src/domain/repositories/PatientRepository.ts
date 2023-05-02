import Patient from "../entities/Patient";

export default interface PatientRepository {
  addPatient: (patient: Patient) => Promise<void>;
  getPatient: (id: string) => Promise<Patient | null>;
  getPatients: () => Promise<Patient[]>;
}
