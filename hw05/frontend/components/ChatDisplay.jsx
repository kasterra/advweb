import { useState,useEffect } from "react";

function ChatDisplay({ sessionID }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!sessionID) return;

    const fetchChat = async () => {
      try {
        const response = await fetch(`/api/chat?sessionID=${sessionID}`);
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error("Failed to fetch chat:", error);
      }
    };

    fetchChat();
  }, [sessionID]);

  return (
    <div>
      {messages.map((msg, index) => (
        <div key={index}>
          <strong>{msg.SenderID}:</strong> {msg.MessageText} <em>({new Date(msg.Timestamp).toLocaleString()})</em>
        </div>
      ))}
    </div>
  );
}

export default ChatDisplay;