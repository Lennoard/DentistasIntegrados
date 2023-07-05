import Odontogram from "./Odontogram";
import Question from "./Question";
import Treatment from "./Treatment";
import { ConsultationStatus } from "../../ConsultationStatus";

export default class Consultation {
  constructor(
    public id: string,
    public patientId: string,
    public doctorName: string | null,
    public odontogram: Odontogram,
    public anamnesis: Question[],
    public treatments: Treatment[],
    public mainComplaints: string,
    public date: Date | null,
    public status: ConsultationStatus
  ) {}
}
