export default class Treatment {
  constructor(
    public date: Date,
    public description: string,
    public value: number,
    public acknowledged: boolean,
    public paymentAmount: number,
    public paymentDate: Date
  ) {}

  getDebt = (): number => this.value - this.paymentAmount;
}
