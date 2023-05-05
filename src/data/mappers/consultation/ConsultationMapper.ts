import PatientMapper from "../IMapper";
import OdontogramMapper from "./OdontogramMapper";
import TreatmentMapper from "./TreatmentMapper";
import IMapper from "../IMapper";
import ConsultationDTO from "../../models/consultation/ConsultationDTO";
import Consultation from "../../../domain/entities/consultation/Consultation";
import PatientDTO from "../../models/PatientDTO";
import Patient from "../../../domain/entities/Patient";
import ToothMapper from "./ToothMapper";
import QuestionMapper from "./QuestionMapper";

export default class ConsultationMapper
  implements IMapper<ConsultationDTO, Consultation>
{
  private patientMapper: PatientMapper<PatientDTO, Patient>;
  private odontogramMapper: OdontogramMapper;
  private treatmentMapper: TreatmentMapper;
  private questionMapper: QuestionMapper;
  private toothMapper: ToothMapper;

  constructor(
    patientMapper: IMapper<PatientDTO, Patient>,
    odontogramMapper: OdontogramMapper,
    treatmentMapper: TreatmentMapper,
    questionMapper: QuestionMapper,
    toothMapper: ToothMapper
  ) {
    this.patientMapper = patientMapper;
    this.odontogramMapper = odontogramMapper;
    this.treatmentMapper = treatmentMapper;
    this.questionMapper = questionMapper;
    this.toothMapper = toothMapper;
  }

  map(source: ConsultationDTO): Consultation {
    return new Consultation(
      source.id,
      source.patientId,
      this.odontogramMapper.map(source.odontogram),
      source.anamnesis.map((question) => this.questionMapper.map(question)),
      source.treatments.map((treatment) => this.treatmentMapper.map(treatment)),
      source.mainComplaints,
      new Date(source.date),
      source.status
    );
  }

  unmap(source: Consultation): ConsultationDTO {
    return {
      id: source.id,
      anamnesis: source.anamnesis.map((question) =>
        this.questionMapper.unmap(question)
      ),
      date: source.date.getTime(),
      mainComplaints: source.mainComplaints,
      odontogram: this.odontogramMapper.unmap(source.odontogram),
      patientId: source.patientId,
      status: source.status,
      treatments: source.treatments.map((treatments) =>
        this.treatmentMapper.unmap(treatments)
      ),
    };
  }
}
