import "reflect-metadata";
import IMapper from "./IMapper";
import AddressDTO from "../models/AddressDTO";
import Address from "../../domain/entities/Address";
import {injectable} from "inversify";

@injectable()
export default class AddressMapper implements IMapper<AddressDTO | null, Address | null> {
  map(source: AddressDTO | null): Address | null {
    if (!source) return null;

    return new Address(
      source.location,
      source.neighborhood,
      source.number,
      source.city,
      source.federationUnit,
      source.country
    );
  }

  unmap(source: Address | null): AddressDTO | null {
    if (!source) return null;
    return source
  }
}
