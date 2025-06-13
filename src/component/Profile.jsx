import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("loggedInUser"));
    if (userData) {
      setUser({
        ...userData,
        avatar: `https://ui-avatars.com/api/?name=${userData.name}&background=random`,
        title: "Assistant software  Developer",
        bio: "Passionate developer who loves building responsive web apps.",
        socials: {
          github: "https://github.com/",
          linkedin: "https://linkedin.com/",
          twitter: "https://twitter.com/",
        },
      });
    }
  }, []);
  if (!user)
    return <div className="text-center mt-10 text-xl">Loading Profile...</div>;
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-200 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-6 text-center transition hover:shadow-2xl">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-32 h-32 mx-auto rounded-full shadow-md border-4 border-white"
        />
        <h2 className="text-2xl font-bold mt-4 text-gray-800">
          Hello , {user.name}
        </h2>
        <p className="text-sm text-gray-500">{user.title}</p>
        <p className="mt-3 text-gray-600">{user.bio}</p>
        <p className="text-sm text-gray-500">Contact No: {user.phone}</p>
        <p className="mt-3 text-gray-600">Email Address:{user.email}</p>

        <div className="flex justify-center space-x-4 mt-6">
          <Link
            to={user.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-black text-xl"
          >
            <FaGithub />
          </Link>
          <Link
            to={user.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 text-xl"
          >
            <FaLinkedin />
          </Link>
          <Link
            to={user.socials.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-500 hover:text-sky-700 text-xl"
          >
            <FaTwitter />
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Profile;
