import { IQuestionDataSource } from './IQuestionDataSource';
import { IQuizQuestionMultiple, IQuizQuestionBool, IQuizQuestionDefault } from "../../domain/IQuestions";

export const QuizNetworkDataSource: IQuestionDataSource = {
  getQuestions: async () => {
    const response = await fetch('https://your-api-url.com/questions');
    const data = await response.json();
    return data.results as (IQuizQuestionMultiple | IQuizQuestionBool | IQuizQuestionDefault)[];
  },
};
