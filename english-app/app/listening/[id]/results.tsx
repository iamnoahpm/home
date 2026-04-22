import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RotateCcw, Home, Star } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { EXERCISE_MAP } from '../../../src/data';
import { useProgressStore } from '../../../src/store/useProgressStore';
import { COLORS } from '../../../src/utils/colors';

function ScoreCircle({ score }: { score: number }) {
  const emoji = score >= 8 ? '🏆' : score >= 5 ? '👍' : '💪';
  const msg = score >= 8 ? 'Xuất sắc!' : score >= 5 ? 'Tốt lắm!' : 'Cố lên nhé!';
  return (
    <View style={styles.circleWrap}>
      <LinearGradient colors={['#7c3aed', '#3b82f6']} style={styles.circle}>
        <Text style={styles.circleEmoji}>{emoji}</Text>
        <Text style={styles.circleScore}>{score}/10</Text>
        <Text style={styles.circleMsg}>{msg}</Text>
      </LinearGradient>
    </View>
  );
}

export default function ResultsPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const exercise = EXERCISE_MAP.get(id ?? '');
  const { getBestScore, getExerciseAttempts } = useProgressStore();

  if (!exercise) return null;

  const best = getBestScore(exercise.id);
  const attempts = getExerciseAttempts?.(exercise.id) ?? [];
  const score = best?.score ?? 0;
  const correct = best?.correct ?? 0;
  const total = best?.total ?? exercise.questions.length;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.headerTitle}>Kết quả</Text>
        <Text style={styles.headerSub}>{exercise.titleVi}</Text>

        <ScoreCircle score={score} />

        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Text style={styles.statNum}>{correct}</Text>
            <Text style={styles.statLabel}>Đúng</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.stat}>
            <Text style={[styles.statNum, { color: COLORS.error }]}>{total - correct}</Text>
            <Text style={styles.statLabel}>Sai</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.stat}>
            <Text style={styles.statNum}>{total}</Text>
            <Text style={styles.statLabel}>Tổng</Text>
          </View>
        </View>

        {attempts.length > 1 && (
          <View style={styles.historyBox}>
            <Text style={styles.historyTitle}>Lịch sử làm bài</Text>
            {attempts.slice(-3).reverse().map((a, i) => (
              <View key={i} style={styles.historyRow}>
                <Star size={14} color={COLORS.warning} fill={COLORS.warning} />
                <Text style={styles.historyText}>Lần {attempts.length - i}: {a.score}/10 ({a.correct}/{a.total} đúng)</Text>
              </View>
            ))}
          </View>
        )}

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.retryBtn}
            onPress={() => router.replace(`/listening/${id}` as any)}
            activeOpacity={0.8}
          >
            <RotateCcw size={18} color={COLORS.primary} />
            <Text style={styles.retryBtnText}>Làm lại</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.homeBtn}
            onPress={() => router.push('/(tabs)/listening' as any)}
            activeOpacity={0.8}
          >
            <Home size={18} color={COLORS.white} />
            <Text style={styles.homeBtnText}>Danh sách bài</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.screenBg },
  content: { padding: 24, alignItems: 'center', paddingBottom: 40 },
  headerTitle: { fontSize: 24, fontWeight: '800', color: COLORS.textPrimary, marginBottom: 4 },
  headerSub: { fontSize: 14, color: COLORS.textSecondary, marginBottom: 24 },
  circleWrap: { marginBottom: 28 },
  circle: { width: 160, height: 160, borderRadius: 80, alignItems: 'center', justifyContent: 'center' },
  circleEmoji: { fontSize: 32, marginBottom: 4 },
  circleScore: { fontSize: 28, fontWeight: '800', color: COLORS.white },
  circleMsg: { fontSize: 14, fontWeight: '600', color: 'rgba(255,255,255,0.85)' },
  statsRow: { flexDirection: 'row', backgroundColor: COLORS.white, borderRadius: 16, padding: 20, width: '100%', marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 2 },
  stat: { flex: 1, alignItems: 'center' },
  statNum: { fontSize: 28, fontWeight: '800', color: COLORS.success },
  statLabel: { fontSize: 13, color: COLORS.textSecondary, marginTop: 2 },
  statDivider: { width: 1, backgroundColor: COLORS.gray200 },
  historyBox: { width: '100%', backgroundColor: COLORS.white, borderRadius: 14, padding: 16, marginBottom: 20 },
  historyTitle: { fontSize: 14, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 10 },
  historyRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 },
  historyText: { fontSize: 13, color: COLORS.textSecondary },
  actions: { flexDirection: 'row', gap: 12, width: '100%' },
  retryBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 14, borderRadius: 14, borderWidth: 2, borderColor: COLORS.primary, gap: 8 },
  retryBtnText: { color: COLORS.primary, fontWeight: '700', fontSize: 15 },
  homeBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 14, borderRadius: 14, backgroundColor: COLORS.primary, gap: 8 },
  homeBtnText: { color: COLORS.white, fontWeight: '700', fontSize: 15 },
});
