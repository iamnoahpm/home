import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Play, Square, RotateCcw } from 'lucide-react-native';
import { useTTS, TTSRate } from '../../hooks/useTTS';
import { COLORS } from '../../utils/colors';

interface Props {
  text: string;
  onPlayEnd?: () => void;
}

const RATES: { label: string; value: TTSRate }[] = [
  { label: 'Chậm', value: 0.6 },
  { label: 'Bình thường', value: 0.75 },
  { label: 'Nhanh', value: 1.0 },
];

export function AudioPlayer({ text, onPlayEnd }: Props) {
  const { speak, stop, isSpeaking, rate, setRate } = useTTS();

  const handlePlay = () => {
    speak(text);
  };

  const handleStop = () => {
    stop();
    onPlayEnd?.();
  };

  return (
    <View style={styles.container}>
      <View style={styles.waveBox}>
        <Text style={styles.waveLabel}>
          {isSpeaking ? '🔊 Đang phát...' : '🎧 Nhấn để nghe'}
        </Text>
      </View>

      <View style={styles.controls}>
        {isSpeaking ? (
          <TouchableOpacity style={[styles.btn, styles.btnStop]} onPress={handleStop} activeOpacity={0.8}>
            <Square size={20} color={COLORS.white} fill={COLORS.white} />
            <Text style={styles.btnText}>Dừng</Text>
          </TouchableOpacity>
        ) : (
          <>
            <TouchableOpacity style={[styles.btn, styles.btnPlay]} onPress={handlePlay} activeOpacity={0.8}>
              <Play size={20} color={COLORS.white} fill={COLORS.white} />
              <Text style={styles.btnText}>Nghe</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btn, styles.btnReplay]} onPress={handlePlay} activeOpacity={0.8}>
              <RotateCcw size={18} color={COLORS.primary} />
              <Text style={[styles.btnText, styles.btnTextOutline]}>Nghe lại</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      <View style={styles.rateRow}>
        <Text style={styles.rateLabel}>Tốc độ:</Text>
        {RATES.map((r) => (
          <TouchableOpacity
            key={r.value}
            style={[styles.rateBtn, rate === r.value && styles.rateBtnActive]}
            onPress={() => setRate(r.value)}
          >
            <Text style={[styles.rateBtnText, rate === r.value && styles.rateBtnTextActive]}>
              {r.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: COLORS.white, borderRadius: 16, padding: 16, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 2 },
  waveBox: { backgroundColor: '#ede9fe', borderRadius: 12, padding: 16, alignItems: 'center', marginBottom: 14 },
  waveLabel: { fontSize: 15, fontWeight: '600', color: COLORS.primaryDark },
  controls: { flexDirection: 'row', gap: 10, marginBottom: 12 },
  btn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 12, borderRadius: 12, gap: 6 },
  btnPlay: { backgroundColor: COLORS.primary },
  btnReplay: { backgroundColor: 'transparent', borderWidth: 1.5, borderColor: COLORS.primary },
  btnStop: { backgroundColor: '#ef4444', flex: 1 },
  btnText: { color: COLORS.white, fontWeight: '700', fontSize: 15 },
  btnTextOutline: { color: COLORS.primary },
  rateRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  rateLabel: { fontSize: 13, color: COLORS.textSecondary },
  rateBtn: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8, backgroundColor: COLORS.gray100 },
  rateBtnActive: { backgroundColor: COLORS.primary },
  rateBtnText: { fontSize: 12, color: COLORS.textSecondary, fontWeight: '500' },
  rateBtnTextActive: { color: COLORS.white },
});
