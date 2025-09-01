import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import "./App.css"; 

function App() {
  const [socket, setsocket] = useState(null)
  const [inputText, setInputText] = useState("");
  const [conversation, setConversation] = useState([]);

  const handleSend = () => {
    if (inputText.trim() === "") return;

    // Add user message to conversation
    setConversation([...conversation, { sender: "user", text: inputText }]);
    setInputText(""); // Clear input field
 
    // Simulate bot response
    setTimeout(() => {
      setConversation((prev) => [
        ...prev,
        { sender: "bot", text: "This is a bot response!" },
      ]);
    }, 1000);

    socket.emit('ai-message',inputText)

    setInputText("")


  };

  useEffect(() => {
    const socketInstance = io("http://localhost:3000");
    setsocket(socketInstance);

    socketInstance.on('ai-message-response',(response)=>{
      const botMessage = {
        id: Date.now() ,
        sender: "bot" + 1 ,
        text: response,
        timestamp: new Date().toLocaleTimeString()
      }

      setConversation((prev)=>[...prev, botMessage])
    })

},[]);
 

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
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default App;
