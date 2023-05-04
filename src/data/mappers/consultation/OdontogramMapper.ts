import ToothMapper from "./ToothMapper";
import IMapper from "../IMapper";
import OdontogramDTO from "../../models/consultation/OdontogramDTO";
import Odontogram from "../../../domain/entities/consultation/Odontogram";

export default class OdontogramMapper implements IMapper<OdontogramDTO, Odontogram> {
  map(source: OdontogramDTO): Odontogram {
    return new Odontogram(source.teeth, source.notes);
  }

  unmap(source: Odontogram): OdontogramDTO {
    return source;
  }
}
