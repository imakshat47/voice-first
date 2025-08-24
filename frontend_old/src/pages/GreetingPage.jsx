import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";

const GreetingPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(); // <-- i18n Hook
  const [userInput, setUserInput] = useState("");

  // --- NEW SPEECH RECOGNITION HOOK ---
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  // Update text area when transcript changes
  useEffect(() => {
    setUserInput(transcript);
  }, [transcript]);
  
  // (All animation logic and other effects remain the same)
  const cardRef = useRef(null);
  //... other refs

  useEffect(() => {
      gsap.fromTo(cardRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8 });
  }, []);

  const extractUserInfo = (text) => {
    const nameMatch = text.match(/I(?:'m| am)\s+([A-Za-z]+)/i);
    const genderMatch = text.match(/\b(male|female|other)\b/i);
    const ageMatch = text.match(/(\d{1,3})\s*(years old|yr old|y\/o|yrs old)?/i);
    const professionMatch = text.match(/working at ([\w\s&]+)/i);
    const placeMatch = text.match(/living in ([\w\s&]+)/i);

    return {
      name: nameMatch ? nameMatch[1] : "",
      gender: genderMatch ? genderMatch[1] : "",
      age: ageMatch ? ageMatch[1] : "",
      profession: professionMatch ? professionMatch[1].trim() : "",
      place: placeMatch ? placeMatch[1].trim() : "",
      otherDetails: text,
    };
  };

  const handleSubmit = () => {
    const userData = extractUserInfo(userInput);
    navigate("/userinfo", { state: userData });
    resetTranscript();
  };

  const toggleListening = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      resetTranscript();
      SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
    }
  };

  if (!browserSupportsSpeechRecognition) {
    return <div className="text-center p-8">Your browser does not support speech recognition.</div>;
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 space-y-6">
      {/* Background Image */}
      <div ref={cardRef} className="relative z-10 bg-white/70 p-10 rounded-xl shadow-lg w-full max-w-xl">
        <h2 className="text-4xl font-semibold mb-4">{t('greeting.title')}</h2>
        <p className="text-gray-700 text-xl mb-6">{t('greeting.prompt')}</p>
        <textarea
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          className="w-full h-32 p-4 border border-gray-300 rounded-lg text-lg"
        />
        <div className="flex justify-center mt-4 space-x-4">
          <button
            onClick={toggleListening}
            className={`px-6 py-2 rounded-lg shadow text-white transition ${
              listening ? "bg-red-600" : "bg-green-600"
            }`}
          >
            {listening ? t('greeting.stopListening') : t('greeting.listen')}
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-blue-700 text-white rounded-lg shadow hover:bg-blue-800"
          >
            {t('greeting.submit')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GreetingPage;