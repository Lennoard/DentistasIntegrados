import "reflect-metadata";
import IMapper from "../IMapper";
import OdontogramDTO from "../../models/consultation/OdontogramDTO";
import Odontogram from "../../../domain/entities/consultation/Odontogram";
import { inject, injectable } from "inversify";
import DataTypes from "../../di/DataTypes";
import ToothMapper from "./ToothMapper";

@injectable()
export default class OdontogramMapper
  implements IMapper<OdontogramDTO, Odontogram>
{
  constructor(
    @inject(DataTypes.ToothMapper) private toothMapper: ToothMapper
  ) {}

  map(source: OdontogramDTO): Odontogram {
    return new Odontogram(source.teeth, source.notes);
  }

  unmap(source: Odontogram): OdontogramDTO {
    return {
      teeth: source.teeth.map(tooth => this.toothMapper.unmap(tooth)),
      notes: source.notes
    };
  }
}
