import type PatientRepository from "../repositories/PatientRepository";
import { inject, injectable } from "inversify";
import DataTypes from "../../data/di/DataTypes";
import type { Auth } from "@firebase/auth";
import { User, createUserWithEmailAndPassword } from "@firebase/auth";
import Patient from "../entities/Patient";

export default interface CreateAccountUseCase {
  execute(name: string, email: string, password: string): Promise<User | null>;
}

@injectable()
export class CreateAccountUseCaseImpl implements CreateAccountUseCase {
  constructor(
    @inject(DataTypes.Auth) private auth: Auth,
    @inject(DataTypes.PatientRepository) private repository: PatientRepository
  ) {}
  async execute(
    name: string,
    email: string,
    password: string
  ): Promise<User | null> {
    const user = (
      await createUserWithEmailAndPassword(this.auth, email, password)
    )?.user;
    const patient = new Patient(
      user.uid,
      true,
      false,
      name,
      "",
      "",
      "",
      email,
      new Date(),
      null
    );

    await this.repository.addPatient(patient);
    return user;
  }
}
