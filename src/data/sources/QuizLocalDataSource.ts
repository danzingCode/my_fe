import { IQuestionDataSource } from './IQuestionDataSource';
import data from './data.json';
import { IQuizQuestionMultiple, IQuizQuestionBool, IQuizQuestionDefault } from "../../domain/IQuestions";

export const QuizLocalDataSource: IQuestionDataSource = {
  getQuestions: async () => {
    return data.results as (IQuizQuestionMultiple | IQuizQuestionBool | IQuizQuestionDefault)[];
  },
};
