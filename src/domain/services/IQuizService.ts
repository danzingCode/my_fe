import { IQuizQuestionBool, IQuizQuestionDefault, IQuizQuestionMultiple } from '../IQuestions';

export interface IQuestionService {
  loadRandomQuizQuestions: () => Promise<(IQuizQuestionMultiple | IQuizQuestionBool | IQuizQuestionDefault)[]>;
}
