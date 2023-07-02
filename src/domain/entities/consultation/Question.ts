import {QuestionType} from "../../ConsultationType";

export default class Question {
  constructor(
    public id: string,
    public question: string,
    public answer: any | null,
    public data: string | null,
    public questionChoices: string[] | null,
    public questionType: QuestionType = QuestionType.Bool
  ) { }
}
