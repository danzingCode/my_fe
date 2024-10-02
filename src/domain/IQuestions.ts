export interface IQuizQuestionDefault {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
}

export interface IQuizQuestionMultiple extends IQuizQuestionDefault {
  incorrect_answers: string[];
}

export interface IQuizQuestionBool extends IQuizQuestionDefault {
  incorrect_answers: string[];
}

