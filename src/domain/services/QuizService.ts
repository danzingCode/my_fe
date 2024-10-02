import { IQuestionRepository } from '../../data/repositories/IQuizRepository';
import { IQuizQuestionBool, IQuizQuestionDefault, IQuizQuestionMultiple } from '../IQuestions';

export const QuestionService = (questionRepository: IQuestionRepository) => {
  const loadQuizQuestions = async (): Promise<(IQuizQuestionMultiple | IQuizQuestionBool | IQuizQuestionDefault)[]> => {
    return await questionRepository.getQuizQuestions();
  };

  return {
    loadQuizQuestions,
  };
};
