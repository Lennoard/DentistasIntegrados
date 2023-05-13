import {QuestionType} from "../../ConsultationType";

export default class Question {
  constructor(
    public question: string,
    public answer: any,
    public data: string,
    public questionChoices: string[] | null,
    public questionType: QuestionType = QuestionType.Bool
  ) { }
}
