import React from 'react';
import { RadioGroup, FormControlLabel, Radio, Typography } from '@mui/material';
import { IQuizQuestionBool } from '../../../domain/IQuestions';

interface QuizQuestionBoolProps {
  question: IQuizQuestionBool;
  selectedOption: string | null;
  onOptionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const QuizQuestionBool: React.FC<QuizQuestionBoolProps> = ({ question, selectedOption, onOptionChange }) => {
  return (
    <div style={{ marginTop: '16px', width: '100%' }}>
      <Typography variant="h6">{question.question}</Typography>
      <RadioGroup 
        value={selectedOption || ''} 
        onChange={onOptionChange} 
        style={{ marginTop: '16px', width: '100%' }}
      >
        <FormControlLabel value="True" control={<Radio />} label="True" />
        <FormControlLabel value="False" control={<Radio />} label="False" />
      </RadioGroup>
    </div>
  );
};

export default QuizQuestionBool;
