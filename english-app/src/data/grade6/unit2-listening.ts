import { ListeningExercise } from '../../types/curriculum';

export const grade6Unit2Listening: ListeningExercise[] = [
  {
    id: 'g6-u2-fb-1',
    grade: 6,
    unit: 2,
    unitTitle: 'My Home',
    title: 'Fill in the Blank: Linh\'s House',
    titleVi: 'Điền vào chỗ trống: Nhà của Linh',
    audioText:
      "Hi, I'm Linh. I live in a house in Ha Noi. My house has two floors. On the first floor, there is a living room and a kitchen. On the second floor, there are three bedrooms and one bathroom. My favourite room is my bedroom. It is on the second floor. My bedroom has a bed, a desk, and a bookshelf. My family has five members.",
    difficulty: 'easy',
    questions: [
      {
        type: 'fill-blank',
        id: 'g6-u2-fb-1-q1',
        template: 'Linh lives in a house in ___.',
        answer: 'Ha Noi',
        hint: 'tên thành phố',
        explanation: '"I live in a house in Ha Noi."',
      },
      {
        type: 'fill-blank',
        id: 'g6-u2-fb-1-q2',
        template: "Linh's house has ___ floors.",
        answer: 'two',
        hint: 'số',
        explanation: '"My house has two floors."',
      },
      {
        type: 'fill-blank',
        id: 'g6-u2-fb-1-q3',
        template: 'On the first floor, there is a living room and a ___.',
        answer: 'kitchen',
        hint: 'phòng',
        explanation: '"On the first floor, there is a living room and a kitchen."',
      },
      {
        type: 'fill-blank',
        id: 'g6-u2-fb-1-q4',
        template: 'There are ___ bedrooms on the second floor.',
        answer: 'three',
        hint: 'số',
        explanation: '"On the second floor, there are three bedrooms."',
      },
      {
        type: 'fill-blank',
        id: 'g6-u2-fb-1-q5',
        template: "Linh's family has ___ members.",
        answer: 'five',
        hint: 'số',
        explanation: '"My family has five members."',
      },
    ],
  },
];
