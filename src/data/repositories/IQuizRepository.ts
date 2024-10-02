import { IQuizQuestionBool, IQuizQuestionDefault, IQuizQuestionMultiple } from '../../domain/IQuestions';

export interface IQuestionRepository {
  getQuizQuestions: () => Promise<(IQuizQuestionMultiple | IQuizQuestionBool | IQuizQuestionDefault)[]>;
}
