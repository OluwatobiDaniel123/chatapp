// import { Link, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import axios from "axios";

// function RegisterPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");
//   const [gender, setGender] = useState("");
//   const [age, setAge] = useState("");
//   const [location, setLocation] = useState("");
//   const [bio, setBio] = useState("");
//   const [image, setImage] = useState("");
//   const [interests, setInterests] = useState("");
//   const navigate = useNavigate();

//   const handleRegister = async () => {
//     if (!email || !password || !name || !gender || !age || !location) {
//       alert("Please fill all required fields.");
//       return;
//     }

//     try {
//       await axios.post("http://localhost:5000/register", {
//         email,
//         password,
//         name,
//         gender,
//         age,
//         location,
//         bio,
//         image,
//         interests: interests.split(",").map((item) => item.trim()), // Convert to array
//       });
//       alert("Registration successful! Please login.");
//       navigate("/login");
//     } catch (error) {
//       alert("Registration failed");
//     }
//   };

//   return (
//     <div className="p-8 bg-white shadow-lg rounded-lg w-80">
//       <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

//       <input
//         type="text"
//         placeholder="Name"
//         className="w-full px-3 py-2 border rounded mb-3"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//       />

//       <select
//         className="w-full px-3 py-2 border rounded mb-3"
//         value={gender}
//         onChange={(e) => setGender(e.target.value)}
//       >
//         <option value="">Select Gender</option>
//         <option value="Male">Male</option>
//         <option value="Female">Female</option>
//         <option value="Other">Other</option>
//       </select>

//       <input
//         type="number"
//         placeholder="Age"
//         className="w-full px-3 py-2 border rounded mb-3"
//         value={age}
//         onChange={(e) => setAge(e.target.value)}
//       />

//       <input
//         type="text"
//         placeholder="Location"
//         className="w-full px-3 py-2 border rounded mb-3"
//         value={location}
//         onChange={(e) => setLocation(e.target.value)}
//       />

//       <input
//         type="email"
//         placeholder="Email"
//         className="w-full px-3 py-2 border rounded mb-3"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />

//       <input
//         type="password"
//         placeholder="Password"
//         className="w-full px-3 py-2 border rounded mb-3"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />

//       <textarea
//         placeholder="Bio (optional)"
//         className="w-full px-3 py-2 border rounded mb-3"
//         value={bio}
//         onChange={(e) => setBio(e.target.value)}
//       ></textarea>

//       <input
//         type="text"
//         placeholder="Profile Image URL (optional)"
//         className="w-full px-3 py-2 border rounded mb-3"
//         value={image}
//         onChange={(e) => setImage(e.target.value)}
//       />

//       <input
//         type="text"
//         placeholder="Interests (comma-separated)"
//         className="w-full px-3 py-2 border rounded mb-3"
//         value={interests}
//         onChange={(e) => setInterests(e.target.value)}
//       />

//       <button
//         onClick={handleRegister}
//         className="w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600"
//       >
//         Sign Up
//       </button>

//       <p className="text-center mt-3">
//         Already have an account?{" "}
//         <Link to="/login" className="text-pink-500">
//           Login here
//         </Link>
//       </p>
//     </div>
//   );
// }

// export default RegisterPage;
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    age: "",
    location: "",
    bio: "",
    interests: "",
    image: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    for (let key in formData) {
      data.append(key, formData[key]);
    }

    try {
      await axios.post(
        "https://chatapp-server-three-sage.vercel.app/register",
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (error) {
      console.error("Registration failed", error);
      alert("Registration failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 border rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-5 text-center">Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="block w-full border p-2 mb-2"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="block w-full border p-2 mb-2"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="block w-full border p-2 mb-2"
        />
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
          className="block w-full border p-2 mb-2"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          required
          className="block w-full border p-2 mb-2"
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
          className="block w-full border p-2 mb-2"
        />
        <textarea
          name="bio"
          placeholder="Bio"
          value={formData.bio}
          onChange={handleChange}
          className="block w-full border p-2 mb-2"
        />
        <input
          type="text"
          name="interests"
          placeholder="Interests (comma-separated)"
          value={formData.interests}
          onChange={handleChange}
          className="block w-full border p-2 mb-2"
        />
        <input
          type="file"
          name="image"
          onChange={handleImageChange}
          required
          className="block w-full border p-2 mb-4"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600 transition"
        >
          Register
        </button>

        <p className="text-center mt-3 flex gap-1">
          Already have an account?
          <Link to="/login" className="text-pink-500">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
