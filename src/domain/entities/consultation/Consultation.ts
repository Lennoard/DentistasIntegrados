import Patient from "../Patient";
import Odontogram from "./Odontogram";
import Question from "./Question";
import Treatment from "./Treatment";
import { ConsultationStatus } from "../../ConsultationStatus";

export default class Consultation {
  id: string;
  patient: Patient;
  odontogram: Odontogram;
  anamnesis: Question[];
  treatments: Treatment[];
  mainComplaints: string;
  date: Date;
  status: ConsultationStatus;

  constructor(
    id: string,
    patient: Patient,
    odontogram: Odontogram,
    anamnesis: Question[],
    treatments: Treatment[],
    mainComplaints: string,
    date: Date,
    status: ConsultationStatus
  ) {
    this.id = id;
    this.patient = patient;
    this.odontogram = odontogram;
    this.anamnesis = anamnesis;
    this.treatments = treatments;
    this.mainComplaints = mainComplaints;
    this.date = date;
    this.status = status;
  }
}
