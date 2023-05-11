import type PatientRepository from "../../repositories/PatientRepository";
import Patient from "../../entities/Patient";
import {inject, injectable} from "inversify";
import DataTypes from "../../../data/di/DataTypes";

export default interface GetPatientUseCase {
  execute: (id: string) => Promise<Patient | null>;
}

@injectable()
export class GetPatientUseCaseImpl implements GetPatientUseCase {
  constructor(
    @inject(DataTypes.PatientRepository)
    private repository: PatientRepository
  ) {}

  execute(id: string): Promise<Patient | null> {
    return this.repository.getPatient(id);
  }
}
