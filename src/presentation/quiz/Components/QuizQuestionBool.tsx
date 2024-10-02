import React from 'react';
import { RadioGroup, FormControlLabel, Radio } from '@mui/material';

interface QuizQuestionBoolProps {
  selectedOption: string | null;
  onOptionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const QuizQuestionBool: React.FC<QuizQuestionBoolProps> = ({ selectedOption, onOptionChange }) => {
  return (
    <div style={{ marginTop: '16px', width: '100%' }}>
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
