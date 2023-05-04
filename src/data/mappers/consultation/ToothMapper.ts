import IMapper from "../IMapper";
import ToothDTO from "../../models/consultation/ToothDTO";
import Tooth from "../../../domain/entities/consultation/Tooth";

export default class ToothMapper implements IMapper<ToothDTO, Tooth> {
  map(source: ToothDTO): Tooth {
    return new Tooth(source.number, source.procedure);
  }

  unmap(source: Tooth): ToothDTO {
    return source;
  }
}
