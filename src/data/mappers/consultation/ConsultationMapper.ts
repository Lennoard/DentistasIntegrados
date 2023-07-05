import "reflect-metadata";
import type PatientMapper from "../IMapper";
import IMapper from "../IMapper";
import OdontogramMapper from "./OdontogramMapper";
import TreatmentMapper from "./TreatmentMapper";
import ConsultationDTO from "../../models/consultation/ConsultationDTO";
import Consultation from "../../../domain/entities/consultation/Consultation";
import PatientDTO from "../../models/PatientDTO";
import Patient from "../../../domain/entities/Patient";
import QuestionMapper from "./QuestionMapper";
import {inject, injectable} from "inversify";
import DataTypes from "../../di/DataTypes";

@injectable()
export default class ConsultationMapper
  implements IMapper<ConsultationDTO, Consultation>
{

  constructor(
    @inject(DataTypes.PatientMapper) private patientMapper: PatientMapper<PatientDTO, Patient>,
    @inject(DataTypes.OdontogramMapper) private odontogramMapper: OdontogramMapper,
    @inject(DataTypes.TreatmentMapper) private treatmentMapper: TreatmentMapper,
    @inject(DataTypes.QuestionMapper) private questionMapper: QuestionMapper,
  ) { }

  map(source: ConsultationDTO): Consultation {
    return new Consultation(
      source.id,
      source.patientId,
      source.doctorName,
      this.odontogramMapper.map(source.odontogram),
      source.anamnesis.map((question) => this.questionMapper.map(question)),
      source.treatments.map((treatment) => this.treatmentMapper.map(treatment)),
      source.mainComplaints,
      source.date ? new Date(source.date) : null,
      source.status
    );
  }

  unmap(source: Consultation): ConsultationDTO {
    return {
      id: source.id,
      doctorName: source.doctorName,
      anamnesis: source.anamnesis.map((question) =>
        this.questionMapper.unmap(question)
      ),
      date: source.date?.getTime() || null,
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
