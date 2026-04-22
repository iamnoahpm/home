import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { FillBlankQuestion as FBQ } from '../../types/curriculum';
import { isAnswerCorrect } from '../../utils/scoring';
import { COLORS } from '../../utils/colors';

interface Props {
  question: FBQ;
  index: number;
  value: string;
  onChange: (val: string) => void;
  reviewMode: boolean;
}

export function FillInBlankQuestion({ question, index, value, onChange, reviewMode }: Props) {
  const correct = isAnswerCorrect(value, question.answer);
  const parts = question.template.split('___');

  return (
    <View style={styles.container}>
      <Text style={styles.index}>Câu {index + 1}</Text>
      {question.hint && <Text style={styles.hint}>💡 Gợi ý: {question.hint}</Text>}
      <View style={styles.templateRow}>
        <Text style={styles.templateText}>{parts[0]}</Text>
        <TextInput
          style={[
            styles.input,
            reviewMode && correct && styles.inputCorrect,
            reviewMode && !correct && styles.inputWrong,
          ]}
          value={value}
          onChangeText={onChange}
          editable={!reviewMode}
          placeholder="..."
          placeholderTextColor={COLORS.gray400}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {parts[1] ? <Text style={styles.templateText}>{parts[1]}</Text> : null}
      </View>
      {reviewMode && !correct && (
        <View style={styles.correctRow}>
          <Text style={styles.correctLabel}>Đáp án đúng: </Text>
          <Text style={styles.correctAnswer}>{question.answer}</Text>
        </View>
      )}
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
  hint: { fontSize: 12, color: COLORS.primary, marginBottom: 10 },
  templateRow: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 4 },
  templateText: { fontSize: 15, color: COLORS.textPrimary, lineHeight: 22 },
  input: { minWidth: 80, borderBottomWidth: 2, borderBottomColor: COLORS.primary, fontSize: 15, color: COLORS.textPrimary, textAlign: 'center', paddingHorizontal: 8, paddingVertical: 4, fontWeight: '600' },
  inputCorrect: { borderBottomColor: COLORS.success, color: '#16a34a' },
  inputWrong: { borderBottomColor: COLORS.error, color: COLORS.error },
  correctRow: { flexDirection: 'row', marginTop: 10, alignItems: 'center' },
  correctLabel: { fontSize: 13, color: COLORS.textSecondary },
  correctAnswer: { fontSize: 13, fontWeight: '700', color: COLORS.success },
  explanation: { marginTop: 8, backgroundColor: '#f0fdf4', borderRadius: 8, padding: 10 },
  explanationText: { fontSize: 12, color: '#166534', lineHeight: 18 },
});
