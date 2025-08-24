import React, { useState, useEffect, useRef } from "react";
import { useSpeechRecognition } from "react-speech-kit";
import axios from "axios";

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef(null);

  const { listen, stop, listening } = useSpeechRecognition({
    onResult: (result) => setInput(result),
  });

  const speak = (text) => {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-IN";
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };
  
  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { from: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      // const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/query`, {
      //   session_id: "john1", // This should be dynamic from AuthContext
      //   user_input: input,
      // });
      // const botReply = response.data.data.response || "Sorry, I couldn't find details.";
      
      // MOCK RESPONSE for demonstration
      await new Promise(res => setTimeout(res, 1500)); // Simulate network delay
      const botReply = `You asked about "${input}". Here is some information I found. According to source one, the details are...`;
      // End Mock

      const botMsg = { from: "bot", text: botReply };
      setMessages((prev) => [...prev, botMsg]);
      speak(botReply); // Speak the bot's response
    } catch (err) {
      const errorMsg = { from: "bot", text: "Error contacting the server." };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-gray-200 p-4">
      <div className="flex-grow border p-4 overflow-y-auto mb-4 bg-white rounded shadow-inner">
        {messages.map((msg, idx) => (
          <div key={idx} className={`mb-3 flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
            <span
              className={`inline-block px-4 py-2 rounded-lg max-w-lg ${
                msg.from === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300 text-gray-800"
              }`}
            >
              {msg.text}
            </span>
          </div>
        ))}
        {isLoading && <div className="text-center text-gray-500">Bot is typing...</div>}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex items-center gap-2">
        <input
          className="border p-2 rounded w-full"
          placeholder="Ask something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          disabled={isLoading}
        />
        <button
          onClick={() => (listening ? stop() : listen())}
          className={`px-4 py-2 rounded text-white ${listening ? "bg-red-600" : "bg-green-600"}`}
          disabled={isLoading}
        >
          {listening ? "🛑" : "🎤"}
        </button>
         <button onClick={() => speak(messages[messages.length - 1]?.text)} disabled={!messages.length || isSpeaking} className="p-2 bg-yellow-500 text-white rounded">
            {isSpeaking ? "🔊" : "📢"}
        </button>
        <button
          onClick={handleSend}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          disabled={isLoading}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatInterface;