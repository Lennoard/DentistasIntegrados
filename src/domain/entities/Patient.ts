import Address from "./Address";

export default class Patient {
  id: string;
  name: string;
  cpf: string;
  rg: string;
  phoneNumber: string;
  email: string;
  birthDate: Date;
  address: Address;

  constructor(
    id: string,
    name: string,
    cpf: string,
    rg: string,
    phoneNumber: string,
    email: string,
    birthDate: Date,
    address: Address
  ) {
    this.id = id;
    this.name = name;
    this.cpf = cpf;
    this.rg = rg;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.birthDate = birthDate;
    this.address = address;
  }
}
