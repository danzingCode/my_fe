
import { IQuizQuestionBool, IQuizQuestionDefault, IQuizQuestionMultiple } from '../../domain/IQuestions';
import { IQuestionDataSource } from '../sources/IQuestionDataSource';


export const QuizRepository = (questionDataSource: IQuestionDataSource) => {
  const getQuizQuestions = async (): Promise<(IQuizQuestionMultiple | IQuizQuestionBool | IQuizQuestionDefault)[]> => {
    return await questionDataSource.getQuestions();
  };

  return {
    getQuizQuestions
  };
};
