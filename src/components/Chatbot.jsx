import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, Bot, User, Sparkles } from "lucide-react";
import { useSelector } from "react-redux";

export default function Chatbot() {
  const theme = useSelector((state) => state.theme.theme);
  const [messages, setMessages] = useState([
    { text: "Hello! 👋 I'm your CodeCompiler assistant. How can I help you with your code today?", from: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const handleSend = () => {
    if (input.trim()) {
      const userMessage = { text: input, from: "user" };
      setMessages((prev) => [...prev, userMessage]);
      setInput("");
      setIsTyping(true);

      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          { text: "I'm currently in 'UI mode', but I'm being trained to help you debug and write code soon! 🚀", from: "bot" },
        ]);
      }, 1500);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {open ? (
        <div 
          className={`w-96 h-[500px] flex flex-col shadow-2xl rounded-2xl overflow-hidden border transition-all duration-300 animate-in zoom-in-95 ${
            theme === "dark" 
              ? "bg-gray-900/90 border-gray-800 backdrop-blur-xl text-white" 
              : "bg-white/90 border-gray-200 backdrop-blur-xl text-gray-900"
          }`}
        >
          {/* Header */}
          <div className={`px-4 py-3 flex justify-between items-center border-b ${
            theme === "dark" ? "border-gray-800 bg-gray-800/50" : "border-gray-100 bg-gray-50/50"
          }`}>
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 p-1.5 rounded-lg">
                <Bot size={18} className="text-white" />
              </div>
              <div>
                <h2 className="font-bold text-sm">Code Assistant</h2>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                  <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">Online</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="p-1.5 hover:bg-gray-500/20 rounded-full transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-3 ${msg.from === "user" ? "flex-row-reverse" : "flex-row"}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm ${
                  msg.from === "user" 
                    ? "bg-gradient-to-tr from-blue-600 to-indigo-600" 
                    : theme === "dark" ? "bg-gray-800" : "bg-gray-100"
                }`}>
                  {msg.from === "user" ? <User size={14} className="text-white" /> : <Bot size={14} className="text-blue-500" />}
                </div>
                <div
                  className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm shadow-sm ${
                    msg.from === "user"
                      ? "bg-blue-600 text-white rounded-tr-none"
                      : theme === "dark"
                      ? "bg-gray-800 text-gray-100 rounded-tl-none border border-gray-700"
                      : "bg-gray-100 text-gray-800 rounded-tl-none border border-gray-200"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${theme === "dark" ? "bg-gray-800" : "bg-gray-100"}`}>
                  <Bot size={14} className="text-blue-500" />
                </div>
                <div className={`px-4 py-3 rounded-2xl rounded-tl-none flex gap-1 ${theme === "dark" ? "bg-gray-800" : "bg-gray-100"}`}>
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce delay-100"></span>
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce delay-200"></span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <div className={`p-4 border-t ${theme === "dark" ? "border-gray-800" : "border-gray-100"}`}>
            <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border transition-all ${
              theme === "dark" 
                ? "bg-gray-800/50 border-gray-700 focus-within:border-blue-500" 
                : "bg-gray-50 border-gray-200 focus-within:border-blue-500 shadow-inner"
            }`}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-gray-500"
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className={`p-1.5 rounded-lg transition-all ${
                  input.trim() 
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30 hover:scale-105" 
                    : "text-gray-500"
                }`}
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="group relative w-16 h-16 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl flex justify-center items-center shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95"
        >
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse"></div>
          <MessageSquare size={28} className="group-hover:rotate-12 transition-transform" />
          <div className="absolute -left-20 bg-gray-900 text-white text-[10px] py-1 px-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none uppercase tracking-tighter font-bold">
            Need help?
          </div>
        </button>
      )}
    </div>
  );
}

