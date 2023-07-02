import "reflect-metadata";
import IMapper from "../IMapper";
import QuestionDTO from "../../models/consultation/QuestionDTO";
import Question from "../../../domain/entities/consultation/Question";
import { injectable } from "inversify";

@injectable()
export default class QuestionMapper implements IMapper<QuestionDTO, Question> {

  map(source: QuestionDTO): Question {
    return new Question(
      source.id,
      source.question,
      source.answer,
      source.data,
      source.questionChoices,
      source.questionType
    );
  }

  unmap(source: Question): QuestionDTO {
    return {
      id: source.id,
      question: source.question,
      answer: source.answer,
      data: source.data,
      questionChoices: source.questionChoices,
      questionType: source.questionType,
    } as QuestionDTO;
  }
}
