import { IQuizQuestionBool, IQuizQuestionDefault, IQuizQuestionMultiple } from '../IQuestions';

export interface IQuestionService {
  loadQuizQuestions: () => Promise<(IQuizQuestionMultiple | IQuizQuestionBool | IQuizQuestionDefault)[]>;
}
