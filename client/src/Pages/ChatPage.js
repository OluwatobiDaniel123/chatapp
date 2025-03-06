import { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
const socket = io("http://localhost:5000");

function ChatPage() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      try {
        const res = await axios.get("http://localhost:5000/profile", {
          headers: { Authorization: token },
        });
        setUser(res.data);
      } catch (error) {
        alert("Session expired, please login again");
        localStorage.removeItem("token");
        navigate("/login");
      }
    };
    fetchProfile();
  }, [navigate]);

  useEffect(() => {
    socket.on("receive_message", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });
  }, []);

  const sendMessage = () => {
    if (message.trim() === "") return;
    const newMessage = { user: user.email, text: message };
    socket.emit("send_message", newMessage);
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setMessage("");
  };

  const handleLogout = () => {
    // localStorage.removeItem("token");
    navigate("/chatroom");
  };

  return (
    <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-5">
      {user ? (
        <>
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Chat Room</h2>
            <button onClick={handleLogout} className="text-red-500 text-sm">
              Back
            </button>
          </div>
          <p className="text-center text-gray-500 mb-3">
            Welcome, {user.email}!
          </p>
          <div className="h-60 overflow-y-auto p-2 border rounded mb-3">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.user === user.email ? "justify-end" : "justify-start"
                } mb-2`}
              >
                <p
                  className={`text-sm p-2 rounded max-w-xs ${
                    msg.user === user.email
                      ? "bg-pink-500 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  <strong>{msg.user}:</strong> {msg.text}
                </p>
              </div>
            ))}
          </div>
          <input
            type="text"
            placeholder="Type a message..."
            className="w-full px-3 py-2 border rounded"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="w-full mt-2 bg-pink-500 text-white py-2 rounded hover:bg-pink-600 disabled:opacity-50"
            disabled={!message.trim()}
          >
            Send
          </button>
        </>
      ) : (
        <p className="text-center text-gray-500">Loading...</p>
      )}
    </div>
  );
}
export default ChatPage;
