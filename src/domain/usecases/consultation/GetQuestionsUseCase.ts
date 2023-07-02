import { inject, injectable } from "inversify";
import DataTypes from "../../../data/di/DataTypes";
import Question from "../../entities/consultation/Question";
import type ConsultationRepository from "../../repositories/ConsultationRepository";

export default interface GetQuestionsUseCase {
  execute: () => Promise<Question[]>;
}

@injectable()
export class GetQuestionsUseCaseImpl implements GetQuestionsUseCase {
  constructor(
    @inject(DataTypes.ConsultationRepository)
    private repository: ConsultationRepository
  ) {}

  execute(): Promise<Question[]> {
    return this.repository.getQuestions();
  }
}
