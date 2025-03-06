// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";

// const ChatRoom = () => {
//   const [conversations, setConversations] = useState([]);
//   const navigate = useNavigate();
//   const userId = localStorage.getItem("userId");

//   useEffect(() => {
//     const fetchConversations = async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:5000/conversations?userId=${userId}`
//         );
//         setConversations(res.data);
//       } catch (error) {
//         console.error("Error fetching conversations:", error);
//       }
//     };

//     if (userId) {
//       fetchConversations();
//     }
//   }, [userId]);

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col">
//       {/* Header */}
//       <header className="bg-white shadow p-4 flex items-center justify-between">
//         <h1 className="text-2xl font-bold text-gray-800">Chats</h1>
//         <Link
//           to="/match"
//           className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 transition"
//         >
//           Find Matches
//         </Link>
//       </header>

//       <div className="flex flex-grow">
//         {/* Conversations Sidebar */}
//         <div className="w-full md:w-1/3 border-r border-gray-300 p-4">
//           {conversations.length === 0 ? (
//             <p className="text-gray-600">No conversations yet.</p>
//           ) : (
//             <ul className="space-y-4">
//               {conversations.map((conversation) => (
//                 <li key={conversation._id}>
//                   <button
//                     className="w-full text-left p-4 bg-white shadow rounded hover:bg-gray-50 transition"
//                     onClick={() => navigate(`/chat/${conversation._id}`)}
//                   >
//                     <div className="flex items-center">
//                       <img
//                         src={conversation.userImage}
//                         alt={conversation.userName}
//                         className="w-12 h-12 rounded-full object-cover mr-4"
//                       />
//                       <div>
//                         <h3 className="font-semibold text-gray-800">
//                           {conversation.userName}
//                         </h3>
//                         <p className="text-gray-500 text-sm">
//                           {conversation.lastMessage &&
//                           conversation.lastMessage.length > 30
//                             ? conversation.lastMessage.substring(0, 30) + "..."
//                             : conversation.lastMessage || "No messages yet."}
//                         </p>
//                       </div>
//                     </div>
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>

//         {/* Chat Conversation Placeholder */}
//         <div className="flex-grow p-4 flex items-center justify-center">
//           <p className="text-gray-600">
//             Select a conversation to start chatting.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatRoom;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const ChatRoom = () => {
  const [conversations, setConversations] = useState([]);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/conversations?userId=${userId}`
        );
        setConversations(res.data);
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    };

    if (userId) {
      fetchConversations();
    }
  }, [userId]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow p-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Chats</h1>
        <Link
          to="/match"
          className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 transition"
        >
          Find Matches
        </Link>
      </header>

      <div className="flex flex-grow">
        {/* Conversations Sidebar */}
        <div className="w-full md:w-1/3 border-r border-gray-300 p-4 overflow-y-auto">
          {conversations.length === 0 ? (
            <p className="text-gray-600">No conversations yet.</p>
          ) : (
            <ul className="space-y-4">
              {conversations.map((conversation) => (
                <li key={conversation._id}>
                  <button
                    onClick={() => navigate(`/chat/${conversation._id}`)}
                    className="w-full text-left p-4 bg-white rounded shadow hover:bg-gray-50 transition flex items-center"
                  >
                    <img
                      src={conversation.userImage}
                      alt={conversation.userName}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div className="flex-grow">
                      <h3 className="font-semibold text-gray-800">
                        {conversation.userName}
                      </h3>
                      <p className="text-gray-500 text-sm">
                        {conversation.lastMessage &&
                        conversation.lastMessage.length > 30
                          ? conversation.lastMessage.substring(0, 30) + "..."
                          : conversation.lastMessage || "No messages yet."}
                      </p>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Chat Conversation Placeholder */}
        <div className="flex-grow p-4 flex items-center justify-center">
          <p className="text-gray-600 text-xl">
            Select a conversation to start chatting.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
