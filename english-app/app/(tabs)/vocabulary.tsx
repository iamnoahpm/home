import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { VOCAB_BY_GRADE_UNIT } from '../../src/data';
import { useProgressStore } from '../../src/store/useProgressStore';
import { COLORS } from '../../src/utils/colors';

interface FlashCardProps {
  word: string;
  phonetic?: string;
  definitionVi: string;
  exampleSentence: string;
  exampleSentenceVi: string;
  emoji?: string;
  onMastered: () => void;
}

function FlashCard({ word, phonetic, definitionVi, exampleSentence, exampleSentenceVi, emoji, onMastered }: FlashCardProps) {
  const [flipped, setFlipped] = useState(false);
  return (
    <TouchableOpacity style={styles.card} onPress={() => setFlipped(!flipped)} activeOpacity={0.9}>
      {!flipped ? (
        <View style={styles.cardFront}>
          <Text style={styles.cardEmoji}>{emoji ?? '📝'}</Text>
          <Text style={styles.cardWord}>{word}</Text>
          {phonetic && <Text style={styles.cardPhonetic}>{phonetic}</Text>}
          <Text style={styles.cardHint}>Nhấn để xem nghĩa</Text>
        </View>
      ) : (
        <View style={styles.cardBack}>
          <Text style={styles.cardEmoji}>{emoji ?? '📝'}</Text>
          <Text style={styles.cardDefVi}>{definitionVi}</Text>
          <Text style={styles.cardExample}>{exampleSentence}</Text>
          <Text style={styles.cardExampleVi}>{exampleSentenceVi}</Text>
          <TouchableOpacity style={styles.masteredBtn} onPress={(e) => { e.stopPropagation?.(); onMastered(); }}>
            <Text style={styles.masteredBtnText}>✓ Đã thuộc</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
}

export default function VocabularyHub() {
  const { selectedGrade, markVocabMastered, vocabularyMastered } = useProgressStore();
  const [grade, setGrade] = useState(selectedGrade);
  const [unitIndex, setUnitIndex] = useState(0);

  const gradeData = VOCAB_BY_GRADE_UNIT[grade] ?? {};
  const units = Object.keys(gradeData).map(Number).sort();
  const selectedUnit = units[unitIndex] ?? 1;
  const items = gradeData[selectedUnit] ?? [];

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.title}>📚 Từ vựng</Text>
        <View style={styles.gradeRow}>
          {([6, 7, 8, 9] as const).map((g) => (
            <TouchableOpacity
              key={g}
              style={[styles.gradeBtn, grade === g && styles.gradeBtnActive]}
              onPress={() => { setGrade(g); setUnitIndex(0); }}
            >
              <Text style={[styles.gradeBtnText, grade === g && styles.gradeBtnTextActive]}>Lớp {g}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {units.length > 0 && (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.unitScroll}>
            {units.map((u, i) => (
              <TouchableOpacity
                key={u}
                style={[styles.unitTab, unitIndex === i && styles.unitTabActive]}
                onPress={() => setUnitIndex(i)}
              >
                <Text style={[styles.unitTabText, unitIndex === i && styles.unitTabTextActive]}>Unit {u}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {items.length === 0 && (
          <Text style={styles.empty}>Chưa có từ vựng cho lớp {grade}</Text>
        )}
        <Text style={styles.masteredCount}>
          Đã thuộc: {items.filter((i) => vocabularyMastered.includes(i.id)).length}/{items.length}
        </Text>
        {items.map((item) => (
          <FlashCard
            key={item.id}
            word={item.word}
            phonetic={item.phonetic}
            definitionVi={item.definitionVi}
            exampleSentence={item.exampleSentence}
            exampleSentenceVi={item.exampleSentenceVi}
            emoji={item.imageEmoji}
            onMastered={() => markVocabMastered(item.id)}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.screenBg },
  header: { backgroundColor: '#10b981', padding: 20, paddingBottom: 16 },
  title: { fontSize: 22, fontWeight: '800', color: COLORS.white, marginBottom: 14 },
  gradeRow: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  gradeBtn: { flex: 1, paddingVertical: 8, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center' },
  gradeBtnActive: { backgroundColor: COLORS.white },
  gradeBtnText: { color: 'rgba(255,255,255,0.9)', fontWeight: '600', fontSize: 13 },
  gradeBtnTextActive: { color: '#10b981' },
  unitScroll: { marginHorizontal: -4 },
  unitTab: { marginHorizontal: 4, paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.2)' },
  unitTabActive: { backgroundColor: COLORS.white },
  unitTabText: { fontSize: 13, color: 'rgba(255,255,255,0.9)', fontWeight: '500' },
  unitTabTextActive: { color: '#10b981', fontWeight: '700' },
  content: { padding: 16, paddingBottom: 32 },
  empty: { textAlign: 'center', color: COLORS.textSecondary, marginTop: 40, fontSize: 15 },
  masteredCount: { fontSize: 13, color: COLORS.textSecondary, marginBottom: 14, textAlign: 'center' },
  card: { backgroundColor: COLORS.white, borderRadius: 20, padding: 24, marginBottom: 16, minHeight: 200, shadowColor: '#000', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.08, shadowRadius: 12, elevation: 3, alignItems: 'center', justifyContent: 'center' },
  cardFront: { alignItems: 'center' },
  cardBack: { alignItems: 'center' },
  cardEmoji: { fontSize: 40, marginBottom: 12 },
  cardWord: { fontSize: 32, fontWeight: '800', color: COLORS.textPrimary, marginBottom: 6 },
  cardPhonetic: { fontSize: 18, color: COLORS.primary, fontStyle: 'italic', marginBottom: 16 },
  cardHint: { fontSize: 12, color: COLORS.gray400 },
  cardDefVi: { fontSize: 22, fontWeight: '700', color: '#10b981', marginBottom: 12 },
  cardExample: { fontSize: 14, color: COLORS.textPrimary, fontStyle: 'italic', textAlign: 'center', marginBottom: 4 },
  cardExampleVi: { fontSize: 13, color: COLORS.textSecondary, textAlign: 'center', marginBottom: 16 },
  masteredBtn: { backgroundColor: '#dcfce7', borderRadius: 10, paddingHorizontal: 20, paddingVertical: 8 },
  masteredBtnText: { color: '#16a34a', fontWeight: '700', fontSize: 14 },
});
