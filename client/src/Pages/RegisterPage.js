import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await axios.post("http://localhost:5000/register", { email, password });
      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (error) {
      alert("Registration failed");
    }
  };

  return (
    <div className="p-8 bg-white shadow-lg rounded-lg w-80">
      <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
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
        onClick={handleRegister}
        className="w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600"
      >
        Sign Up
      </button>
    </div>
  );
}
export default RegisterPage;
