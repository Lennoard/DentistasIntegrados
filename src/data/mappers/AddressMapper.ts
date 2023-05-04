import IMapper from "./IMapper";
import AddressDTO from "../models/AddressDTO";
import Address from "../../domain/entities/Address";

export default class AddressMapper implements IMapper<AddressDTO, Address> {
  map(source: AddressDTO): Address {
    return new Address(
      source.id,
      source.location,
      source.neighborhood,
      source.number,
      source.city,
      source.federationUnit,
      source.country
    );
  }

  unmap(source: Address): AddressDTO {
    return source
  }
}
