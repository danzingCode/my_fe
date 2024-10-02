import React from 'react';

import { TextField } from '@mui/material';
import { IQuizQuestionDefault } from '../../../domain/IQuestions';

interface QuizQuestionDefaultProps {
  question: IQuizQuestionDefault;
  selectedOption: string | null;
  onOptionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const QuizQuestionDefault: React.FC<QuizQuestionDefaultProps> = ({ question, selectedOption, onOptionChange }) => {
  return (
    <TextField
      label="Your Answer"
      variant="outlined"
      fullWidth
      value={selectedOption || ""}
      onChange={onOptionChange}
      style={{ marginTop: '16px' }}
    />
  );
};

export default QuizQuestionDefault;
