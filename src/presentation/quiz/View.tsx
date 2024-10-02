import React from 'react';
import { IQuestionRepository } from "../../data/repositories/IQuizRepository";
import { QuizRepository } from "../../data/repositories/QuizRepository";
import { QuizLocalDataSource } from "../../data/sources/QuizLocalDataSource";
import { QuestionService } from "../../domain/services/QuizService";
import { Button, Typography, Paper, Box } from '@mui/material';
import { QuestionViewModel } from './Viewmodel';
import { motion } from 'framer-motion';
import QuizQuestionBool from './Components/QuizQuestionBool';
import QuizQuestionDefault from './Components/QuizQuestionDefault';
import QuizQuestionMultiple from './Components/QuizQuestionMultiple';
import { IQuizQuestionMultiple } from '../../domain/IQuestions';

const QuizView: React.FC = () => {
  const quizRepository: IQuestionRepository = QuizRepository(QuizLocalDataSource);
  const questionService = QuestionService(quizRepository);
  const { 
    quizQuestions, 
    loading, 
    error, 
    currentQuestionIndex, 
    selectedOption, 
    answers,
    nextQuestion, 
    handleOptionChange, 
    handleDotClick, 
    loadQuizQuestions 
  } = QuestionViewModel(questionService);

  return (
    <Box sx={styles.container}>
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
        <>
          <Typography variant="h6" sx={{ textAlign: 'center', width: '100%' }}>
            <strong>Question {currentQuestionIndex + 1}/{quizQuestions.length}</strong>
          </Typography>
          
          <Paper elevation={3} sx={styles.paper}>
            {quizQuestions.length > 0 && currentQuestionIndex !== null && (
              <motion.div
                key={currentQuestionIndex}
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column' as 'column',
                  justifyContent: 'center' as 'center',
                  alignItems: 'flex-start' as 'flex-start',
                }}
              >
                <Typography variant="h6" sx={{ textAlign: 'left' }}>
                  {quizQuestions[currentQuestionIndex].question}
                </Typography>
                <Typography variant="subtitle1" sx={{ textAlign: 'left' }}>
                  <strong>Category:</strong> {quizQuestions[currentQuestionIndex].category}
                </Typography>
                <Typography variant="subtitle1" sx={{ textAlign: 'left' }}>
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
                    selectedOption={selectedOption} 
                    onOptionChange={handleOptionChange} 
                  />}
                {quizQuestions[currentQuestionIndex].type === 'text' && 
                  <QuizQuestionDefault 
                    selectedOption={selectedOption} 
                    onOptionChange={handleOptionChange} 
                  />}
              </motion.div>
            )}

            <Button 
              variant="contained" 
              color="primary" 
              onClick={nextQuestion} 
              sx={styles.nextButton} 
              disabled={selectedOption == null}
            >
              Next Question
            </Button>
          </Paper>

          {/* Indicator */}
          <Box sx={styles.indicatorContainer}>
            {quizQuestions.map((_, index) => (
              <div 
                key={index} 
                onClick={() => handleDotClick(index)} 
                style={{
                  ...styles.indicatorDot, 
                  backgroundColor: index < currentQuestionIndex ? 'grey' : (index === currentQuestionIndex ? '#2596be' : 'lightgrey'),
                  cursor: index <= answers.length ? 'pointer' : 'not-allowed'
                }} 
              />
            ))}
          </Box>
        </>
      )}
    </Box>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    width: '100%',
    minWidth: '320px',
    maxWidth: '1200px',
    margin: '0 auto',
    '@media (max-width: 600px)': {
      padding: '10px',
      height: '100vh',
      minWidth: '50px',
      maxWidth: '100vh',
    },
  },
  paper: {
    padding: '16px',
    marginTop: '16px',
    width: '100%',
    minHeight: '400px',
    minWidth: '300px',
    maxWidth: '700px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
    '@media (max-width: 600px)': {
      margin: '20px',
      minHeight: '400px',
      minWidth: '100px',
    },
  },
  questionContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  nextButton: {
    marginTop: '16px',
    alignSelf: 'flex-end',
    width: '100%',
    '@media (min-width: 600px)': {
      width: 'auto',
    },
  },
  indicatorContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '16px',
    width: '100%',
    flexWrap: 'wrap', // Allow wrapping for dots
    maxWidth: '700px', // Match the width of the Paper component
    '@media (min-width: 600px)': {
      width: 'auto',
    },
  },
  indicatorDot: {
    height: '10px',
    width: '10px',
    borderRadius: '50%',
    margin: '0 5px',
  },
};

export default QuizView;
