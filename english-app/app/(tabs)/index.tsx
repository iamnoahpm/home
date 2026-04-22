import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Headphones, Mic, BookOpen, GraduationCap, Zap } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useProgressStore } from '../../src/store/useProgressStore';
import { ALL_LISTENING_EXERCISES } from '../../src/data';
import { COLORS } from '../../src/utils/colors';

const GRADES = [6, 7, 8, 9] as const;

interface SkillCardProps {
  icon: React.ReactNode;
  label: string;
  sublabel: string;
  route: string;
  color: string;
}

function SkillCard({ icon, label, sublabel, route, color }: SkillCardProps) {
  const router = useRouter();
  return (
    <TouchableOpacity style={[styles.skillCard, { borderLeftColor: color }]} onPress={() => router.push(route as any)} activeOpacity={0.8}>
      <View style={[styles.skillIcon, { backgroundColor: color + '20' }]}>{icon}</View>
      <View style={styles.skillText}>
        <Text style={styles.skillLabel}>{label}</Text>
        <Text style={styles.skillSub}>{sublabel}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default function HomeScreen() {
  const { selectedGrade, setGrade, streak, completedExercises } = useProgressStore();
  const completed = Object.keys(completedExercises).length;
  const total = ALL_LISTENING_EXERCISES.filter((e) => e.grade === selectedGrade).length;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient colors={['#4C1D95', '#1e3a8a']} style={styles.header}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.headerGreet}>Xin chào! 👋</Text>
              <Text style={styles.headerTitle}>Tiếng Anh THCS</Text>
            </View>
            <View style={styles.streakBadge}>
              <Zap size={16} color="#f59e0b" fill="#f59e0b" />
              <Text style={styles.streakText}>{streak.current} ngày</Text>
            </View>
          </View>

          {/* Grade selector */}
          <Text style={styles.gradeLabel}>Chọn lớp học:</Text>
          <View style={styles.gradeRow}>
            {GRADES.map((g) => (
              <TouchableOpacity
                key={g}
                style={[styles.gradeBtn, selectedGrade === g && styles.gradeBtnActive]}
                onPress={() => setGrade(g)}
                activeOpacity={0.8}
              >
                <Text style={[styles.gradeBtnText, selectedGrade === g && styles.gradeBtnTextActive]}>
                  Lớp {g}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Progress */}
          <View style={styles.progressBox}>
            <Text style={styles.progressText}>
              Đã hoàn thành: {completed}/{total} bài nghe
            </Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: total > 0 ? `${(completed / total) * 100}%` as any : '0%' }]} />
            </View>
          </View>
        </LinearGradient>

        {/* Skills */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Kỹ năng</Text>
          <SkillCard
            icon={<Headphones size={24} color={COLORS.primary} />}
            label="Luyện nghe"
            sublabel="Luyện thi — Đúng/Sai, Chọn đáp án, Điền từ, Nối"
            route="/(tabs)/listening"
            color={COLORS.primary}
          />
          <SkillCard
            icon={<Mic size={24} color="#06b6d4" />}
            label="Luyện nói & Phát âm"
            sublabel="Nghe phát âm chuẩn — Tập nói & nhận xét"
            route="/(tabs)/speaking"
            color="#06b6d4"
          />
          <SkillCard
            icon={<BookOpen size={24} color="#10b981" />}
            label="Từ vựng"
            sublabel="Thẻ flashcard theo Unit"
            route="/(tabs)/vocabulary"
            color="#10b981"
          />
          <SkillCard
            icon={<GraduationCap size={24} color="#f59e0b" />}
            label="Ngữ pháp"
            sublabel="Các cấu trúc ngữ pháp theo chương trình"
            route="/(tabs)/grammar"
            color="#f59e0b"
          />
        </View>

        {/* Tip */}
        <View style={styles.tipBox}>
          <Text style={styles.tipTitle}>💡 Mẹo luyện nghe hiệu quả</Text>
          <Text style={styles.tipText}>
            Đọc kỹ câu hỏi trước khi nghe. Tập trung vào từ khóa (tên, số, thời gian). Không dừng lại ở câu khó — bỏ qua và nghe tiếp.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.screenBg },
  header: { padding: 20, paddingBottom: 28 },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 },
  headerGreet: { color: '#c4b5fd', fontSize: 14 },
  headerTitle: { color: COLORS.white, fontSize: 22, fontWeight: '800' },
  streakBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6, gap: 4 },
  streakText: { color: '#f59e0b', fontWeight: '700', fontSize: 14 },
  gradeLabel: { color: '#c4b5fd', fontSize: 13, marginBottom: 10 },
  gradeRow: { flexDirection: 'row', gap: 10, marginBottom: 16 },
  gradeBtn: { flex: 1, paddingVertical: 10, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center' },
  gradeBtnActive: { backgroundColor: COLORS.white },
  gradeBtnText: { color: '#c4b5fd', fontWeight: '600', fontSize: 15 },
  gradeBtnTextActive: { color: COLORS.primary },
  progressBox: { backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 12, padding: 12 },
  progressText: { color: COLORS.white, fontSize: 13, marginBottom: 8 },
  progressBar: { height: 6, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 3 },
  progressFill: { height: 6, backgroundColor: '#a78bfa', borderRadius: 3 },
  section: { padding: 20 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 14 },
  skillCard: { backgroundColor: COLORS.white, borderRadius: 16, padding: 16, marginBottom: 12, flexDirection: 'row', alignItems: 'center', borderLeftWidth: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 2 },
  skillIcon: { width: 48, height: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginRight: 14 },
  skillText: { flex: 1 },
  skillLabel: { fontSize: 15, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 2 },
  skillSub: { fontSize: 12, color: COLORS.textSecondary },
  tipBox: { margin: 20, marginTop: 4, backgroundColor: '#ede9fe', borderRadius: 16, padding: 16 },
  tipTitle: { fontSize: 14, fontWeight: '700', color: COLORS.primaryDark, marginBottom: 8 },
  tipText: { fontSize: 13, color: COLORS.primaryDark, lineHeight: 20 },
});
