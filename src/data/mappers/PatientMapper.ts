import IMapper from "./IMapper";
import Patient from "../../domain/entities/Patient";
import PatientDTO from "../models/PatientDTO";
import AddressMapper from "./AddressMapper";

export default class PatientMapper implements IMapper<PatientDTO, Patient> {
  private addressMapper: AddressMapper;

  constructor(addressMapper: AddressMapper) {
    this.addressMapper = addressMapper;
  }

  map(source: PatientDTO): Patient {
    return new Patient(
      source.id,
      source.name,
      source.cpf,
      source.rg,
      source.phoneNumber,
      source.email,
      new Date(source.birthDate),
      this.addressMapper.map(source.address)
    );
  }

  unmap(source: Patient): PatientDTO {
    return {
      id: source.id,
      name: source.name,
      cpf: source.cpf,
      rg: source.rg,
      phoneNumber: source.phoneNumber,
      email: source.email,
      birthDate: source.birthDate.getTime(),
      address: this.addressMapper.unmap(source.address),
    };
  }
}
