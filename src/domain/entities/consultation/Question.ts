export default class Question {
  question: string;
  answer: any;
  data: string;

  constructor(question: string, answer: any, data: string) {
    this.question = question;
    this.answer = answer;
    this.data = data;
  }
}
