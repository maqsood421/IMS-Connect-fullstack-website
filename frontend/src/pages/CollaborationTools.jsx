import React, { useState } from 'react';
import '../index.css';

function CollaborationTools() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const loggedInUserProgress = [
    { phase: 'Brainstorming', status: 'Completed' },
    { phase: 'Planning', status: 'In Progress' },
    { phase: 'Execution', status: 'Pending' },
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { sender: 'You', text: newMessage }]);
      setNewMessage('');
    }
  };

  return (
    <div className="collaboration-container">
      <div className="progress-container">
        <h2 className="section-header">Your Progress</h2>
        <ul className="progress-list">
          {loggedInUserProgress.map((item, index) => (
            <li key={index} className="progress-item">
              <span className="progress-phase">{item.phase}</span>
              <span className={`progress-status ${item.status.toLowerCase()}`}>{item.status}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="chat-container">
        <h2 className="section-header">Community Chat</h2>
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div key={index} className="chat-message">
              <strong>{message.sender}: </strong>
              <span>{message.text}</span>
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default CollaborationTools;
