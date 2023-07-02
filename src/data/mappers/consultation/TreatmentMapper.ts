import "reflect-metadata";
import "reflect-metadata";
import IMapper from "../IMapper";
import TreatmentDTO from "../../models/consultation/TreatmentDTO";
import Treatment from "../../../domain/entities/consultation/Treatment";
import {injectable} from "inversify";

@injectable()
export default class TreatmentMapper implements IMapper<TreatmentDTO, Treatment> {
  map(source: TreatmentDTO): Treatment {
    return new Treatment(
      new Date(source.date),
      source.description,
      source.value,
      source.acknowledged,
      source.paymentAmount,
      new Date(source.paymentDate)
    );
  }

  unmap(source: Treatment): TreatmentDTO {
    return {
      acknowledged: source.acknowledged,
      date: source.date.getTime(),
      description: source.description,
      paymentAmount: source.paymentAmount,
      paymentDate: source.paymentDate.getTime(),
      value: source.value,
    } as TreatmentDTO;
  }
}
