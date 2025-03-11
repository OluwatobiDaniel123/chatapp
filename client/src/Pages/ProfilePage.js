// ProfilePage.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `https://chatapp-server-three-sage.vercel.app/profiles/${id}`
        );
        setProfile(res.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [id]);

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
          <button
            onClick={() => navigate(-1)}
            className="text-blue-500 hover:underline"
          >
            Back
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-10">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Profile Image */}
            <div className="md:w-1/3">
              <img
                src={profile.image}
                alt={profile.name}
                className="object-cover h-64 w-full"
              />
            </div>

            {/* Profile Details */}
            <div className="md:w-2/3 p-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {profile.name}
              </h2>
              <p className="text-gray-600 mt-2">
                Age: <span className="font-medium">{profile.age}</span>
              </p>
              <p className="text-gray-600 mt-2">
                Location:{" "}
                <span className="font-medium">{profile.location}</span>
              </p>{" "}
              <p className="text-gray-600 mt-2">
                Email: <span className="font-medium">{profile.email}</span>
              </p>
              <p className="text-gray-700 mt-4">{profile.bio}</p>
              {/* Interests */}
              <div className="mt-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  Interests
                </h3>
                {profile.interests && profile.interests.length > 0 ? (
                  <ul className="list-disc list-inside mt-2 text-gray-700">
                    {profile.interests.map((interest, index) => (
                      <li key={index}>{interest}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-600">No interests listed</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
