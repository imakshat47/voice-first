import React, { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useTranslation } from "react-i18next";
import gsap from "gsap";

const SignupPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: "", password: "" });
  const cardRef = useRef(null);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();
  
  useEffect(() => {
    const nameMatch = transcript.toLowerCase().match(/my name is\s*(.+)/);
    if (nameMatch) {
      const name = nameMatch[1].replace(/[^\w\s]/gi, '').trim(); // Clean up the name
      if (name) {
        setForm(f => ({ ...f, name }));
      }
    }
  }, [transcript]);
  
  useEffect(() => {
    gsap.fromTo(cardRef.current, { x: -300, opacity: 0 }, { x: 0, opacity: 1, duration: 1 });
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting:", form);
    // Add your API call logic here
    navigate("/login");
  };

  const toggleListening = () => {
      listening ? SpeechRecognition.stopListening() : SpeechRecognition.startListening({ language: 'en-IN' });
  };
  
  return (
    <div className="w-full h-screen flex items-center justify-center bg-[#ECECEC]">
      <div ref={cardRef} className="flex flex-col items-center justify-center w-full max-w-md p-8 shadow-md rounded-xl border bg-white">
        <h2 className="text-2xl font-bold mb-2">{t('signup.title')}</h2>
        <p className="text-sm text-gray-700 mb-4 text-center">
            {t('signup.prompt')} <br /> {t('signup.promptExample')}
        </p>

        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <input
            type="text"
            name="name"
            placeholder={t('signup.namePlaceholder')}
            required
            className="w-full px-4 py-2 border rounded"
            value={form.name}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder={t('signup.passwordPlaceholder')}
            required
            className="w-full px-4 py-2 border rounded"
            value={form.password}
            onChange={handleChange}
          />
          <button type="submit" className="w-full bg-[#31699e] text-white py-2 rounded">
            {t('signup.button')}
          </button>
        </form>
        
        {browserSupportsSpeechRecognition && (
          <button onClick={toggleListening} className={`mt-6 px-6 py-2 rounded text-white ${listening ? "bg-red-600" : "bg-green-600"}`}>
            {listening ? t('greeting.stopListening') : t('signup.speakNow')}
          </button>
        )}
        
        <p className="mt-4 text-sm text-gray-700">
            {t('signup.loginPrompt')}
            <Link to="/login" className="text-blue-600 hover:underline">{t('signup.loginLink')}</Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;