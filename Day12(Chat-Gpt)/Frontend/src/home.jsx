import React, { useState, useRef, useEffect } from 'react';
import './styles/theme.css';

const samplePrevious = [
  { id: 'c1', title: 'Ideas for blog post', messages: [{ from: 'ai', text: 'Try writing about X...' }] },
  { id: 'c2', title: 'Project plan', messages: [{ from: 'ai', text: 'Start with an MVP...' }] },
];

/* Inline subcomponents to keep everything in this single file */
const ChatSidebar = ({ chats, activeChatId, onSelect, onCreate }) => (
  <aside className="chat-sidebar" aria-label="Previous chats">
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
      <strong>Previous</strong>
      <button className="btn" onClick={onCreate} aria-label="Create new chat">New</button>
    </div>

    <div className="chats-list">
      {chats.map((c) => (
        <div
          key={c.id}
          className={`chat-item ${c.id === activeChatId ? 'active' : ''}`}
          onClick={() => onSelect(c.id)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && onSelect(c.id)}
        >
          <div style={{ fontWeight: 600 }}>{c.title}</div>
          <div className="label" style={{ fontSize: 12 }}>{c.messages?.[c.messages.length - 1]?.text?.slice(0, 60)}</div>
        </div>
      ))}
    </div>
  </aside>
);

const Messages = ({ messages, loading, messagesRef }) => (
  <div ref={messagesRef} className="messages" role="log" aria-live="polite">
    {messages.length === 0 && <div className="label">No messages yet — say hi 👋</div>}
    {messages.map((m, i) => (
      <div key={i} className={`message ${m.from === 'user' ? 'user' : 'ai'}`}>{m.text}</div>
    ))}
    {loading && <div className="message ai">AI is typing...</div>}
  </div>
);

const Composer = ({ input, setInput, onSend, sending }) => (
  <form className="composer" onSubmit={onSend}>
    <input
      className="input"
      placeholder="Type a message"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      aria-label="Message input"
    />
    <button className="btn" type="submit" disabled={sending}>{sending ? '...' : 'Send'}</button>
  </form>
);

const ChatMain = ({ messages, loading, messagesRef, input, setInput, onSend, sending }) => (
  <main className="chat-main">
    <Messages messages={messages} loading={loading} messagesRef={messagesRef} />
    <Composer input={input} setInput={setInput} onSend={onSend} sending={sending} />
  </main>
);

const Home = () => {
  const [chats, setChats] = useState(samplePrevious);
  const [activeChatId, setActiveChatId] = useState(chats[0]?.id || null);
  const [messages, setMessages] = useState(chats[0]?.messages || []);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesRef = useRef(null);

  useEffect(() => {
    const active = chats.find((c) => c.id === activeChatId);
    setMessages(active ? active.messages : []);
  }, [activeChatId, chats]);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages, loading]);

  function selectChat(id) {
    setActiveChatId(id);
  }

  function createNewChat() {
    const id = 'c_' + Date.now();
    const newChat = { id, title: 'New chat', messages: [] };
    setChats((s) => [newChat, ...s]);
    setActiveChatId(id);
  }

  function handleSend(e) {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = { from: 'user', text: input };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);

    setChats((prev) => prev.map((c) => (c.id === activeChatId ? { ...c, messages: nextMessages } : c)));
    setInput('');

    setLoading(true);
    setTimeout(() => {
      const aiMsg = { from: 'ai', text: 'This is a simulated AI response to: ' + userMsg.text };
      const withAi = [...nextMessages, aiMsg];
      setMessages(withAi);
      setChats((prev) => prev.map((c) => (c.id === activeChatId ? { ...c, messages: withAi } : c)));
      setLoading(false);
    }, 800);
  }

  return (
    <div className="container">
      <div className="chat-app">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0 }}>Chat</h2>
          <div>
            <button className="btn" onClick={createNewChat}>New chat</button>
          </div>
        </div>

        <div className="chat-shell">
          <ChatSidebar chats={chats} activeChatId={activeChatId} onSelect={selectChat} onCreate={createNewChat} />
          <ChatMain messages={messages} loading={loading} messagesRef={messagesRef} input={input} setInput={setInput} onSend={handleSend} sending={loading} />
        </div>
      </div>
    </div>
  );
};

export default Home;