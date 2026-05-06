import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft } from 'lucide-react-native';
import { TouchableOpacity } from 'react-native';
import { PRONUNCIATION_BY_GRADE_UNIT } from '../../src/data';
import { WordCard } from '../../src/components/pronunciation/WordCard';
import { useSpeechRecognition } from '../../src/hooks/useSpeechRecognition';
import { useProgressStore } from '../../src/store/useProgressStore';
import { COLORS } from '../../src/utils/colors';

export default function PronunciationPracticePage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const { selectedGrade, recordPronunciationAttempt } = useProgressStore();

  const [grade, unit] = (id ?? '6-1').split('-').map(Number);
  const items = PRONUNCIATION_BY_GRADE_UNIT[grade]?.[unit] ?? [];

  const currentItem = items[index];
  const { startListening, stopListening, transcript, similarity, isListening, isSupported, reset } =
    useSpeechRecognition(currentItem?.word ?? '');

  const handleNext = () => {
    reset();
    setIndex((i) => Math.min(i + 1, items.length - 1));
  };

  const handlePrev = () => {
    reset();
    setIndex((i) => Math.max(i - 1, 0));
  };

  const handleRecord = () => {
    if (currentItem) recordPronunciationAttempt(currentItem.id);
    startListening();
  };

  if (!currentItem) {
    return (
      <SafeAreaView style={styles.safe}>
        <Text style={styles.empty}>Không có dữ liệu phát âm cho lớp này.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn} activeOpacity={0.8}>
          <ArrowLeft size={20} color={COLORS.white} />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>Phát âm — Lớp {grade} Unit {unit}</Text>
        </View>
        <Text style={styles.counter}>{index + 1}/{items.length}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.progress}>
          <View style={[styles.progressFill, { width: `${((index + 1) / items.length) * 100}%` as any }]} />
        </View>

        <WordCard
          item={currentItem}
          onPrev={handlePrev}
          onNext={handleNext}
          hasPrev={index > 0}
          hasNext={index < items.length - 1}
          transcript={transcript}
          similarity={similarity}
          isListening={isListening}
          onRecord={handleRecord}
          onStopRecord={stopListening}
          speechSupported={isSupported}
        />

        {!isSupported && (
          <View style={styles.noSpeechBox}>
            <Text style={styles.noSpeechText}>
              🎤 Tính năng nhận diện giọng nói chỉ hoạt động trên trình duyệt Chrome (web). Trên app di động, tính năng này sẽ được cập nhật trong phiên bản sau.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.screenBg },
  header: { backgroundColor: COLORS.primary, flexDirection: 'row', alignItems: 'center', padding: 16, gap: 12 },
  backBtn: { padding: 4 },
  headerInfo: { flex: 1 },
  headerTitle: { color: COLORS.white, fontSize: 15, fontWeight: '700' },
  counter: { color: '#c4b5fd', fontSize: 14, fontWeight: '600' },
  content: { paddingBottom: 40 },
  progress: { height: 4, backgroundColor: COLORS.gray200, margin: 16, borderRadius: 2 },
  progressFill: { height: 4, backgroundColor: COLORS.primary, borderRadius: 2 },
  empty: { textAlign: 'center', marginTop: 60, color: COLORS.textSecondary, fontSize: 16, padding: 24 },
  noSpeechBox: { margin: 16, backgroundColor: '#fef3c7', borderRadius: 14, padding: 14 },
  noSpeechText: { fontSize: 13, color: '#92400e', lineHeight: 20 },
});
