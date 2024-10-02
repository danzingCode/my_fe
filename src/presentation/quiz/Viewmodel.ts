import { useEffect, useState } from 'react';
import { IQuizQuestionBool, IQuizQuestionDefault, IQuizQuestionMultiple } from '../../domain/IQuestions';
import { IQuestionService } from '../../domain/services/IQuizService';

export const QuestionViewModel = (questionService: IQuestionService) => {
  const [quizQuestions, setQuizQuestions] = useState<(IQuizQuestionMultiple | IQuizQuestionDefault | IQuizQuestionBool)[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [answers, setAnswers] = useState<string[]>([]); // Store the answers for each question

  useEffect(() => {
    loadQuizQuestions();
  }, []);

  const loadQuizQuestions = async () => {
    setLoading(true);
    setError(null);
    try {
      const questions = await questionService.loadQuizQuestions();
      setQuizQuestions(questions);
      setCurrentQuestionIndex(0); // Start with the first question
      setAnswers(new Array(questions.length).fill(null)); // Initialize answers array
    } catch (err) {
      setError("Failed to load quiz questions.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex !== null && currentQuestionIndex < quizQuestions.length - 1) {
      // Save the selected option before moving to the next question
      if (selectedOption !== null) {
        const newAnswers = [...answers];
        newAnswers[currentQuestionIndex] = selectedOption; // Save current answer
        setAnswers(newAnswers);
      }
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null); // Reset selected option for the new question
    }
  };

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  // Handle dot click to navigate to a previous question
  const handleDotClick = (index: number) => {
    setSelectedOption(answers[index]); // Set the selected option based on saved answers
    setCurrentQuestionIndex(index); // Move to the clicked question
  };

  return {
    quizQuestions,
    loading,
    error,
    currentQuestionIndex,
    selectedOption,
    nextQuestion,
    handleOptionChange,
    answers,
    handleDotClick, // Ensure handleDotClick is included
    loadQuizQuestions
  };
};
