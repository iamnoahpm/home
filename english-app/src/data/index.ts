import { grade6Unit1Listening } from './grade6/unit1-listening';
import { grade6Unit2Listening } from './grade6/unit2-listening';
import { grade6Unit3Listening } from './grade6/unit3-listening';
import { grade6Unit1Pronunciation } from './grade6/unit1-pronunciation';
import { grade6Unit1Vocabulary } from './grade6/unit1-vocabulary';
import { grade7Unit1Listening } from './grade7/unit1-listening';
import { grade7Unit2Listening } from './grade7/unit2-listening';
import { grade7Unit1Pronunciation } from './grade7/unit1-pronunciation';
import { grade7Unit1Vocabulary } from './grade7/unit1-vocabulary';
import { ListeningExercise, PronunciationItem, VocabularyItem } from '../types/curriculum';

export const ALL_LISTENING_EXERCISES: ListeningExercise[] = [
  ...grade6Unit1Listening,
  ...grade6Unit2Listening,
  ...grade6Unit3Listening,
  ...grade7Unit1Listening,
  ...grade7Unit2Listening,
];

export const EXERCISE_MAP = new Map<string, ListeningExercise>(
  ALL_LISTENING_EXERCISES.map((ex) => [ex.id, ex])
);

export const EXERCISES_BY_GRADE_UNIT: Record<number, Record<number, ListeningExercise[]>> =
  ALL_LISTENING_EXERCISES.reduce(
    (acc, ex) => {
      if (!acc[ex.grade]) acc[ex.grade] = {};
      if (!acc[ex.grade][ex.unit]) acc[ex.grade][ex.unit] = [];
      acc[ex.grade][ex.unit].push(ex);
      return acc;
    },
    {} as Record<number, Record<number, ListeningExercise[]>>
  );

export const ALL_PRONUNCIATION_ITEMS: PronunciationItem[] = [
  ...grade6Unit1Pronunciation,
  ...grade7Unit1Pronunciation,
];

export const PRONUNCIATION_BY_GRADE_UNIT: Record<number, Record<number, PronunciationItem[]>> =
  ALL_PRONUNCIATION_ITEMS.reduce(
    (acc, item) => {
      if (!acc[item.grade]) acc[item.grade] = {};
      if (!acc[item.grade][item.unit]) acc[item.grade][item.unit] = [];
      acc[item.grade][item.unit].push(item);
      return acc;
    },
    {} as Record<number, Record<number, PronunciationItem[]>>
  );

export const ALL_VOCAB_ITEMS: VocabularyItem[] = [
  ...grade6Unit1Vocabulary,
  ...grade7Unit1Vocabulary,
];

export const VOCAB_BY_GRADE_UNIT: Record<number, Record<number, VocabularyItem[]>> =
  ALL_VOCAB_ITEMS.reduce(
    (acc, item) => {
      if (!acc[item.grade]) acc[item.grade] = {};
      if (!acc[item.grade][item.unit]) acc[item.grade][item.unit] = [];
      acc[item.grade][item.unit].push(item);
      return acc;
    },
    {} as Record<number, Record<number, VocabularyItem[]>>
  );

export const UNIT_TITLES: Record<number, Record<number, string>> = {
  6: { 1: 'My New School', 2: 'My Home', 3: 'My Friends' },
  7: { 1: 'My Hobbies', 2: 'Health' },
};
