import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import "../index.css";

function CollaborationTools() {
  const [messages, setMessages] = useState([]); // Messages array
  const [newMessage, setNewMessage] = useState({
    from: {
      _id: JSON.parse(localStorage.getItem("user"))._id,
      name: JSON.parse(localStorage.getItem("user")).name,
    },
    content: "",
  }); // New message input
  const [ideas, setIdeas] = useState([]); // State to store ideas

  // Socket reference to prevent re-creating the socket on each render
  const socketRef = useRef(null);

  // Reference to the messages container
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    // Initialize socket connection
    socketRef.current = io("http://localhost:3000");

    // Listen for new messages via WebSocket
    socketRef.current.on("newMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Cleanup socket connection on component unmount
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  useEffect(() => {
    // Fetch ideas for the logged-in user from the backend
    const fetchIdeas = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/ideas/get-user-ideas", {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        });
        if (response.ok) {
          const data = await response.json();
          setIdeas(data); // Set the fetched ideas
        } else {
          console.error("Error fetching ideas");
        }
      } catch (error) {
        console.error("Error fetching ideas:", error);
      }
    };

    fetchIdeas();
  }, []);

  useEffect(() => {
    // Fetch messages from the backend
    const fetchMessages = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/messages", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        if (response.ok) {
          const data = await response.json();
          setMessages(data); // Set the fetched messages
        } else {
          console.error("Error fetching messages");
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [messages]);

  const handleSendMessage = async () => {
    if (newMessage.content.trim()) {
      const message = { content: newMessage.content, from: newMessage.from };

      try {
        const response = await fetch("http://localhost:5000/api/messages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
          body: JSON.stringify(message),
        });

        if (response.ok) {
          const data = await response.json();
          // Emit the message to other users via WebSocket
          socketRef.current.emit("sendMessage", message);
          setMessages((prevMessages) => [...prevMessages, message]); // Update the local messages
        } else {
          console.error("Error sending message");
        }
      } catch (error) {
        console.error("Error posting message:", error);
      }

      // Clear message content after sending
      setNewMessage((prev) => ({ ...prev, content: "" }));
    }
  };

  return (
    <div className="collaboration-container">
      <div className="progress-container">
        <h2 className="section-header">Your Progress on Ideas</h2>
        <div className="card-grid">
          {ideas.length > 0 ? (
            ideas.map((idea, index) => (
              <div key={index} className="idea-card">
                <h3 className="card-title">{idea.title}</h3>
                <p className="card-description">{idea.description}</p>
                <p className="card-votes" style={{ color: "green", fontWeight: "bold" }}>
                  Votes: {idea.votes}
                </p>
              </div>
            ))
          ) : (
            <div className="idea-card empty-card">
              <p>No ideas submitted yet.</p>
            </div>
          )}
        </div>
      </div>

      <div className="chat-container" style={{ maxHeight: "100vh" }}>
        <h2 className="section-header">Community Chat</h2>
        <div
          className="chat-messages"
          ref={messagesContainerRef}
          style={{ display: "flex", flexDirection: "column", width: "100%", alignItems: "flex-end", overflowY: "hidden", maxHeight: "70vh" }}
        >
          {messages.map((message, index) => (
            <div key={index} className={message.from._id === JSON.parse(localStorage.getItem("user"))._id ? "chat-message" : "my-messages"}>
              <div className="message-content" style={{ display: "flex", flexDirection: "column", background: message.from._id === JSON.parse(localStorage.getItem("user"))._id ? "#c9e1c9" : "#d499e7" }}>
                <strong style={{ color: message.from._id === JSON.parse(localStorage.getItem("user"))._id ? "#07b36b" : "#9132af" }}>
                  {message.from._id === JSON.parse(localStorage.getItem("user"))._id ? "You" : message.from.name}
                </strong>
                <span>{message.content}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="chat-input" style={{ position: "relative" }}>
          <input
            type="text"
            value={newMessage.content}
            onChange={(e) => setNewMessage((prev) => ({ ...prev, content: e.target.value }))}
            placeholder="Type your message..."
            style={{ outline: "none", border: "1px solid white", backgroundColor: "#ededed" }}
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default CollaborationTools;
