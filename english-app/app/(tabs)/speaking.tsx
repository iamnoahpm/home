import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronRight } from 'lucide-react-native';
import { PRONUNCIATION_BY_GRADE_UNIT } from '../../src/data';
import { useProgressStore } from '../../src/store/useProgressStore';
import { COLORS } from '../../src/utils/colors';

export default function SpeakingHub() {
  const router = useRouter();
  const { selectedGrade } = useProgressStore();
  const [grade, setGrade] = useState(selectedGrade);

  const gradeData = PRONUNCIATION_BY_GRADE_UNIT[grade] ?? {};
  const units = Object.keys(gradeData).map(Number).sort();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.title}>🎤 Luyện nói & Phát âm</Text>
        <Text style={styles.subtitle}>Nghe — Nói thử — Nhận xét</Text>
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
          <Text style={styles.empty}>Chưa có nội dung phát âm cho lớp {grade}</Text>
        )}
        {units.map((unit) => {
          const items = gradeData[unit] ?? [];
          return (
            <TouchableOpacity
              key={unit}
              style={styles.unitCard}
              onPress={() => router.push(`/speaking/${grade}-${unit}` as any)}
              activeOpacity={0.8}
            >
              <View style={styles.unitLeft}>
                <Text style={styles.unitTitle}>Unit {unit}</Text>
                <Text style={styles.unitCount}>{items.length} từ phát âm</Text>
                <View style={styles.previewRow}>
                  {items.slice(0, 4).map((item) => (
                    <View key={item.id} style={styles.wordChip}>
                      <Text style={styles.wordChipText}>{item.word}</Text>
                    </View>
                  ))}
                </View>
              </View>
              <ChevronRight size={20} color={COLORS.gray400} />
            </TouchableOpacity>
          );
        })}

        <View style={styles.tipBox}>
          <Text style={styles.tipTitle}>💡 Mẹo luyện phát âm</Text>
          <Text style={styles.tipText}>
            Nghe trước, sau đó nói thử. Chú ý ký hiệu phiên âm IPA. Luyện mỗi từ ít nhất 3 lần.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.screenBg },
  header: { backgroundColor: '#06b6d4', padding: 20, paddingBottom: 24 },
  title: { fontSize: 22, fontWeight: '800', color: COLORS.white, marginBottom: 4 },
  subtitle: { fontSize: 14, color: 'rgba(255,255,255,0.8)', marginBottom: 14 },
  gradeRow: { flexDirection: 'row', gap: 8 },
  gradeBtn: { flex: 1, paddingVertical: 8, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center' },
  gradeBtnActive: { backgroundColor: COLORS.white },
  gradeBtnText: { color: 'rgba(255,255,255,0.9)', fontWeight: '600', fontSize: 13 },
  gradeBtnTextActive: { color: '#06b6d4' },
  list: { padding: 16, paddingBottom: 32 },
  empty: { textAlign: 'center', color: COLORS.textSecondary, marginTop: 40, fontSize: 15 },
  unitCard: { backgroundColor: COLORS.white, borderRadius: 16, padding: 16, marginBottom: 12, flexDirection: 'row', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 6, elevation: 1 },
  unitLeft: { flex: 1 },
  unitTitle: { fontSize: 16, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 4 },
  unitCount: { fontSize: 13, color: COLORS.textSecondary, marginBottom: 10 },
  previewRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  wordChip: { backgroundColor: '#e0f2fe', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3 },
  wordChipText: { fontSize: 12, color: '#0369a1', fontWeight: '500' },
  tipBox: { backgroundColor: '#e0f2fe', borderRadius: 16, padding: 16, marginTop: 8 },
  tipTitle: { fontSize: 14, fontWeight: '700', color: '#0369a1', marginBottom: 8 },
  tipText: { fontSize: 13, color: '#0369a1', lineHeight: 20 },
});
