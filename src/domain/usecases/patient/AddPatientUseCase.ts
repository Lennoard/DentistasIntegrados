import Patient from "../../entities/Patient";
import type PatientRepository from "../../repositories/PatientRepository";
import {inject, injectable} from "inversify";
import DataTypes from "../../../data/di/DataTypes";

export default interface AddPatientUseCase {
  execute(patient: Patient): Promise<void>;
}

@injectable()
export class AddPatientUseCaseImpl implements AddPatientUseCase {
  constructor(
    @inject(DataTypes.PatientRepository)
    private repository: PatientRepository
  ) {}
  execute(patient: Patient): Promise<void> {
    return this.repository.addPatient(patient);
  }
}
