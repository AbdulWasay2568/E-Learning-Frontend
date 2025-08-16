import React, { useState } from "react";

export default function Chatbot() {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([
    { sender: "Bot", text: "Hello! How can I help you today?" },
    { sender: "You", text: "Can you give me a summary of the last lecture?" },
    { sender: "Bot", text: "Sure! The lecture covered Vue.js basics and templating." },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { sender: "You", text: input }]);
    setInput("");

    // Simulate bot reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "Bot", text: "This is a sample reply." },
      ]);
    }, 600);
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow-md mt-4 h-[400px] flex flex-col">
      <h2 className="text-lg font-bold mb-2">Chatbot</h2>
      <div className="flex-1 overflow-y-auto space-y-2 mb-3">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${
              m.sender === "You" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[75%] px-3 py-2 rounded-lg ${
                m.sender === "You"
                  ? "bg-blue-600 text-white rounded-br-none"
                  : "bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-white rounded-bl-none"
              }`}
            >
              <p className="text-sm">{m.text}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 border-b-gray-500 border rounded-full px-3 py-2 dark:bg-gray-800 dark:text-white"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}
