export default class Treatment {
    date: Date;
    description: string;
    value: number;
    acknowledged: boolean;
    paymentAmount: number;
    paymentDate: Date;

    constructor(date: Date, description: string, value: number, acknowledged: boolean, paymentAmount: number, paymentDate: Date) {
        this.date = date;
        this.description = description;
        this.value = value;
        this.acknowledged = acknowledged;
        this.paymentAmount = paymentAmount;
        this.paymentDate = paymentDate;
    }

    getDebt = (): number => this.value - this.paymentAmount;
}
