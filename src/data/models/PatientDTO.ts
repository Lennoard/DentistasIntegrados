import AddressDTO from "./AddressDTO";

export default interface PatientDTO {
  id: string;
  name: string;
  cpf: string;
  rg: string;
  phoneNumber: string;
  email: string;
  birthDate: number;
  address: AddressDTO;
}
