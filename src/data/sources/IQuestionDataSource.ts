import { IQuizQuestionMultiple, IQuizQuestionBool, IQuizQuestionDefault } from "../../domain/IQuestions";

export interface IQuestionDataSource {
  getQuestions: () => Promise<(IQuizQuestionMultiple | IQuizQuestionBool | IQuizQuestionDefault)[]>;
}
