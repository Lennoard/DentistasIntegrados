import Address from "./Address";

export default interface Patient {
    id: string;
    name: string;
    cpf: string;
    rg: string;
    phoneNumber: string;
    email: string;
    birthDate: Date;
    address: Address;
}
