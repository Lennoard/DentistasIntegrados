import Patient from "../../entities/Patient";
import PatientRepository from "../../repositories/PatientRepository";

export default interface AddPatientUseCase {
  execute(patient: Patient): Promise<void>;
}

export class AddPatientUseCaseImpl implements AddPatientUseCase {
  private repository: PatientRepository;

  constructor(repository: PatientRepository) {
    this.repository = repository;
  }
  execute(patient: Patient): Promise<void> {
    return this.repository.addPatient(patient);
  }
}
