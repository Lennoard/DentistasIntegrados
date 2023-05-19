import Address from "./Address";

export default class Patient {
  constructor(
    public id: string,
    public active: boolean,
    public completedRegistration: boolean,
    public name: string,
    public cpf: string,
    public rg: string,
    public phoneNumber: string,
    public email: string,
    public birthDate: Date,
    public address: Address | null
  ) {}
}
