import { useState } from 'react';
import { IQuizQuestionBool, IQuizQuestionDefault, IQuizQuestionMultiple } from '../../domain/IQuestions';
import { IQuestionService } from '../../domain/services/IQuizService';

export const QuestionViewModel = (questionService: IQuestionService) => {
  const [quizQuestions, setQuizQuestions] = useState<(IQuizQuestionMultiple | IQuizQuestionDefault | IQuizQuestionBool)[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [answers, setAnswers] = useState<string[]>([]);
  const [results, setResults] = useState<{ correctAnswers: number; incorrectAnswers: number; totalQuestions: number; score: number } | null>(null);
  const [quizFinished, setQuizFinished] = useState<boolean>(false); 

  const loadRandomQuizQuestions = async () => {
    setLoading(true);
    setError(null);
    try {
      const questions = await questionService.loadRandomQuizQuestions();
      setQuizQuestions(questions);
      setCurrentQuestionIndex(0);
      setAnswers([]);
      setResults(null);
      setQuizFinished(false); 
    } catch (err) {
      setError("Failed to load quiz questions.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex !== null && currentQuestionIndex < quizQuestions.length - 1) {
      if (selectedOption !== null) {
        const newAnswers = [...answers];
        newAnswers[currentQuestionIndex] = selectedOption;
        setAnswers(newAnswers);
      }
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    }
  };

  const finishQuiz = () => {
    const correctAnswers = answers.filter((answer, index) => {
      const question = quizQuestions[index];
      return answer === question.correct_answer; 
    }).length;

    const totalQuestions = answers.length;
    const incorrectAnswers = totalQuestions - correctAnswers;
    const score = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;

    setResults({
      correctAnswers,
      incorrectAnswers,
      totalQuestions,
      score,
    });
    setQuizFinished(true);
  };

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleDotClick = (index: number) => {
    if (index <= answers.length) {
      setSelectedOption(answers[index]);
      setCurrentQuestionIndex(index);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(null);
    setAnswers([]);
    setSelectedOption(null);
    setResults(null);
    setQuizFinished(false); 
  };

  return {
    quizQuestions,
    loading,
    error,
    currentQuestionIndex,
    selectedOption,
    answers,
    results,
    quizFinished, 
    nextQuestion,
    finishQuiz,
    resetQuiz,
    handleOptionChange,
    handleDotClick,
    loadRandomQuizQuestions
  };
};
