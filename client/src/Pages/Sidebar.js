// // Sidebar.js
// import React from "react";
// import { useNavigate } from "react-router-dom";

// const Sidebar = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="fixed top-0 left-0 h-full w-64 bg-gray-800 text-white p-4">
//       <h2 className="text-xl font-bold mb-6">Menu</h2>
//       <button
//         onClick={() => navigate("/notifications")}
//         className="block w-full text-left py-2 px-4 hover:bg-gray-700 rounded mb-2"
//       >
//         Notifications
//       </button>
//       <button
//         onClick={() => navigate("/chat")}
//         className="block w-full text-left py-2 px-4 hover:bg-gray-700 rounded mb-2"
//       >
//         Chatroom
//       </button>
//       <button
//         onClick={() => navigate("/calls")}
//         className="block w-full text-left py-2 px-4 hover:bg-gray-700 rounded"
//       >
//         Calls
//       </button>
//     </div>
//   );
// };

// export default Sidebar;
// SidebarToggle.js
import React from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white p-4 transition-transform transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <button onClick={onClose} className="mb-6 text-white hover:text-gray-300">
        Close ✖
      </button>
      <h2 className="text-xl font-bold mb-6">Menu</h2>
      <button
        onClick={() => {
          navigate("/notifications");
          onClose();
        }}
        className="block w-full text-left py-2 px-4 hover:bg-gray-700 rounded mb-2"
      >
        Notifications
      </button>
      <button
        onClick={() => {
          navigate("/chatroom");
          onClose();
        }}
        className="block w-full text-left py-2 px-4 hover:bg-gray-700 rounded mb-2"
      >
        Chatroom
      </button>
      <button
        onClick={() => {
          navigate("/calls");
          onClose();
        }}
        className="block w-full text-left py-2 px-4 hover:bg-gray-700 rounded"
      >
        Calls
      </button>
    </div>
  );
};

export default Sidebar;
