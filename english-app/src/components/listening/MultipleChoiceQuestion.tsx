import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CheckCircle, XCircle } from 'lucide-react-native';
import { MultipleChoiceQuestion as MCQ } from '../../types/curriculum';
import { COLORS } from '../../utils/colors';

interface Props {
  question: MCQ;
  index: number;
  selected: number | null;
  onAnswer: (val: number) => void;
  reviewMode: boolean;
}

const LETTERS = ['A', 'B', 'C', 'D'];

export function MultipleChoiceQuestion({ question, index, selected, onAnswer, reviewMode }: Props) {
  const isCorrect = selected === question.answer;

  const getOptionStyle = (i: number) => {
    if (!reviewMode) return selected === i ? styles.optSelected : styles.opt;
    if (i === question.answer) return styles.optCorrect;
    if (selected === i && !isCorrect) return styles.optWrong;
    return styles.opt;
  };

  const getLetterStyle = (i: number) => {
    if (!reviewMode) return selected === i ? styles.letterSelected : styles.letter;
    if (i === question.answer) return styles.letterCorrect;
    if (selected === i && !isCorrect) return styles.letterWrong;
    return styles.letter;
  };

  const getOptTextStyle = (i: number) => {
    if (!reviewMode) return selected === i ? styles.optTextSelected : styles.optText;
    if (i === question.answer) return styles.optTextCorrect;
    if (selected === i && !isCorrect) return styles.optTextWrong;
    return styles.optText;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.index}>Câu {index + 1}</Text>
      <Text style={styles.text}>{question.text}</Text>
      {question.options.map((opt, i) => (
        <TouchableOpacity
          key={i}
          style={getOptionStyle(i)}
          onPress={() => !reviewMode && onAnswer(i)}
          activeOpacity={reviewMode ? 1 : 0.8}
        >
          <View style={getLetterStyle(i)}>
            {reviewMode && i === question.answer ? (
              <CheckCircle size={14} color={COLORS.white} />
            ) : reviewMode && selected === i && !isCorrect ? (
              <XCircle size={14} color={COLORS.white} />
            ) : (
              <Text style={styles.letterText}>{LETTERS[i]}</Text>
            )}
          </View>
          <Text style={getOptTextStyle(i)}>{opt}</Text>
        </TouchableOpacity>
      ))}
      {reviewMode && question.explanation && (
        <View style={styles.explanation}>
          <Text style={styles.explanationText}>📖 {question.explanation}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: COLORS.white, borderRadius: 14, padding: 16, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 1 },
  index: { fontSize: 12, color: COLORS.textSecondary, fontWeight: '600', marginBottom: 6, textTransform: 'uppercase' },
  text: { fontSize: 15, color: COLORS.textPrimary, fontWeight: '500', marginBottom: 14, lineHeight: 22 },
  opt: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 12, borderRadius: 10, backgroundColor: COLORS.gray100, marginBottom: 8, gap: 10 },
  optSelected: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 12, borderRadius: 10, backgroundColor: '#ede9fe', borderWidth: 2, borderColor: COLORS.primary, marginBottom: 8, gap: 10 },
  optCorrect: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 12, borderRadius: 10, backgroundColor: '#dcfce7', borderWidth: 2, borderColor: COLORS.success, marginBottom: 8, gap: 10 },
  optWrong: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 12, borderRadius: 10, backgroundColor: '#fee2e2', borderWidth: 2, borderColor: COLORS.error, marginBottom: 8, gap: 10 },
  letter: { width: 28, height: 28, borderRadius: 14, backgroundColor: COLORS.gray200, alignItems: 'center', justifyContent: 'center' },
  letterSelected: { width: 28, height: 28, borderRadius: 14, backgroundColor: COLORS.primary, alignItems: 'center', justifyContent: 'center' },
  letterCorrect: { width: 28, height: 28, borderRadius: 14, backgroundColor: COLORS.success, alignItems: 'center', justifyContent: 'center' },
  letterWrong: { width: 28, height: 28, borderRadius: 14, backgroundColor: COLORS.error, alignItems: 'center', justifyContent: 'center' },
  letterText: { fontSize: 13, fontWeight: '700', color: COLORS.white },
  optText: { fontSize: 14, color: COLORS.textPrimary, flex: 1 },
  optTextSelected: { fontSize: 14, color: COLORS.primary, fontWeight: '600', flex: 1 },
  optTextCorrect: { fontSize: 14, color: '#16a34a', fontWeight: '600', flex: 1 },
  optTextWrong: { fontSize: 14, color: COLORS.error, fontWeight: '600', flex: 1 },
  explanation: { marginTop: 10, backgroundColor: '#f0fdf4', borderRadius: 8, padding: 10 },
  explanationText: { fontSize: 12, color: '#166534', lineHeight: 18 },
});
