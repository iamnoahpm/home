export interface ExerciseScore {
  exerciseId: string;
  score: number;
  total: number;
  correct: number;
  attemptedAt: string;
  durationMs: number;
}

export interface UserProgress {
  selectedGrade: 6 | 7 | 8 | 9;
  completedExercises: Record<string, ExerciseScore[]>;
  pronunciationAttempts: Record<string, number>;
  vocabularyMastered: string[];
  streak: {
    current: number;
    longest: number;
    lastActivityDate: string;
  };
}
