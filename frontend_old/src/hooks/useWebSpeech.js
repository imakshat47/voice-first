import { useState, useEffect, useRef } from 'react';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = SpeechRecognition ? new SpeechRecognition() : null;

if (recognition) {
  recognition.continuous = true;
  recognition.interimResults = true;
}

export const useWebSpeech = (languageCode = 'en-US') => {
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const finalTranscriptRef = useRef('');

  useEffect(() => {
    if (!recognition) return;
    recognition.lang = languageCode;

    const handleResult = (event) => {
      let interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscriptRef.current += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      setTranscript(finalTranscriptRef.current);
    };

    recognition.onresult = handleResult;
    recognition.onend = () => setIsListening(false);
    
  }, [languageCode]);

  const startListening = () => {
    if (recognition && !isListening) {
      finalTranscriptRef.current = '';
      setTranscript('');
      recognition.start();
      setIsListening(true);
    }
  };

  const stopListening = () => {
    if (recognition && isListening) {
      recognition.stop();
      setIsListening(false);
    }
  };
  
  const speak = (textToSpeak, lang = 'en-US') => {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = lang;
      window.speechSynthesis.speak(utterance);
  };
  
  const browserSupportsSpeechRecognition = !!recognition;

  return { transcript, isListening, startListening, stopListening, setTranscript, speak, browserSupportsSpeechRecognition };
};