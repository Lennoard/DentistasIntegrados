import Patient from "../Patient";
import Odontogram from "./Odontogram";
import Question from "./Question";
import Treatment from "./Treatment";

export default interface Consultation {
    id: string;
    patient: Patient;
    odontogram: Odontogram;
    anamnesis: Question[];
    treatments: Treatment[];
    mainComplaints: string;
    date: Date;
}
