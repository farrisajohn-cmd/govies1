'use client';
import { useState } from 'react';

export default function Page() {
  const [messages, setMessages] = useState<{role:string;content:string;}[]>([]);
  const [input, setInput] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input) return;
    const newUserMsg = { role: 'user', content: input };
    setMessages([...messages, newUserMsg]);
    setInput('');

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: [...messages, newUserMsg] })
    });
    const data = await res.json();
    const aiMsg = data.choices?.[0]?.message;
    if (aiMsg) setMessages((prev) => [...prev, aiMsg]);
  };

  return (
    <div style={{ backgroundColor: '#111', color: '#fff', minHeight: '100vh', padding: '2rem' }}>
      <h1 style={{ color: '#179942' }}>Govies AI Chatbot</h1>
      <div style={{ margin: '2rem 0' }}>
        {messages.map((m, i) => (
          <div key={i} style={{ textAlign: m.role === 'user' ? 'right' : 'left', marginBottom: '1rem' }}>
            <span style={{
              display: 'inline-block',
              backgroundColor: m.role === 'user' ? '#179942' : '#333',
              color: '#fff',
              padding: '0.5rem 1rem',
              borderRadius: '1rem'
            }}>
              {m.content}
            </span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem' }}>
        <input
          style={{ flex: 1, padding: '0.5rem', borderRadius: '0.25rem', border: 'none' }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button style={{
          backgroundColor: '#179942',
          color: '#fff',
          border: 'none',
          padding: '0 1rem',
          borderRadius: '0.25rem'
        }}>Send</button>
      </form>
    </div>
  );
}
