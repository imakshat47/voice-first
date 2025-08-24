import { useState, useRef } from 'react';
import axios from 'axios';

// Get the API key from environment variables
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

// Base URLs for Google Cloud REST APIs
const STT_API_URL = `https://speech.googleapis.com/v1/speech:recognize?key=${API_KEY}`;
const TTS_API_URL = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${API_KEY}`;

// Helper function to convert a Blob to a Base64 string
const blobToBase64 = (blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      // remove the `data:...;base64,` part of the string
      resolve(reader.result.split(',')[1]);
    };
    reader.onerror = (error) => reject(error);
  });
};


export const useGoogleSpeech = (languageCode = 'en-IN') => {
  const [transcript, setTranscript] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const options = { mimeType: 'audio/webm;codecs=opus' };
      const mediaRecorder = new MediaRecorder(stream, options);

      mediaRecorder.onstart = () => {
        audioChunksRef.current = [];
        setTranscript('');
        setIsRecording(true);
      };

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        setIsRecording(false);
        setIsLoading(true);
        
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const base64Audio = await blobToBase64(audioBlob);

        const requestBody = {
          config: {
            encoding: 'WEBM_OPUS', // More robust than LINEAR16 for webm
            sampleRateHertz: 48000, // Common sample rate for web audio
            languageCode: languageCode,
          },
          audio: {
            content: base64Audio,
          },
        };

        try {
          const response = await axios.post(STT_API_URL, requestBody);
          const resultTranscript = response.data.results?.[0]?.alternatives?.[0]?.transcript || '';
          setTranscript(resultTranscript);
        } catch (error) {
          console.error('Error with Google STT API:', error.response?.data || error);
          setTranscript('Sorry, there was an error in transcription.');
        } finally {
            setIsLoading(false);
            stream.getTracks().forEach(track => track.stop());
        }
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
    } catch (error) {
        console.error('Microphone access denied:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
  };
  
  const speak = async (textToSpeak, lang = 'en-IN') => {
    try {
        const requestBody = {
            input: { text: textToSpeak },
            voice: { languageCode: lang, ssmlGender: 'NEUTRAL' },
            audioConfig: { audioEncoding: 'MP3' },
        };
        const response = await axios.post(TTS_API_URL, requestBody);
        const audioContent = response.data.audioContent; // This is a base64 string
        const audio = new Audio(`data:audio/mp3;base64,${audioContent}`);
        audio.play();

    } catch (error) {
        console.error("Error with Google TTS API:", error.response?.data || error);
    }
  };

  return { 
      transcript,
      isRecording, 
      isLoading,
      startRecording, 
      stopRecording,
      setTranscript,
      speak 
    };
};