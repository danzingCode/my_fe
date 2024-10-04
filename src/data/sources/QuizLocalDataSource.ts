import { IQuestionDataSource } from './IQuestionDataSource';
import data from './data.json';
import { IQuizQuestionMultiple, IQuizQuestionBool, IQuizQuestionDefault } from "../../domain/IQuestions";

const decodeHtml = (html: string): string => {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
};

export const QuizLocalDataSource: IQuestionDataSource = {
  getQuestions: async () => {
    return data.results.map((question) => {
      const decodedQuestion = {
        ...question,
        question: decodeHtml(question.question), 
      };
      return decodedQuestion as (IQuizQuestionMultiple | IQuizQuestionBool | IQuizQuestionDefault);
    });
  },
};
