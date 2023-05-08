import Odontogram from "./Odontogram";
import Question from "./Question";
import Treatment from "./Treatment";
import {ConsultationStatus} from "../../ConsultationStatus";

export default class Consultation {
  id: string;
  patientId: string;
  odontogram: Odontogram;
  anamnesis: Question[];
  treatments: Treatment[];
  mainComplaints: string;
  date: Date;
  status: ConsultationStatus;

  constructor(
    id: string,
    patientId: string,
    odontogram: Odontogram,
    anamnesis: Question[],
    treatments: Treatment[],
    mainComplaints: string,
    date: Date,
    status: ConsultationStatus
  ) {
    this.id = id;
    this.patientId = patientId;
    this.odontogram = odontogram;
    this.anamnesis = anamnesis;
    this.treatments = treatments;
    this.mainComplaints = mainComplaints;
    this.date = date;
    this.status = status;
  }
}
