import React, { useState, useRef } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, ChevronRight } from 'lucide-react-native';
import { AudioPlayer } from '../../src/components/listening/AudioPlayer';
import { TrueFalseQuestion } from '../../src/components/listening/TrueFalseQuestion';
import { MultipleChoiceQuestion } from '../../src/components/listening/MultipleChoiceQuestion';
import { FillInBlankQuestion } from '../../src/components/listening/FillInBlankQuestion';
import { MatchingQuestion } from '../../src/components/listening/MatchingQuestion';
import { EXERCISE_MAP } from '../../src/data';
import { useProgressStore } from '../../src/store/useProgressStore';
import { isAnswerCorrect, calcScore } from '../../src/utils/scoring';
import { COLORS } from '../../src/utils/colors';
import { Question } from '../../src/types/curriculum';

type Phase = 'idle' | 'listening' | 'answering' | 'reviewing' | 'complete';

type Answers = Record<string, boolean | number | string | number[]>;

function countCorrect(questions: Question[], answers: Answers): number {
  return questions.reduce((acc, q) => {
    const ans = answers[q.id];
    if (q.type === 'true-false') return acc + (ans === q.answer ? 1 : 0);
    if (q.type === 'multiple-choice') return acc + (ans === q.answer ? 1 : 0);
    if (q.type === 'fill-blank') return acc + (isAnswerCorrect(String(ans ?? ''), q.answer) ? 1 : 0);
    if (q.type === 'matching') {
      const userAns = (ans as number[]) ?? [];
      const allMatch = q.answers.every((a, i) => userAns[i] === a);
      return acc + (allMatch ? 1 : 0);
    }
    return acc;
  }, 0);
}

