import { QuestionService } from "../services/QuizService";

describe('QuestionService - shuffleArray', () => {
  it('should return a shuffled array and reshuffle it differently on the next call', async () => {
    const mockQuestions = [1, 2, 3, 4, 5];

    const questionRepository = {
      getQuizQuestions: jest.fn().mockResolvedValue(mockQuestions),
    };

    const { loadRandomQuizQuestions } = QuestionService(questionRepository);

    const firstShuffle = await loadRandomQuizQuestions();
    console.log('First Shuffle:', firstShuffle);
    console.log('Mock Questions:', mockQuestions);

    expect(firstShuffle).not.toStrictEqual(mockQuestions);

    const secondShuffle = await loadRandomQuizQuestions();
    console.log('Second Shuffle:', secondShuffle);

    expect(firstShuffle).not.toStrictEqual(secondShuffle);
    expect(secondShuffle).not.toStrictEqual(mockQuestions);
  });
});
