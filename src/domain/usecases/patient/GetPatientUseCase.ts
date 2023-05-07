import PatientRepository from "../../repositories/PatientRepository";
import Patient from "../../entities/Patient";

export default interface GetPatientUseCase {
  execute: (id: string) => Promise<Patient | null>;
}

export class GetPatientUseCaseImpl implements GetPatientUseCase {
  private repository: PatientRepository;

  constructor(repository: PatientRepository) {
    this.repository = repository;
  }

  execute(id: string): Promise<Patient | null> {
    return this.repository.getPatient(id);
  }
}
