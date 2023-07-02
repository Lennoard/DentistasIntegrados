export default interface QuestionDTO {
  id: string,
  question: string;
  answer: any | null;
  data: string | null;
  questionChoices: string[] | null;
  questionType: number;
}
