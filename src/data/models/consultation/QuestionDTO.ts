export default interface QuestionDTO {
  question: string;
  answer: any;
  data: string;
  questionChoices: string[] | null;
  questionType: number;
}
