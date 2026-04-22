import { ListeningExercise } from '../../types/curriculum';

export const grade7Unit2Listening: ListeningExercise[] = [
  {
    id: 'g7-u2-fb-1',
    grade: 7,
    unit: 2,
    unitTitle: 'Health',
    title: 'Fill in the Blank: Doctor\'s Advice',
    titleVi: 'Điền vào chỗ trống: Lời khuyên của bác sĩ',
    audioText:
      "Good morning everyone. I am Doctor Lan. Today I want to talk about staying healthy. First, you should exercise for at least thirty minutes every day. Second, eat more vegetables and fruits. They give your body important vitamins. Third, drink eight glasses of water each day. Fourth, try to sleep for eight to nine hours every night. Fifth, limit your screen time to two hours a day. If you follow these tips, you will feel much better.",
    difficulty: 'easy',
    questions: [
      {
        type: 'fill-blank',
        id: 'g7-u2-fb-1-q1',
        template: 'You should ___ for at least thirty minutes every day.',
        answer: 'exercise',
        hint: 'hoạt động thể chất',
        explanation: '"You should exercise for at least thirty minutes every day."',
      },
      {
        type: 'fill-blank',
        id: 'g7-u2-fb-1-q2',
        template: 'Eat more ___ and fruits.',
        answer: 'vegetables',
        hint: 'rau, củ',
        explanation: '"Eat more vegetables and fruits."',
      },
      {
        type: 'fill-blank',
        id: 'g7-u2-fb-1-q3',
        template: 'Drink eight glasses of ___ each day.',
        answer: 'water',
        hint: 'đồ uống',
        explanation: '"Drink eight glasses of water each day."',
      },
      {
        type: 'fill-blank',
        id: 'g7-u2-fb-1-q4',
        template: 'Try to ___ for eight to nine hours every night.',
        answer: 'sleep',
        hint: 'nghỉ ngơi',
        explanation: '"Try to sleep for eight to nine hours every night."',
      },
      {
        type: 'fill-blank',
        id: 'g7-u2-fb-1-q5',
        template: 'Limit your ___ time to two hours a day.',
        answer: 'screen',
        hint: 'màn hình điện tử',
        explanation: '"Limit your screen time to two hours a day."',
      },
    ],
  },
];
