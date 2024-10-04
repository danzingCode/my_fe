import { IQuestionRepository } from '../../data/repositories/IQuizRepository';
import { IQuizQuestionBool, IQuizQuestionDefault, IQuizQuestionMultiple } from '../IQuestions';

export const QuestionService = (questionRepository: IQuestionRepository) => {
  const shuffleArray = <T>(array: T[]): T[] => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
  
  const loadRandomQuizQuestions = async (): Promise<(IQuizQuestionMultiple | IQuizQuestionBool | IQuizQuestionDefault)[]> => {
    const questions = await questionRepository.getQuizQuestions();
    return shuffleArray([...questions]);
  };

  return {
    loadRandomQuizQuestions,
  };
};
