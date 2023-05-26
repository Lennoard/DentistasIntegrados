import "reflect-metadata";
import IMapper from "./IMapper";
import Patient from "../../domain/entities/Patient";
import PatientDTO from "../models/PatientDTO";
import AddressMapper from "./AddressMapper";
import {inject, injectable} from "inversify";
import DataTypes from "../di/DataTypes";

@injectable()
export default class PatientMapper implements IMapper<PatientDTO, Patient> {

  constructor(@inject(DataTypes.AddressMapper) private addressMapper: AddressMapper) { }

  map(source: PatientDTO): Patient {
    return new Patient(
      source.id,
      source.active,
      source.completedRegistration,
      source.name,
      source.cpf,
      source.rg,
      source.phoneNumber,
      source.gender,
      source.email,
      new Date(source.birthDate),
      this.addressMapper.map(source.address)
    );
  }

  unmap(source: Patient): PatientDTO {
    const birthDate = source.birthDate.getTime();
    return {
      id: source.id,
      active: source.active,
      completedRegistration: source.completedRegistration,
      name: source.name,
      cpf: source.cpf,
      rg: source.rg,
      phoneNumber: source.phoneNumber,
      gender: source.gender,
      email: source.email,
      birthDate: isNaN(birthDate) ? 0 : birthDate,
      address: this.addressMapper.unmap(source.address),
    };
  }
}
