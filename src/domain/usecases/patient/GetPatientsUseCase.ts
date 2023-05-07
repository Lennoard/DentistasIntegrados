import PatientRepository from "../../repositories/PatientRepository";
import Patient from "../../entities/Patient";

export default interface GetPatientsUseCase {
  execute: (active: boolean) => Promise<Patient[]>;
}

export class GetPatientsUseCaseImpl implements GetPatientsUseCase {
  private repository: PatientRepository;

  constructor(repository: PatientRepository) {
    this.repository = repository;
  }

  execute(active: boolean): Promise<Patient[]> {
    return this.repository.getPatients(active);
  }
}
