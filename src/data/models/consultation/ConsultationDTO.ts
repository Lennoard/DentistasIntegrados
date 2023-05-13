import OdontogramDTO from "./OdontogramDTO";
import QuestionDTO from "./QuestionDTO";
import TreatmentDTO from "./TreatmentDTO";

export default interface ConsultationDTO {
  id: string;
  patientId: string;
  odontogram: OdontogramDTO;
  anamnesis: QuestionDTO[];
  treatments: TreatmentDTO[];
  mainComplaints: string;
  date: number;
  status: number;
}
