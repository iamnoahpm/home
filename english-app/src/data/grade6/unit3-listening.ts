import { ListeningExercise } from '../../types/curriculum';

export const grade6Unit3Listening: ListeningExercise[] = [
  {
    id: 'g6-u3-mt-1',
    grade: 6,
    unit: 3,
    unitTitle: 'My Friends',
    title: 'Matching: Friends and Hobbies',
    titleVi: 'Nối thông tin: Bạn bè và sở thích',
    audioText:
      "Let me tell you about my friends. Mai loves reading. She reads books every evening after dinner. Nam is very active. His favourite activity is swimming. He goes to the pool every weekend. Linh enjoys cooking. She often makes dishes for her family on Sundays. Minh is a big football fan. He plays football with his classmates after school every day.",
    difficulty: 'easy',
    questions: [
      {
        type: 'matching',
        id: 'g6-u3-mt-1-q1',
        instruction: 'Match each friend with their hobby.',
        leftItems: ['Mai', 'Nam', 'Linh', 'Minh'],
        rightItems: ['Swimming', 'Football', 'Reading', 'Cooking'],
        answers: [2, 0, 3, 1],
      },
    ],
  },
  {
    id: 'g6-u3-mc-1',
    grade: 6,
    unit: 3,
    unitTitle: 'My Friends',
    title: 'Multiple Choice: New Friend',
    titleVi: 'Chọn đáp án: Người bạn mới',
    audioText:
      "Hi everyone! My name is Peter. I am twelve years old. I am from England, but now I live in Viet Nam. I study at Nguyen Du School. I am in class 6A. My favourite subject is Maths. I have a best friend here. Her name is Lan. She is very kind and helpful. We walk to school together every morning.",
    difficulty: 'easy',
    questions: [
      {
        type: 'multiple-choice',
        id: 'g6-u3-mc-1-q1',
        text: 'How old is Peter?',
        options: ['Ten years old', 'Eleven years old', 'Twelve years old', 'Thirteen years old'],
        answer: 2,
        explanation: '"I am twelve years old."',
      },
      {
        type: 'multiple-choice',
        id: 'g6-u3-mc-1-q2',
        text: 'Where is Peter from?',
        options: ['America', 'Australia', 'England', 'Canada'],
        answer: 2,
        explanation: '"I am from England."',
      },
      {
        type: 'multiple-choice',
        id: 'g6-u3-mc-1-q3',
        text: "What is Peter's favourite subject?",
        options: ['English', 'Science', 'Maths', 'History'],
        answer: 2,
        explanation: '"My favourite subject is Maths."',
      },
      {
        type: 'multiple-choice',
        id: 'g6-u3-mc-1-q4',
        text: "What is Peter's best friend's name?",
        options: ['Mai', 'Linh', 'Hoa', 'Lan'],
        answer: 3,
        explanation: '"Her name is Lan."',
      },
      {
        type: 'multiple-choice',
        id: 'g6-u3-mc-1-q5',
        text: 'How do Peter and Lan go to school?',
        options: ['By bus', 'By bicycle', 'They walk', 'By car'],
        answer: 2,
        explanation: '"We walk to school together every morning."',
      },
    ],
  },
];
