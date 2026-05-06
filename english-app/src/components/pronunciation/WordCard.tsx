import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Volume2, Mic, MicOff, ChevronLeft, ChevronRight } from 'lucide-react-native';
import { PronunciationItem } from '../../types/curriculum';
import { useTTS } from '../../hooks/useTTS';
import { COLORS } from '../../utils/colors';

interface Props {
  item: PronunciationItem;
  onPrev?: () => void;
  onNext?: () => void;
  hasPrev: boolean;
  hasNext: boolean;
  transcript: string;
  similarity: number | null;
  isListening: boolean;
  onRecord: () => void;
  onStopRecord: () => void;
  speechSupported: boolean;
}

export function WordCard({
  item, onPrev, onNext, hasPrev, hasNext,
  transcript, similarity, isListening, onRecord, onStopRecord, speechSupported,
}: Props) {
  const { speak, isSpeaking } = useTTS();
  const [showExample, setShowExample] = useState(false);

  const simColor =
    similarity === null ? COLORS.textSecondary :
    similarity >= 80 ? COLORS.success :
    similarity >= 50 ? COLORS.warning :
    COLORS.error;

  const simMsg =
    similarity === null ? '' :
    similarity >= 80 ? 'Tốt lắm! 🎉' :
    similarity >= 50 ? 'Gần đúng rồi!' :
    'Thử lại nhé 💪';

  return (
    <View style={styles.card}>
      {/* Word & Phonetic */}
      <Text style={styles.word}>{item.word}</Text>
      <Text style={styles.phonetic}>{item.phonetic}</Text>
      <Text style={styles.pos}>{item.partOfSpeech}</Text>

      {/* Example toggle */}
      <TouchableOpacity onPress={() => setShowExample(!showExample)} style={styles.exampleToggle}>
        <Text style={styles.exampleToggleText}>{showExample ? 'Ẩn ví dụ' : 'Xem ví dụ'}</Text>
      </TouchableOpacity>
      {showExample && (
        <View style={styles.exampleBox}>
          <Text style={styles.exampleEn}>{item.exampleSentence}</Text>
          <Text style={styles.exampleVi}>{item.exampleSentenceVi}</Text>
        </View>
      )}

      {/* Buttons */}
      <View style={styles.btnRow}>
        <TouchableOpacity style={[styles.actionBtn, styles.listenBtn]} onPress={() => speak(item.word)} activeOpacity={0.8}>
          <Volume2 size={20} color={COLORS.white} />
          <Text style={styles.btnText}>{isSpeaking ? 'Đang phát...' : 'Nghe'}</Text>
        </TouchableOpacity>

        {speechSupported ? (
          <TouchableOpacity
            style={[styles.actionBtn, isListening ? styles.recordingBtn : styles.micBtn]}
            onPress={isListening ? onStopRecord : onRecord}
            activeOpacity={0.8}
          >
            {isListening ? <MicOff size={20} color={COLORS.white} /> : <Mic size={20} color={COLORS.white} />}
            <Text style={styles.btnText}>{isListening ? 'Dừng' : 'Nói thử'}</Text>
          </TouchableOpacity>
        ) : (
          <View style={[styles.actionBtn, styles.micDisabled]}>
            <MicOff size={20} color={COLORS.gray400} />
            <Text style={styles.btnTextDisabled}>Không hỗ trợ</Text>
          </View>
        )}
      </View>

      {/* Result */}
      {transcript !== '' && (
        <View style={styles.resultBox}>
          <Text style={styles.resultLabel}>Bạn nói: "{transcript}"</Text>
          {similarity !== null && (
            <Text style={[styles.similarity, { color: simColor }]}>
              {simMsg} ({similarity}%)
            </Text>
          )}
        </View>
      )}

      {/* Navigation */}
      <View style={styles.navRow}>
        <TouchableOpacity
          style={[styles.navBtn, !hasPrev && styles.navBtnDisabled]}
          onPress={onPrev}
          disabled={!hasPrev}
          activeOpacity={0.8}
        >
          <ChevronLeft size={20} color={hasPrev ? COLORS.primary : COLORS.gray400} />
          <Text style={[styles.navText, !hasPrev && styles.navTextDisabled]}>Trước</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navBtn, !hasNext && styles.navBtnDisabled]}
          onPress={onNext}
          disabled={!hasNext}
          activeOpacity={0.8}
        >
          <Text style={[styles.navText, !hasNext && styles.navTextDisabled]}>Tiếp</Text>
          <ChevronRight size={20} color={hasNext ? COLORS.primary : COLORS.gray400} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: COLORS.white, borderRadius: 20, padding: 24, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 16, elevation: 4, margin: 16 },
  word: { fontSize: 40, fontWeight: '800', color: COLORS.textPrimary, marginBottom: 8 },
  phonetic: { fontSize: 22, color: COLORS.primary, fontWeight: '600', marginBottom: 4, fontStyle: 'italic' },
  pos: { fontSize: 13, color: COLORS.textSecondary, marginBottom: 16, backgroundColor: COLORS.gray100, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  exampleToggle: { marginBottom: 8 },
  exampleToggleText: { fontSize: 13, color: COLORS.primary, textDecorationLine: 'underline' },
  exampleBox: { backgroundColor: '#ede9fe', borderRadius: 12, padding: 12, width: '100%', marginBottom: 16, alignItems: 'center' },
  exampleEn: { fontSize: 14, color: COLORS.primaryDark, fontStyle: 'italic', marginBottom: 4, textAlign: 'center' },
  exampleVi: { fontSize: 13, color: COLORS.textSecondary, textAlign: 'center' },
  btnRow: { flexDirection: 'row', gap: 10, width: '100%', marginBottom: 14 },
  actionBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 12, borderRadius: 12, gap: 6 },
  listenBtn: { backgroundColor: COLORS.primary },
  micBtn: { backgroundColor: '#06b6d4' },
  recordingBtn: { backgroundColor: COLORS.error },
  micDisabled: { backgroundColor: COLORS.gray100 },
  btnText: { color: COLORS.white, fontWeight: '700', fontSize: 14 },
  btnTextDisabled: { color: COLORS.gray400, fontWeight: '600', fontSize: 14 },
  resultBox: { backgroundColor: COLORS.gray100, borderRadius: 12, padding: 12, width: '100%', alignItems: 'center', marginBottom: 14 },
  resultLabel: { fontSize: 14, color: COLORS.textPrimary, marginBottom: 4 },
  similarity: { fontSize: 16, fontWeight: '700' },
  navRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
  navBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingVertical: 10, paddingHorizontal: 16 },
  navBtnDisabled: { opacity: 0.4 },
  navText: { fontSize: 14, fontWeight: '600', color: COLORS.primary },
  navTextDisabled: { color: COLORS.gray400 },
});
