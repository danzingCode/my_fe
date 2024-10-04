import React, { useState } from 'react';
import { IQuestionRepository } from "../../data/repositories/IQuizRepository";
import { QuizRepository } from "../../data/repositories/QuizRepository";
import { QuizLocalDataSource } from "../../data/sources/QuizLocalDataSource";
import { QuestionService } from "../../domain/services/QuizService";
import { Button, Typography, Paper, Box, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { QuestionViewModel } from './Viewmodel';
import { motion } from 'framer-motion';
import QuizQuestionBool from './Components/QuizQuestionBool';
import QuizQuestionDefault from './Components/QuizQuestionDefault';
import QuizQuestionMultiple from './Components/QuizQuestionMultiple';
import { IQuizQuestionMultiple } from '../../domain/IQuestions';
import { quizStyles } from './Styles';

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
    results,
    quizFinished,
    nextQuestion, 
    finishQuiz, 
    resetQuiz, 
    handleOptionChange, 
    handleDotClick, 
    loadRandomQuizQuestions 
  } = QuestionViewModel(questionService);
  
  const [openFinishDialog, setOpenFinishDialog] = useState(false);

  const handleFinishQuiz = () => {
    setOpenFinishDialog(true);
  };

  const handleConfirmFinish = () => {
    finishQuiz(); 
    setOpenFinishDialog(false);
  };

  const handleCloseDialog = () => {
    setOpenFinishDialog(false);
  };

  return (
    <Box sx={quizStyles.container}>
      <Typography variant="h3" gutterBottom>
        Welcome to the Quiz
      </Typography>

      {loading && <Typography>Loading...</Typography>}
      {error && <Typography color="error">{error}</Typography>}

      {quizFinished ? (
        <Paper elevation={3} sx={quizStyles.paper}>
          <Typography variant="h6" sx={{ textAlign: 'center' }}>
            Quiz Summary
          </Typography>
          <Typography variant="subtitle1">
            Correct Answers: {results?.correctAnswers}
          </Typography>
          <Typography variant="subtitle1">
            Incorrect Answers: {results?.incorrectAnswers}
          </Typography>
          <Typography variant="subtitle1">
            Total Questions: {results?.totalQuestions}
          </Typography>
          <Typography variant="subtitle1">
            Final Score: {results?.score.toFixed(2)}%
          </Typography>

          <Button 
            variant="contained" 
            color="primary" 
            onClick={resetQuiz}
            sx={{ marginTop: '16px' }}
          >
            Restart Quiz
          </Button>
        </Paper>
      ) : (
        currentQuestionIndex === null ? (
          <Button variant="contained" color="primary" onClick={loadRandomQuizQuestions}>
            Start Quiz
          </Button>
        ) : (
          <>
            <Typography variant="h6" sx={{ textAlign: 'center', width: '100%' }}>
              <strong>Question {currentQuestionIndex + 1}/{quizQuestions.length}</strong>
            </Typography>
            
            <Paper elevation={3} sx={quizStyles.paper}>
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
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
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
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={nextQuestion} 
                sx={quizStyles.nextButton} 
                disabled={selectedOption == null}
              >
                {currentQuestionIndex === quizQuestions.length - 1 ? 'Finish Quiz' : 'Next Question'}
              </Button>
              <Button 
                variant="outlined" 
                color="secondary" 
                onClick={handleFinishQuiz} 
                sx={quizStyles.finishButton}
              >
                Finish
              </Button>
            </Box>
            </Paper>
            <Box sx={quizStyles.indicatorContainer}>
              {quizQuestions.map((_, index) => (
                <div 
                  key={index} 
                  onClick={() => handleDotClick(index)} 
                  style={{
                    ...quizStyles.indicatorDot, 
                    backgroundColor: index < currentQuestionIndex ? 'grey' : (index === currentQuestionIndex ? '#2596be' : 'lightgrey'),
                    cursor: index <= answers.length ? 'pointer' : 'not-allowed'
                  }} 
                />
              ))}
            </Box>
          </>
        )
      )}

      <Dialog open={openFinishDialog} onClose={handleCloseDialog}>
        <DialogTitle>Finish Quiz</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to finish the quiz early?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
          <Button onClick={handleConfirmFinish} color="secondary">Finish</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default QuizView;
