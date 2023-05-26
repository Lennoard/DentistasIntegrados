import { inject, injectable } from "inversify";
import DataTypes from "../../../data/di/DataTypes";
import Patient from "../../entities/Patient";
import type PatientRepository from "../../repositories/PatientRepository";

export default interface UpdatePatientUseCase {
  execute(patient: Patient): Promise<void>;
}

@injectable()
export class UpdatePatientUseCaseImpl implements UpdatePatientUseCase {
  constructor(
    @inject(DataTypes.PatientRepository)
    private repository: PatientRepository
  ) {}
  execute(patient: Patient): Promise<void> {
    return this.repository.updatePatient(patient);
  }
}
