'use client';

import { useState } from 'react';

export default function Page() {
  const [input, setInput] = useState('');
  const [chat, setChat] = useState<string[]>([]);

  const sendMessage = async () => {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input }),
    });
    const data = await res.text();
    setChat((prev) => [...prev, `You: ${input}`, `Bot: ${data}`]);
    setInput('');
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Govies FHA Chatbot</h1>
      <div className="space-y-2 mb-4">
        {chat.map((msg, i) => (
          <div key={i} className="p-2 bg-gray-800 rounded">{msg}</div>
        ))}
      </div>
      <div className="flex space-x-2">
        <input
          className="flex-1 p-2 bg-gray-800 rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask for FHA quote..."
        />
        <button className="p-2 bg-green-600 rounded" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}