export default function ListeningExercisePage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const exercise = EXERCISE_MAP.get(id ?? '');
  const [phase, setPhase] = useState<Phase>('idle');
  const [answers, setAnswers] = useState<Answers>({});
  const startTime = useRef(Date.now());
  const { recordScore, touchStreak } = useProgressStore();

  if (!exercise) {
    return (
      <SafeAreaView style={styles.safe}>
        <Text style={styles.error}>Không tìm thấy bài học.</Text>
      </SafeAreaView>
    );
  }

  const setAnswer = (qid: string, val: boolean | number | string | number[]) => {
    setAnswers((prev) => ({ ...prev, [qid]: val }));
  };

  const handleSubmit = () => {
    const unanswered = exercise.questions.filter((q) => answers[q.id] === undefined);
    if (unanswered.length > 0) {
      Alert.alert('Chưa hoàn thành', `Bạn còn ${unanswered.length} câu chưa trả lời.`, [
        { text: 'Tiếp tục làm', style: 'cancel' },
        { text: 'Nộp bài', onPress: doSubmit },
      ]);
    } else {
      doSubmit();
    }
  };

  const doSubmit = () => {
    setPhase('reviewing');
  };

  const handleComplete = () => {
    const correct = countCorrect(exercise.questions, answers);
    const score = calcScore(correct, exercise.questions.length);
    recordScore({
      exerciseId: exercise.id,
      score,
      total: exercise.questions.length,
      correct,
      attemptedAt: new Date().toISOString(),
      durationMs: Date.now() - startTime.current,
    });
    touchStreak();
    router.replace(`/listening/${exercise.id}/results` as any);
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn} activeOpacity={0.8}>
          <ArrowLeft size={20} color={COLORS.white} />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.headerUnit}>Unit {exercise.unit} · Lớp {exercise.grade}</Text>
          <Text style={styles.headerTitle} numberOfLines={1}>{exercise.titleVi}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Idle: intro screen */}
        {phase === 'idle' && (
          <View style={styles.introBox}>
            <Text style={styles.introEmoji}>🎧</Text>
            <Text style={styles.introTitle}>{exercise.title}</Text>
            <Text style={styles.introSubtitle}>{exercise.questions.length} câu hỏi</Text>
            <Text style={styles.introTip}>
              Hãy nghe audio và trả lời các câu hỏi bên dưới. Bạn có thể nghe lại nhiều lần.
            </Text>
            <TouchableOpacity
              style={styles.startBtn}
              onPress={() => { startTime.current = Date.now(); setPhase('listening'); }}
              activeOpacity={0.8}
            >
              <Text style={styles.startBtnText}>Bắt đầu nghe</Text>
              <ChevronRight size={20} color={COLORS.white} />
            </TouchableOpacity>
          </View>
        )}

        {/* Listening + Answering phases */}
        {(phase === 'listening' || phase === 'answering' || phase === 'reviewing') && (
          <>
            <AudioPlayer
              text={exercise.audioText}
              onPlayEnd={() => phase === 'listening' && setPhase('answering')}
            />

            {phase === 'listening' && (
              <TouchableOpacity style={styles.skipBtn} onPress={() => setPhase('answering')}>
                <Text style={styles.skipBtnText}>Bỏ qua — Trả lời ngay</Text>
              </TouchableOpacity>
            )}

            {/* Questions */}
            {(phase === 'answering' || phase === 'reviewing') &&
              exercise.questions.map((q, i) => {
                if (q.type === 'true-false') {
                  return (
                    <TrueFalseQuestion
                      key={q.id}
                      question={q}
                      index={i}
                      selected={(answers[q.id] as boolean) ?? null}
                      onAnswer={(v) => setAnswer(q.id, v)}
                      reviewMode={phase === 'reviewing'}
                    />
                  );
                }
                if (q.type === 'multiple-choice') {
                  return (
                    <MultipleChoiceQuestion
                      key={q.id}
                      question={q}
                      index={i}
                      selected={(answers[q.id] as number) ?? null}
                      onAnswer={(v) => setAnswer(q.id, v)}
                      reviewMode={phase === 'reviewing'}
                    />
                  );
                }
                if (q.type === 'fill-blank') {
                  return (
                    <FillInBlankQuestion
                      key={q.id}
                      question={q}
                      index={i}
                      value={(answers[q.id] as string) ?? ''}
                      onChange={(v) => setAnswer(q.id, v)}
                      reviewMode={phase === 'reviewing'}
                    />
                  );
                }
                if (q.type === 'matching') {
                  return (
                    <MatchingQuestion
                      key={q.id}
                      question={q}
                      selected={(answers[q.id] as number[]) ?? []}
                      onAnswer={(v) => setAnswer(q.id, v)}
                      reviewMode={phase === 'reviewing'}
                    />
                  );
                }
                return null;
              })}

            {phase === 'answering' && (
              <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit} activeOpacity={0.8}>
                <Text style={styles.submitBtnText}>Nộp bài</Text>
              </TouchableOpacity>
            )}

            {phase === 'reviewing' && (
              <TouchableOpacity style={styles.completeBtn} onPress={handleComplete} activeOpacity={0.8}>
                <Text style={styles.completeBtnText}>Xem kết quả</Text>
                <ChevronRight size={20} color={COLORS.white} />
              </TouchableOpacity>
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.screenBg },
  error: { textAlign: 'center', marginTop: 60, color: COLORS.textSecondary, fontSize: 16 },
  header: { backgroundColor: COLORS.primary, flexDirection: 'row', alignItems: 'center', padding: 16, gap: 12 },
  backBtn: { padding: 4 },
  headerInfo: { flex: 1 },
  headerUnit: { color: '#c4b5fd', fontSize: 12, marginBottom: 2 },
  headerTitle: { color: COLORS.white, fontSize: 15, fontWeight: '700' },
  content: { padding: 16, paddingBottom: 40 },
  introBox: { backgroundColor: COLORS.white, borderRadius: 20, padding: 24, alignItems: 'center', marginTop: 20 },
  introEmoji: { fontSize: 48, marginBottom: 16 },
  introTitle: { fontSize: 18, fontWeight: '700', color: COLORS.textPrimary, textAlign: 'center', marginBottom: 8 },
  introSubtitle: { fontSize: 14, color: COLORS.textSecondary, marginBottom: 16 },
  introTip: { fontSize: 13, color: COLORS.textSecondary, textAlign: 'center', lineHeight: 20, marginBottom: 24 },
  startBtn: { flexDirection: 'row', backgroundColor: COLORS.primary, paddingHorizontal: 32, paddingVertical: 14, borderRadius: 14, alignItems: 'center', gap: 8 },
  startBtnText: { color: COLORS.white, fontSize: 16, fontWeight: '700' },
  skipBtn: { alignItems: 'center', marginBottom: 16 },
  skipBtnText: { color: COLORS.textSecondary, fontSize: 13, textDecorationLine: 'underline' },
  submitBtn: { backgroundColor: COLORS.primary, paddingVertical: 16, borderRadius: 14, alignItems: 'center', marginTop: 8 },
  submitBtnText: { color: COLORS.white, fontSize: 16, fontWeight: '700' },
  completeBtn: { backgroundColor: '#16a34a', paddingVertical: 16, borderRadius: 14, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 8, marginTop: 8 },
  completeBtnText: { color: COLORS.white, fontSize: 16, fontWeight: '700' },
});
