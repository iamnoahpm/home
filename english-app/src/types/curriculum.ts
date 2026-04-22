export type QuestionType = 'true-false' | 'multiple-choice' | 'fill-blank' | 'matching';

export interface TrueFalseQuestion {
  type: 'true-false';
  id: string;
  text: string;
  answer: boolean;
  explanation?: string;
}

export interface MultipleChoiceQuestion {
  type: 'multiple-choice';
  id: string;
  text: string;
  options: string[];
  answer: number;
  explanation?: string;
}

export interface FillBlankQuestion {
  type: 'fill-blank';
  id: string;
  template: string;
  answer: string;
  hint?: string;
  explanation?: string;
}

export interface MatchingQuestion {
  type: 'matching';
  id: string;
  instruction?: string;
  leftItems: string[];
  rightItems: string[];
  answers: number[];
}

export type Question =
  | TrueFalseQuestion
  | MultipleChoiceQuestion
  | FillBlankQuestion
  | MatchingQuestion;

export interface ListeningExercise {
  id: string;
  grade: 6 | 7 | 8 | 9;
  unit: number;
  unitTitle: string;
  title: string;
  titleVi: string;
  audioText: string;
  questions: Question[];
  difficulty: 'easy' | 'medium';
}

export interface PronunciationItem {
  id: string;
  word: string;
  phonetic: string;
  partOfSpeech: string;
  exampleSentence: string;
  exampleSentenceVi: string;
  grade: 6 | 7 | 8 | 9;
  unit: number;
  focusSound?: string;
}

export interface VocabularyItem {
  id: string;
  word: string;
  phonetic?: string;
  partOfSpeech: string;
  definitionVi: string;
  exampleSentence: string;
  exampleSentenceVi: string;
  grade: 6 | 7 | 8 | 9;
  unit: number;
  imageEmoji?: string;
}

export interface GrammarRule {
  id: string;
  title: string;
  titleVi: string;
  formula: string;
  examples: Array<{ en: string; vi: string }>;
  grade: 6 | 7 | 8 | 9;
  unit: number;
  notes?: string;
}
