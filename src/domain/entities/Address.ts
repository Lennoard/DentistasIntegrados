export default class Address {
  location: string;
  neighborhood: string;
  number: number;
  city: string;
  federationUnit: string;
  country: string;

  constructor(
    location: string,
    hood: string,
    number: number,
    city: string,
    federationUnit: string,
    country: string
  ) {
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
