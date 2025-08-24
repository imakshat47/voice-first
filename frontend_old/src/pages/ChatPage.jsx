import React, { useState, useRef, useEffect, useContext } from "react";
import { useWebSpeech } from "../hooks/useWebSpeech";
import { LanguageContext } from "../contexts/LanguageContext";

const ChatPage = () => {
  const { language } = useContext(LanguageContext);
  const [messages, setMessages] = useState([]);
  
  const currentLangCode = `${language}-IN`;
  const { transcript, isListening, startListening, stopListening, setTranscript, speak, browserSupportsSpeechRecognition } = useWebSpeech(currentLangCode);
  
  // ... handleSend logic remains the same ...
  const handleSend = async (text) => { /* Omitted for brevity, logic is correct */ };
  
  // Mic click handler
  const handleMicClick = () => isListening ? stopListening() : startListening();

  // Scroll logic
  const messagesEndRef = useRef(null);
  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] p-4 bg-gray-100 dark:bg-slate-900">
      <h2 className="text-3xl font-bold mb-4 text-center text-gray-800 dark:text-gray-100">Chat with BolSaathi</h2>
      
      <div className="flex-grow border dark:border-slate-700 p-4 overflow-y-auto mb-4 bg-white dark:bg-slate-800 rounded-lg shadow-inner">
        {messages.map((msg, idx) => (
          <div key={idx} className={`mb-3 flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`p-3 rounded-xl max-w-lg shadow ${msg.from === "user" ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-slate-700 text-gray-800 dark:text-gray-200"}`}>
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex items-center justify-center flex-col gap-2">
         <p className="text-gray-600 dark:text-gray-400 italic">
            {isListening ? "Listening..." : "Click the mic to speak"}
        </p>
        <button onClick={handleMicClick} className={`w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl transition-all ${isListening ? "bg-red-500 animate-pulse" : "bg-green-600"}`}>
          🎤
        </button>
      </div>
    </div>
  );
};

export default ChatPage;