import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronRight, CheckCircle, Clock } from 'lucide-react-native';
import { useProgressStore } from '../../src/store/useProgressStore';
import { EXERCISES_BY_GRADE_UNIT, UNIT_TITLES } from '../../src/data';
import { COLORS } from '../../src/utils/colors';

const TYPE_LABELS: Record<string, string> = {
  'true-false': 'Đúng/Sai',
  'multiple-choice': 'Chọn đáp án',
  'fill-blank': 'Điền từ',
  'matching': 'Nối thông tin',
};

export default function ListeningHub() {
  const router = useRouter();
  const { selectedGrade, completedExercises, getBestScore } = useProgressStore();
  const [grade, setGrade] = useState(selectedGrade);

  const gradeData = EXERCISES_BY_GRADE_UNIT[grade] ?? {};
  const units = Object.keys(gradeData).map(Number).sort();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.title}>🎧 Luyện nghe</Text>
        <Text style={styles.subtitle}>Lớp {grade} — Global Success</Text>

        <View style={styles.gradeRow}>
          {([6, 7, 8, 9] as const).map((g) => (
            <TouchableOpacity
              key={g}
              style={[styles.gradeBtn, grade === g && styles.gradeBtnActive]}
              onPress={() => setGrade(g)}
            >
              <Text style={[styles.gradeBtnText, grade === g && styles.gradeBtnTextActive]}>
                Lớp {g}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.list}>
        {units.length === 0 && (
          <Text style={styles.empty}>Chưa có bài học cho lớp {grade}</Text>
        )}
        {units.map((unit) => {
          const exercises = gradeData[unit] ?? [];
          const unitTitle = UNIT_TITLES[grade]?.[unit] ?? `Unit ${unit}`;
          return (
            <View key={unit} style={styles.unitSection}>
              <Text style={styles.unitHeader}>
                Unit {unit}: {unitTitle}
              </Text>
              {exercises.map((ex) => {
                const best = getBestScore(ex.id);
                const done = !!completedExercises[ex.id]?.length;
                const typeLabel = TYPE_LABELS[ex.questions[0]?.type] ?? '';
                return (
                  <TouchableOpacity
                    key={ex.id}
                    style={[styles.exCard, done && styles.exCardDone]}
                    onPress={() => router.push(`/listening/${ex.id}` as any)}
                    activeOpacity={0.8}
                  >
                    <View style={styles.exLeft}>
                      <View style={styles.typeTag}>
                        <Text style={styles.typeTagText}>{typeLabel}</Text>
                      </View>
                      <Text style={styles.exTitle}>{ex.title}</Text>
                      <Text style={styles.exMeta}>
                        {ex.questions.length} câu hỏi ·{' '}
                        {ex.difficulty === 'easy' ? 'Dễ' : 'Trung bình'}
                      </Text>
                    </View>
                    <View style={styles.exRight}>
                      {done ? (
                        <>
                          <CheckCircle size={20} color={COLORS.success} />
                          <Text style={styles.scoreText}>{best?.score ?? 0}/10</Text>
                        </>
                      ) : (
                        <ChevronRight size={20} color={COLORS.gray400} />
                      )}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.screenBg },
  header: { backgroundColor: COLORS.primary, padding: 20, paddingBottom: 24 },
  title: { fontSize: 22, fontWeight: '800', color: COLORS.white, marginBottom: 4 },
  subtitle: { fontSize: 14, color: '#c4b5fd', marginBottom: 14 },
  gradeRow: { flexDirection: 'row', gap: 8 },
  gradeBtn: { flex: 1, paddingVertical: 8, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.15)', alignItems: 'center' },
  gradeBtnActive: { backgroundColor: COLORS.white },
  gradeBtnText: { color: '#c4b5fd', fontWeight: '600', fontSize: 13 },
  gradeBtnTextActive: { color: COLORS.primary },
  list: { padding: 16, paddingBottom: 32 },
  empty: { textAlign: 'center', color: COLORS.textSecondary, marginTop: 40, fontSize: 15 },
  unitSection: { marginBottom: 20 },
  unitHeader: { fontSize: 15, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 10, paddingLeft: 4 },
  exCard: { backgroundColor: COLORS.white, borderRadius: 14, padding: 14, marginBottom: 10, flexDirection: 'row', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 6, elevation: 1 },
  exCardDone: { borderLeftWidth: 4, borderLeftColor: COLORS.success },
  exLeft: { flex: 1 },
  exRight: { alignItems: 'center', gap: 4 },
  typeTag: { backgroundColor: '#ede9fe', borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3, alignSelf: 'flex-start', marginBottom: 6 },
  typeTagText: { color: COLORS.primary, fontSize: 11, fontWeight: '600' },
  exTitle: { fontSize: 14, fontWeight: '600', color: COLORS.textPrimary, marginBottom: 4 },
  exMeta: { fontSize: 12, color: COLORS.textSecondary },
  scoreText: { fontSize: 12, fontWeight: '700', color: COLORS.success },
});
