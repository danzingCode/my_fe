import React from 'react';

import { TextField } from '@mui/material';

interface QuizQuestionDefaultProps {
  selectedOption: string | null;
  onOptionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const QuizQuestionDefault: React.FC<QuizQuestionDefaultProps> = ({ selectedOption, onOptionChange }) => {
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
