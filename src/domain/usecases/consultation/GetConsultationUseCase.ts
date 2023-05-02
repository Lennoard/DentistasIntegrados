import Consultation from "../../entities/consultation/Consultation";

export default interface GetConsultationsUseCase {
  execute: (id: string) => Promise<Consultation>;
}
