import type PatientRepository from "../../repositories/PatientRepository";
import Patient from "../../entities/Patient";
import { inject, injectable } from "inversify";
import DataTypes from "../../../data/di/DataTypes";

export default interface GetPatientsUseCase {
  execute: (active: boolean) => Promise<Patient[]>;
}

@injectable()
export class GetPatientsUseCaseImpl implements GetPatientsUseCase {
  constructor(
    @inject(DataTypes.PatientRepository)
    private repository: PatientRepository
  ) {}

  execute(active: boolean): Promise<Patient[]> {
    return this.repository.getPatients(active);
  }
}
