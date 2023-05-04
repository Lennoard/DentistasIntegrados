import Tooth from "./Tooth";

export default class Odontogram {
  teeth: Tooth[];
  notes: string;

  constructor(teeth: Tooth[], notes: string) {
    this.teeth = teeth;
    this.notes = notes;
  }
}
