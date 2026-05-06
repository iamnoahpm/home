import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronDown, ChevronUp } from 'lucide-react-native';
import { COLORS } from '../../src/utils/colors';

interface GrammarRule {
  id: string;
  title: string;
  titleVi: string;
  formula: string;
  examples: { en: string; vi: string }[];
  grade: 6 | 7;
  unit: number;
  notes?: string;
}

const GRAMMAR_RULES: GrammarRule[] = [
  {
    id: 'g6-u1-gr-1',
    title: 'Present Simple (affirmative)',
    titleVi: 'Thì Hiện tại đơn (câu khẳng định)',
    formula: 'S + V(s/es) + ...',
    examples: [
      { en: 'I go to school every day.', vi: 'Tôi đi học mỗi ngày.' },
      { en: 'She studies English on Monday.', vi: 'Cô ấy học tiếng Anh vào thứ Hai.' },
    ],
    grade: 6,
    unit: 1,
    notes: 'Thêm -s/-es vào động từ khi chủ ngữ là he/she/it.',
  },
  {
    id: 'g6-u1-gr-2',
    title: 'Present Simple (negative)',
    titleVi: 'Thì Hiện tại đơn (câu phủ định)',
    formula: 'S + do/does + not + V(bare) + ...',
    examples: [
      { en: "I don't like Maths.", vi: 'Tôi không thích Toán.' },
      { en: "He doesn't walk to school.", vi: 'Anh ấy không đi bộ đến trường.' },
    ],
    grade: 6,
    unit: 1,
    notes: "Dùng 'does not' với he/she/it; 'do not' với I/you/we/they.",
  },
  {
    id: 'g6-u1-gr-3',
    title: 'Present Simple (question)',
    titleVi: 'Thì Hiện tại đơn (câu hỏi)',
    formula: 'Do/Does + S + V(bare) + ...?',
    examples: [
      { en: 'Do you have homework today?', vi: 'Hôm nay bạn có bài tập về nhà không?' },
      { en: 'Does she go to school by bus?', vi: 'Cô ấy đi học bằng xe buýt không?' },
    ],
    grade: 6,
    unit: 1,
  },
  {
    id: 'g6-u2-gr-1',
    title: 'There is / There are',
    titleVi: 'Cấu trúc There is / There are',
    formula: 'There is + singular noun / There are + plural noun',
    examples: [
      { en: 'There is a library in my school.', vi: 'Trường tôi có một thư viện.' },
      { en: 'There are thirty students in my class.', vi: 'Lớp tôi có ba mươi học sinh.' },
    ],
    grade: 6,
    unit: 2,
  },
  {
    id: 'g7-u1-gr-1',
    title: 'Present Continuous',
    titleVi: 'Thì Hiện tại tiếp diễn',
    formula: 'S + am/is/are + V-ing + ...',
    examples: [
      { en: 'I am reading a book now.', vi: 'Tôi đang đọc sách bây giờ.' },
      { en: 'They are playing football.', vi: 'Họ đang chơi bóng đá.' },
    ],
    grade: 7,
    unit: 1,
    notes: 'Dùng để diễn tả hành động đang xảy ra tại thời điểm nói.',
  },
  {
    id: 'g7-u1-gr-2',
    title: 'Gerund as subject/object',
    titleVi: 'Danh động từ (V-ing) làm chủ ngữ/tân ngữ',
    formula: 'V-ing + V ... / S + V + V-ing',
    examples: [
      { en: 'Swimming is good for your health.', vi: 'Bơi lội rất tốt cho sức khỏe.' },
      { en: 'I enjoy reading books.', vi: 'Tôi thích đọc sách.' },
    ],
    grade: 7,
    unit: 1,
  },
];

