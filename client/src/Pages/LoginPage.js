import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "https://chatapp-server-three-sage.vercel.app/login",
        {
          email,
          password,
        }
      );
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId);

      alert("Login successful");
      navigate("/match");
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="p-8 bg-white shadow-lg rounded-lg w-80">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      <input
        type="email"
        placeholder="Email"
        className="w-full px-3 py-2 border rounded mb-3"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full px-3 py-2 border rounded mb-3"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleLogin}
        className="w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600"
      >
        Sign In
      </button>

      <p className="text-center mt-3 flex gap-1">
        Not yet registered?
        <Link to="/register" className="text-pink-500">
          Register here
        </Link>
      </p>
    </div>
  );
}
export default LoginPage;
