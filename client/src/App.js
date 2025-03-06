import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ChatPage from "./Pages/ChatPage";
import RegisterPage from "./Pages/RegisterPage";
import LoginPage from "./Pages/LoginPage";
import LandingPage from "./Pages/LandingPage";
import MatchPage from "./Pages/MatchPage";
import ProfilePage from "./Pages/ProfilePage";
import ChatRoom from "./Pages/ChatRoom";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/match" element={<MatchPage />} />
          <Route path="/profile/:id" element={<ProfilePage />} />
          <Route path="/chatroom" element={<ChatRoom />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
