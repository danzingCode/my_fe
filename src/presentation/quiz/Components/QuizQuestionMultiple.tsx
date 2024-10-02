import React from 'react';

import { RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { IQuizQuestionMultiple } from '../../../domain/IQuestions';

interface QuizQuestionMultipleProps {
  question: IQuizQuestionMultiple;
  selectedOption: string | null;
  onOptionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const QuizQuestionMultiple: React.FC<QuizQuestionMultipleProps> = ({ question, selectedOption, onOptionChange }) => {
  return (
    <RadioGroup value={selectedOption} onChange={onOptionChange} style={{ marginTop: '16px', width: '100%' }}>
      {question.incorrect_answers.map((option, idx) => (
        <FormControlLabel key={idx} value={option} control={<Radio />} label={option} />
      ))}
      <FormControlLabel value={question.correct_answer} control={<Radio />} label={question.correct_answer} />
    </RadioGroup>
  );
};

export default QuizQuestionMultiple;
