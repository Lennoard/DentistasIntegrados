export default class Address {
  constructor(
    public location: string,
    public neighborhood: string,
    public number: number,
    public city: string,
    public federationUnit: string,
    public country: string
  ) {}

  getLocation = (): string => {
    return `${this.location}, ${this.number}, ${this.neighborhood}, ${this.city} - ${this.federationUnit}, ${this.country}`;
  };
}
