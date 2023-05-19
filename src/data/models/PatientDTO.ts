import AddressDTO from "./AddressDTO";

export default interface PatientDTO {
  id: string;
  active: boolean;
  completedRegistration: boolean;
  name: string;
  cpf: string;
  rg: string;
  phoneNumber: string;
  email: string;
  birthDate: number;
  address: AddressDTO | null;
}
