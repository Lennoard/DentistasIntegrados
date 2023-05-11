import {QuestionType} from "../../ConsultationType";

export default class Question {
  question: string;
  answer: any;
  data: string;
  questionChoices: string[] | null;
  questionType: QuestionType = QuestionType.Bool;

  constructor(
    question: string,
    answer: any,
    data: string,
    questionChoices: string[] | null,
    questionType: QuestionType
  ) {
    this.question = question;
    this.answer = answer;
    this.data = data;
    this.questionChoices = questionChoices;
    this.questionType = questionType;
  }
}
