import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CheckCircle, XCircle } from 'lucide-react-native';
import { TrueFalseQuestion as TFQ } from '../../types/curriculum';
import { COLORS } from '../../utils/colors';

interface Props {
  question: TFQ;
  index: number;
  selected: boolean | null;
  onAnswer: (val: boolean) => void;
  reviewMode: boolean;
}

export function TrueFalseQuestion({ question, index, selected, onAnswer, reviewMode }: Props) {
  const isCorrect = selected === question.answer;

  const getBtnStyle = (val: boolean) => {
    if (!reviewMode) return selected === val ? styles.btnSelected : styles.btn;
    if (val === question.answer) return styles.btnCorrect;
    if (selected === val && !isCorrect) return styles.btnWrong;
    return styles.btn;
  };

  const getBtnTextStyle = (val: boolean) => {
    if (!reviewMode) return selected === val ? styles.btnTextSelected : styles.btnText;
    if (val === question.answer) return styles.btnTextCorrect;
    if (selected === val && !isCorrect) return styles.btnTextWrong;
    return styles.btnText;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.index}>Câu {index + 1}</Text>
      <Text style={styles.text}>{question.text}</Text>
      <View style={styles.btnRow}>
        {([true, false] as const).map((val) => (
          <TouchableOpacity
            key={String(val)}
            style={getBtnStyle(val)}
            onPress={() => !reviewMode && onAnswer(val)}
            activeOpacity={reviewMode ? 1 : 0.8}
          >
            {reviewMode && val === question.answer && (
              <CheckCircle size={16} color={COLORS.success} />
            )}
            {reviewMode && selected === val && !isCorrect && val !== question.answer && (
              <XCircle size={16} color={COLORS.error} />
            )}
            <Text style={getBtnTextStyle(val)}>{val ? 'Đúng' : 'Sai'}</Text>
          </TouchableOpacity>
        ))}
      </View>
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
  btnRow: { flexDirection: 'row', gap: 10 },
  btn: { flex: 1, paddingVertical: 14, borderRadius: 12, backgroundColor: COLORS.gray100, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 6 },
  btnSelected: { flex: 1, paddingVertical: 14, borderRadius: 12, backgroundColor: '#ede9fe', borderWidth: 2, borderColor: COLORS.primary, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 6 },
  btnCorrect: { flex: 1, paddingVertical: 14, borderRadius: 12, backgroundColor: '#dcfce7', borderWidth: 2, borderColor: COLORS.success, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 6 },
  btnWrong: { flex: 1, paddingVertical: 14, borderRadius: 12, backgroundColor: '#fee2e2', borderWidth: 2, borderColor: COLORS.error, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 6 },
  btnText: { fontSize: 15, fontWeight: '700', color: COLORS.textSecondary },
  btnTextSelected: { fontSize: 15, fontWeight: '700', color: COLORS.primary },
  btnTextCorrect: { fontSize: 15, fontWeight: '700', color: '#16a34a' },
  btnTextWrong: { fontSize: 15, fontWeight: '700', color: COLORS.error },
  explanation: { marginTop: 10, backgroundColor: '#f0fdf4', borderRadius: 8, padding: 10 },
  explanationText: { fontSize: 12, color: '#166534', lineHeight: 18 },
});