function RuleCard({ rule }: { rule: GrammarRule }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <TouchableOpacity style={styles.ruleCard} onPress={() => setExpanded(!expanded)} activeOpacity={0.9}>
      <View style={styles.ruleHeader}>
        <View style={styles.ruleHeaderLeft}>
          <Text style={styles.ruleTitle}>{rule.titleVi}</Text>
          <Text style={styles.ruleSubtitle}>{rule.title}</Text>
        </View>
        {expanded ? <ChevronUp size={20} color={COLORS.primary} /> : <ChevronDown size={20} color={COLORS.gray400} />}
      </View>
      {expanded && (
        <View style={styles.ruleBody}>
          <View style={styles.formulaBox}>
            <Text style={styles.formulaLabel}>Cấu trúc:</Text>
            <Text style={styles.formula}>{rule.formula}</Text>
          </View>
          <Text style={styles.examplesLabel}>Ví dụ:</Text>
          {rule.examples.map((ex, i) => (
            <View key={i} style={styles.exampleRow}>
              <Text style={styles.exampleEn}>• {ex.en}</Text>
              <Text style={styles.exampleVi}>  {ex.vi}</Text>
            </View>
          ))}
          {rule.notes && (
            <View style={styles.noteBox}>
              <Text style={styles.noteText}>📝 {rule.notes}</Text>
            </View>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
}

export default function GrammarHub() {
  const [grade, setGrade] = useState<6 | 7>(6);
  const filtered = GRAMMAR_RULES.filter((r) => r.grade === grade);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.title}>📐 Ngữ pháp</Text>
        <View style={styles.gradeRow}>
          {([6, 7] as const).map((g) => (
            <TouchableOpacity
              key={g}
              style={[styles.gradeBtn, grade === g && styles.gradeBtnActive]}
              onPress={() => setGrade(g)}
            >
              <Text style={[styles.gradeBtnText, grade === g && styles.gradeBtnTextActive]}>Lớp {g}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.tapHint}>Nhấn vào thẻ để xem chi tiết</Text>
        {filtered.map((rule) => <RuleCard key={rule.id} rule={rule} />)}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.screenBg },
  header: { backgroundColor: '#f59e0b', padding: 20, paddingBottom: 20 },
  title: { fontSize: 22, fontWeight: '800', color: COLORS.white, marginBottom: 14 },
  gradeRow: { flexDirection: 'row', gap: 8 },
  gradeBtn: { flex: 1, paddingVertical: 8, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center' },
  gradeBtnActive: { backgroundColor: COLORS.white },
  gradeBtnText: { color: 'rgba(255,255,255,0.95)', fontWeight: '600', fontSize: 13 },
  gradeBtnTextActive: { color: '#f59e0b' },
  content: { padding: 16, paddingBottom: 32 },
  tapHint: { fontSize: 13, color: COLORS.textSecondary, marginBottom: 14, textAlign: 'center' },
  ruleCard: { backgroundColor: COLORS.white, borderRadius: 14, padding: 16, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 6, elevation: 1 },
  ruleHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  ruleHeaderLeft: { flex: 1 },
  ruleTitle: { fontSize: 15, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 2 },
  ruleSubtitle: { fontSize: 12, color: COLORS.textSecondary, fontStyle: 'italic' },
  ruleBody: { marginTop: 14 },
  formulaBox: { backgroundColor: '#fef3c7', borderRadius: 10, padding: 12, marginBottom: 14 },
  formulaLabel: { fontSize: 11, color: '#92400e', fontWeight: '700', marginBottom: 4, textTransform: 'uppercase' },
  formula: { fontSize: 15, fontWeight: '700', color: '#78350f', fontFamily: 'monospace' },
  examplesLabel: { fontSize: 12, fontWeight: '700', color: COLORS.textSecondary, marginBottom: 8, textTransform: 'uppercase' },
  exampleRow: { marginBottom: 10 },
  exampleEn: { fontSize: 14, color: COLORS.textPrimary, fontStyle: 'italic', lineHeight: 20 },
  exampleVi: { fontSize: 13, color: COLORS.textSecondary, lineHeight: 20 },
  noteBox: { backgroundColor: '#f0fdf4', borderRadius: 8, padding: 10, marginTop: 8 },
  noteText: { fontSize: 13, color: '#166534', lineHeight: 20 },
});
