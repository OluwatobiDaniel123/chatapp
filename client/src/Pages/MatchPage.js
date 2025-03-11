import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { io } from "socket.io-client";
import SidebarToggle from "./Sidebar";

const socket = io("http://localhost:5000");

function MatchPage() {
  const [profiles, setProfiles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [matchUser, setMatchUser] = useState(null);
  const [likeNotification, setLikeNotification] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      console.error("User ID is missing. Redirecting to login...");
      navigate("/login");
      return;
    }

    socket.emit("registerUser", userId);

    socket.on("receiveLike", ({ fromUserId }) => {
      setLikeNotification(`User ${fromUserId} liked you! Like back?`);
      // Auto-dismiss the notification after 5 seconds:
      setTimeout(() => setLikeNotification(null), 5000);
    });

    return () => {
      socket.off("receiveLike");
    };
  }, [userId, navigate]);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const res = await axios.get(
          `https://chatapp-server-three-sage.vercel.app/profiles?userId=${userId}`
        );
        setProfiles(res.data);
        console.log("Fetched profiles:", res.data);
      } catch (error) {
        console.error("Error fetching profiles:", error);
      }
    };
    fetchProfiles();
  }, [userId]);

  const handleLike = async () => {
    if (!profiles[currentIndex]) return;

    const likedUserId = profiles[currentIndex]._id;
    socket.emit("sendLike", { fromUserId: userId, toUserId: likedUserId });

    try {
      const res = await axios.post("http://localhost:5000/like", {
        userId,
        likedUserId,
      });

      if (res.data.match) {
        setMatchUser(profiles[currentIndex]);
        setTimeout(() => navigate("/chat"), 1000);
      }
    } catch (error) {
      console.error("Error sending like:", error);
    }

    setCurrentIndex((prev) => prev + 1);
  };

  const handleSkip = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  const handleSendMessage = () => {
    navigate("/chat", { state: { targetUser: profiles[currentIndex] } });
  };

  if (currentIndex >= profiles.length) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="absolute top-4 left-4 text-white"
        >
          ☰
        </button>
        <div className="text-center text-2xl">No more profiles available</div>
      </div>
    );
  }

  const currentProfile = profiles[currentIndex];

  return (
    <div className="relative min-h-screen bg-gray-900 text-white">
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="absolute top-4 left-4 z-20 text-white text-3xl"
      >
        ☰
      </button>

      <SidebarToggle
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="flex items-center justify-center h-screen">
        {likeNotification && (
          <div className="absolute top-16 left-20 bg-gray-800 text-white p-4 rounded-lg shadow-lg">
            {likeNotification}
          </div>
        )}

        {matchUser && (
          <div className="absolute bg-black bg-opacity-70 p-6 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-pink-500">
              It's a Match! ❤️
            </h2>
            <p>You and {matchUser.name} liked each other!</p>
          </div>
        )}

        {currentProfile && (
          <motion.div
            key={currentProfile._id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.5 }}
            className="w-auto bg-gray-800 p-6 rounded-lg shadow-lg text-center"
          >
            <img
              src={currentProfile.image}
              alt="Profile"
              className="w-full h-64 object-cover rounded-lg cursor-pointer"
              onClick={() => navigate(`/profile/${currentProfile._id}`)}
            />
            <h2 className="text-2xl font-bold mt-4">{currentProfile.name}</h2>
            <p className="text-gray-400 text-sm">
              {currentProfile.age} years old • {currentProfile.location}
            </p>
            <p className="text-gray-400 mt-2">{currentProfile.bio}</p>
            <p className="text-gray-400 mt-2">
              Interests:
              {currentProfile.interests?.join(", ") || "No interests listed"}
            </p>
            <div className="mt-6 flex justify-between gap-4">
              <button
                onClick={handleSkip}
                className="px-6 py-2 flex items-center bg-gray-600 rounded-xl hover:bg-gray-700"
              >
                ❌ <span>Skip</span>
              </button>
              <button
                onClick={handleLike}
                className="px-6 py-2 flex items-center gap-2 bg-pink-500 rounded-xl hover:bg-pink-600"
              >
                ❤️
                <span>{currentProfile.likes.length}</span>
                Like
              </button>
              <button
                onClick={handleSendMessage}
                className="px-6 py-2 bg-blue-500 rounded-xl hover:bg-blue-600"
              >
                💬 Send Message
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default MatchPage;
