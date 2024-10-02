import React from 'react';
import { IQuestionRepository } from "../../data/repositories/IQuizRepository";
import { QuizRepository } from "../../data/repositories/QuizRepository";
import { QuizLocalDataSource } from "../../data/sources/QuizLocalDataSource";
import { QuestionService } from "../../domain/services/QuizService";
import { Button, Typography, Paper } from '@mui/material';
import { QuestionViewModel } from './Viewmodel';
import { motion } from 'framer-motion';
import QuizQuestionBool from './Components/QuizQuestionBool';
import QuizQuestionDefault from './Components/QuizQuestionDefault';
import QuizQuestionMultiple from './Components/QuizQuestionMultiple';
import { IQuizQuestionBool, IQuizQuestionMultiple } from '../../domain/IQuestions';


const QuizView: React.FC = () => {
  const quizRepository: IQuestionRepository = QuizRepository(QuizLocalDataSource);
  const questionService = QuestionService(quizRepository);
  const { 
    quizQuestions, 
    loading, 
    error, 
    currentQuestionIndex, 
    selectedOption, 
    nextQuestion, 
    handleOptionChange, 
    handleDotClick, 
    loadQuizQuestions 
  } = QuestionViewModel(questionService);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
      <Typography variant="h3" gutterBottom>
        Welcome to the Quiz
      </Typography>

      {loading && <Typography>Loading...</Typography>}
      {error && <Typography color="error">{error}</Typography>}

      {currentQuestionIndex === null ? (
        <Button variant="contained" color="primary" onClick={loadQuizQuestions}>
          Start Quiz
        </Button>
      ) : (
        <Paper elevation={3} style={{ padding: '16px', marginTop: '16px', width: '700px', height: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'start' }}>
          {quizQuestions.length > 0 && currentQuestionIndex !== null && (
            <motion.div
              key={currentQuestionIndex}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start' }}
            >
              <Typography variant="h6" style={{ textAlign: 'left' }}>
                <strong>Question {currentQuestionIndex + 1}:</strong> {quizQuestions[currentQuestionIndex].question}
              </Typography>
              <Typography variant="subtitle1" style={{ textAlign: 'left' }}>
                <strong>Category:</strong> {quizQuestions[currentQuestionIndex].category}
              </Typography>
              <Typography variant="subtitle1" style={{ textAlign: 'left' }}>
                <strong>Difficulty:</strong> {quizQuestions[currentQuestionIndex].difficulty}
              </Typography>
              {quizQuestions[currentQuestionIndex].type === 'multiple' && 
                <QuizQuestionMultiple 
                  question={quizQuestions[currentQuestionIndex] as IQuizQuestionMultiple} 
                  selectedOption={selectedOption} 
                  onOptionChange={handleOptionChange} 
                />}
               {quizQuestions[currentQuestionIndex].type === 'boolean' && 
                <QuizQuestionBool 
                  question={quizQuestions[currentQuestionIndex] as IQuizQuestionBool} 
                  selectedOption={selectedOption} 
                  onOptionChange={handleOptionChange} 
                />}
              {quizQuestions[currentQuestionIndex].type === 'text' && 
                <QuizQuestionDefault 
                  question={quizQuestions[currentQuestionIndex]} 
                  selectedOption={selectedOption} 
                  onOptionChange={handleOptionChange} 
                />
              }
            </motion.div>
          )}
          <Button variant="contained" color="primary" onClick={nextQuestion} style={{ marginTop: '16px', alignSelf: 'flex-end' }}>
            Next Question
          </Button>

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
            {quizQuestions.map((_, index) => (
              <div 
                key={index} 
                onClick={() => handleDotClick(index)} 
                style={{
                  height: '10px', 
                  width: '10px', 
                  borderRadius: '50%', 
                  backgroundColor: index < currentQuestionIndex ? 'grey' : (index === currentQuestionIndex ? 'white' : 'lightgrey'),
                  margin: '0 5px',
                  cursor: 'pointer'
                }} 
              />
            ))}
          </div>
        </Paper>
      )}
    </div>
  );
};

export default QuizView;
