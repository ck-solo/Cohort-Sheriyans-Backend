import React, { useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [conversation, setConversation] = useState([]);

  const handleSend = () => {
    if (input.trim() === "") return;

    // Add user message to conversation
    setConversation([...conversation, { sender: "user", text: input }]);
    setInput(""); // Clear input field

    // Simulate bot response
    setTimeout(() => {
      setConversation((prev) => [
        ...prev,
        { sender: "bot", text: "This is a bot response!" },
      ]);
    }, 1000);
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Chat Screen</h2>
      </div>
      <div className="chat-history">
        {conversation.length === 0 && <h2>Start the conversation</h2>}
        {conversation.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default App;
