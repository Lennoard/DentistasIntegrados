export default class Address {
  id: string;
  location: string;
  neighborhood: string;
  number: number;
  city: string;
  federationUnit: string;
  country: string;

  constructor(
    id: string,
    location: string,
    hood: string,
    number: number,
    city: string,
    federationUnit: string,
    country: string
  ) {
    this.id = id;
    this.location = location;
    this.neighborhood = hood;
    this.number = number;
    this.city = city;
    this.federationUnit = federationUnit;
    this.country = country;
  }

  getLocation = (): string => {
    return `${this.location}, ${this.number}, ${this.neighborhood}, ${this.city} - ${this.federationUnit}, ${this.country}`;
  };
}
