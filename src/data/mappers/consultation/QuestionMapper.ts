import "reflect-metadata";
import IMapper from "../IMapper";
import QuestionDTO from "../../models/consultation/QuestionDTO";
import Question from "../../../domain/entities/consultation/Question";
import {injectable} from "inversify";

@injectable()
export default class QuestionMapper implements IMapper<QuestionDTO, Question> {
  map(source: QuestionDTO): Question {
    return new Question(source.question, source.answer, source.data);
  }

  unmap(source: Question): QuestionDTO {
    return source;
  }
}
