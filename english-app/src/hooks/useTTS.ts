import { useState, useCallback, useEffect } from 'react';
import * as Speech from 'expo-speech';

const SENTENCE_SPLIT = /(?<=[.!?])\s+/;

function splitSentences(text: string): string[] {
  const parts = text.split(SENTENCE_SPLIT).filter(Boolean);
  return parts.length > 0 ? parts : [text];
}

export type TTSRate = 0.6 | 0.75 | 1.0;

interface UseTTSReturn {
  speak: (text: string) => void;
  stop: () => void;
  isSpeaking: boolean;
  isSupported: boolean;
  rate: TTSRate;
  setRate: (r: TTSRate) => void;
}

export function useTTS(): UseTTSReturn {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [rate, setRate] = useState<TTSRate>(0.75);
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    Speech.getAvailableVoicesAsync()
      .then(() => setIsSupported(true))
      .catch(() => setIsSupported(false));
  }, []);

  const stop = useCallback(() => {
    Speech.stop();
    setIsSpeaking(false);
  }, []);

  const speak = useCallback(
    (text: string) => {
      if (isSpeaking) {
        Speech.stop();
      }
      const sentences = splitSentences(text);
      let idx = 0;

      const speakNext = () => {
        if (idx >= sentences.length) {
          setIsSpeaking(false);
          return;
        }
        setIsSpeaking(true);
        const current = sentences[idx];
        idx++;
        Speech.speak(current, {
          language: 'en-GB',
          rate,
          pitch: 1.0,
          onDone: speakNext,
          onError: () => setIsSpeaking(false),
          onStopped: () => setIsSpeaking(false),
        });
      };

      idx = 0;
      speakNext();
    },
    [isSpeaking, rate]
  );

  return { speak, stop, isSpeaking, isSupported, rate, setRate };
}
