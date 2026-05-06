import React, { useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MatchingQuestion as MQ } from '../../types/curriculum';
import { COLORS } from '../../utils/colors';

interface Props {
  question: MQ;
  selected: number[];
  onAnswer: (answers: number[]) => void;
  reviewMode: boolean;
}

function shuffle<T>(arr: T[]): { item: T; origIndex: number }[] {
  return arr
    .map((item, origIndex) => ({ item, origIndex }))
    .sort(() => Math.random() - 0.5);
}

export function MatchingQuestion({ question, selected, onAnswer, reviewMode }: Props) {
  const shuffled = useMemo(() => shuffle(question.rightItems), []);
  const [activeLeft, setActiveLeft] = useState<number | null>(null);

  const handleLeftPress = (i: number) => {
    if (reviewMode) return;
    setActiveLeft(i === activeLeft ? null : i);
  };

  const handleRightPress = (shuffledIdx: number) => {
    if (reviewMode || activeLeft === null) return;
    const origRight = shuffled[shuffledIdx].origIndex;
    const next = [...selected];
    next[activeLeft] = origRight;
    onAnswer(next);
    setActiveLeft(null);
  };

  const getLeftStyle = (i: number) => {
    if (reviewMode) {
      return selected[i] === question.answers[i] ? styles.leftCorrect : styles.leftWrong;
    }
    return activeLeft === i ? styles.leftActive : styles.left;
  };

  return (
    <View style={styles.container}>
      {question.instruction && (
        <Text style={styles.instruction}>{question.instruction}</Text>
      )}
      <View style={styles.columns}>
        <View style={styles.col}>
          {question.leftItems.map((item, i) => (
            <TouchableOpacity
              key={i}
              style={getLeftStyle(i)}
              onPress={() => handleLeftPress(i)}
              activeOpacity={reviewMode ? 1 : 0.8}
            >
              <Text style={styles.leftText}>{item}</Text>
              {selected[i] !== undefined && (
                <Text style={styles.matchedRight}>→ {question.rightItems[selected[i]]}</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.col}>
          {shuffled.map(({ item, origIndex }, si) => {
            const isMatched = selected.includes(origIndex);
            return (
              <TouchableOpacity
                key={si}
                style={[styles.right, isMatched && !reviewMode && styles.rightMatched]}
                onPress={() => handleRightPress(si)}
                activeOpacity={reviewMode ? 1 : 0.8}
              >
                <Text style={styles.rightText}>{item}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      {activeLeft !== null && (
        <Text style={styles.hint}>Chọn đáp án bên phải để ghép với "{question.leftItems[activeLeft]}"</Text>
      )}
      {reviewMode && (
        <View style={styles.answerKey}>
          <Text style={styles.answerKeyTitle}>Đáp án đúng:</Text>
          {question.leftItems.map((item, i) => (
            <Text key={i} style={styles.answerKeyItem}>
              {item} → {question.rightItems[question.answers[i]]}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: COLORS.white, borderRadius: 14, padding: 16, marginBottom: 12 },
  instruction: { fontSize: 14, color: COLORS.textSecondary, marginBottom: 14, fontStyle: 'italic' },
  columns: { flexDirection: 'row', gap: 10 },
  col: { flex: 1, gap: 8 },
  left: { padding: 12, borderRadius: 10, backgroundColor: COLORS.gray100, borderWidth: 1.5, borderColor: 'transparent' },
  leftActive: { padding: 12, borderRadius: 10, backgroundColor: '#ede9fe', borderWidth: 1.5, borderColor: COLORS.primary },
  leftCorrect: { padding: 12, borderRadius: 10, backgroundColor: '#dcfce7', borderWidth: 1.5, borderColor: COLORS.success },
  leftWrong: { padding: 12, borderRadius: 10, backgroundColor: '#fee2e2', borderWidth: 1.5, borderColor: COLORS.error },
  leftText: { fontSize: 13, fontWeight: '700', color: COLORS.textPrimary },
  matchedRight: { fontSize: 11, color: COLORS.primary, marginTop: 2 },
  right: { padding: 12, borderRadius: 10, backgroundColor: '#f0f9ff', borderWidth: 1.5, borderColor: '#bae6fd' },
  rightMatched: { backgroundColor: '#f3f4f6', borderColor: COLORS.gray200, opacity: 0.6 },
  rightText: { fontSize: 13, color: COLORS.textPrimary },
  hint: { fontSize: 12, color: COLORS.primary, marginTop: 10, textAlign: 'center' },
  answerKey: { marginTop: 12, backgroundColor: '#f0fdf4', borderRadius: 8, padding: 10 },
  answerKeyTitle: { fontSize: 12, fontWeight: '700', color: '#166534', marginBottom: 4 },
  answerKeyItem: { fontSize: 12, color: '#166534', lineHeight: 20 },
});
