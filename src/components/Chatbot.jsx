import React, { useState, useEffect, useRef } from "react";
import { FaRobot } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function Chatbot() {
  const theme = useSelector((state) => state.theme.theme);
  const [messages, setMessages] = useState([
    { text: "Hello! 👋 I'm your assistant. How can I help you?", from: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const chatEndRef = useRef(null);

  const handleSend = () => {
    if (input.trim()) {
      const userMessage = { text: input, from: "user" };
      setMessages((prev) => [...prev, userMessage]);
      setInput("");

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { text: "🤖 Chatbot not active right now.", from: "bot" },
        ]);
      }, 1000);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 transition-all duration-700 shadow-2xl rounded-2xl overflow-hidden border ${
        open ? "w-80 h-96" : "w-14 h-14"
      } ${
        theme === "dark"
          ? "bg-gray-800 border-gray-700 text-white"
          : "bg-white border-gray-300 text-black"
      }`}
    >
      {open ? (
        <div className="flex flex-col h-full">
          <div
            className={`flex justify-between items-center px-3 py-2 border-b ${
              theme === "dark" ? "border-gray-700" : "border-gray-300"
            }`}
          >
            <h2 className="font-semibold text-sm">Chatbot</h2>
            <button
              onClick={() => setOpen(false)}
              className="text-lg hover:text-red-500"
            >
              ✖
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`max-w-[80%] text-sm p-2 rounded-md break-words ${
                  msg.from === "user"
                    ? "bg-blue-600 text-white self-end ml-auto"
                    : theme === "dark"
                    ? "bg-gray-700 text-gray-100"
                    : "bg-gray-200 text-gray-900"
                }`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          <div
            className={`flex border-t ${
              theme === "dark" ? "border-gray-700" : "border-gray-300"
            }`}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className={`flex-1 px-3 py-2 text-sm outline-none ${
                theme === "dark"
                  ? "bg-gray-700 text-white placeholder-gray-400"
                  : "bg-gray-100 text-gray-800 placeholder-gray-500"
              }`}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 text-sm"
            >
              Send
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="w-full h-full flex justify-center items-center text-2xl hover:scale-110 transition-transform"
        >
          <FaRobot />
        </button>
      )}
    </div>
  );
}
