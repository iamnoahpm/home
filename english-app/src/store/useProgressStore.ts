import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserProgress, ExerciseScore } from '../types/user';

interface ProgressStore extends UserProgress {
  setGrade: (grade: 6 | 7 | 8 | 9) => void;
  recordScore: (score: ExerciseScore) => void;
  recordPronunciationAttempt: (itemId: string) => void;
  markVocabMastered: (itemId: string) => void;
  touchStreak: () => void;
  getBestScore: (exerciseId: string) => ExerciseScore | undefined;
  getExerciseAttempts: (exerciseId: string) => ExerciseScore[];
}

const today = () => new Date().toISOString().split('T')[0];

export const useProgressStore = create<ProgressStore>()(
  persist(
    (set, get) => ({
      selectedGrade: 6,
      completedExercises: {},
      pronunciationAttempts: {},
      vocabularyMastered: [],
      streak: { current: 0, longest: 0, lastActivityDate: '' },

      setGrade: (grade) => set({ selectedGrade: grade }),

      recordScore: (score) =>
        set((state) => {
          const prev = state.completedExercises[score.exerciseId] ?? [];
          return {
            completedExercises: {
              ...state.completedExercises,
              [score.exerciseId]: [...prev, score],
            },
          };
        }),

      recordPronunciationAttempt: (itemId) =>
        set((state) => ({
          pronunciationAttempts: {
            ...state.pronunciationAttempts,
            [itemId]: (state.pronunciationAttempts[itemId] ?? 0) + 1,
          },
        })),

      markVocabMastered: (itemId) =>
        set((state) => ({
          vocabularyMastered: state.vocabularyMastered.includes(itemId)
            ? state.vocabularyMastered
            : [...state.vocabularyMastered, itemId],
        })),

      touchStreak: () =>
        set((state) => {
          const todayStr = today();
          const { streak } = state;
          if (streak.lastActivityDate === todayStr) return {};
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const yStr = yesterday.toISOString().split('T')[0];
          const newCurrent =
            streak.lastActivityDate === yStr ? streak.current + 1 : 1;
          return {
            streak: {
              current: newCurrent,
              longest: Math.max(newCurrent, streak.longest),
              lastActivityDate: todayStr,
            },
          };
        }),

      getBestScore: (exerciseId) => {
        const attempts = get().completedExercises[exerciseId];
        if (!attempts || attempts.length === 0) return undefined;
        return attempts.reduce((best, cur) =>
          cur.score > best.score ? cur : best
        );
      },

      getExerciseAttempts: (exerciseId) =>
        get().completedExercises[exerciseId] ?? [],
    }),
    {
      name: 'eng-app-progress-v1',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
