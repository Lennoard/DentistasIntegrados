import { inject, injectable } from "inversify";
import DataTypes from "../../data/di/DataTypes";
import type { Auth } from "@firebase/auth";
import { User, createUserWithEmailAndPassword } from "@firebase/auth";
import Patient from "../entities/Patient";
import DomainTypes from "../di/DomainTypes";
import type AddPatientUseCase from "./patient/AddPatientUseCase";

export default interface CreateAccountUseCase {
  execute(name: string, email: string, password: string): Promise<User | null>;
}

@injectable()
export class CreateAccountUseCaseImpl implements CreateAccountUseCase {
  constructor(
    @inject(DataTypes.Auth) private auth: Auth,
    @inject(DomainTypes.AddPatientUseCase) private addPatientUseCase: AddPatientUseCase
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

    await this.addPatientUseCase.execute(patient);
    return user;
  }
}
