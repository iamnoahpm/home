import { useState, useCallback, useRef } from 'react';
import { Platform } from 'react-native';
import { similarityPercent } from '../utils/scoring';

interface UseSpeechRecognitionReturn {
  startListening: () => void;
  stopListening: () => void;
  transcript: string;
  similarity: number | null;
  isListening: boolean;
  isSupported: boolean;
  reset: () => void;
}

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export function useSpeechRecognition(targetWord: string): UseSpeechRecognitionReturn {
  const [transcript, setTranscript] = useState('');
  const [similarity, setSimilarity] = useState<number | null>(null);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  const isSupported =
    Platform.OS === 'web'
      ? typeof window !== 'undefined' &&
        !!(window.SpeechRecognition || window.webkitSpeechRecognition)
      : false;

  const startListening = useCallback(() => {
    if (!isSupported) return;
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SR();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: any) => {
      const result = event.results[0][0].transcript;
      setTranscript(result);
      setSimilarity(similarityPercent(result, targetWord));
      setIsListening(false);
    };
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  }, [isSupported, targetWord]);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    setIsListening(false);
  }, []);

  const reset = useCallback(() => {
    setTranscript('');
    setSimilarity(null);
    setIsListening(false);
  }, []);

  return { startListening, stopListening, transcript, similarity, isListening, isSupported, reset };
}
