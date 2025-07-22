import React, { useState } from "react";
import bgImage from "../assets/login-bg.jpg"; // your anime image here

function Login({ users, onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = users.find(
      (u) => u.username === username && u.password === password
    );
    if (found) {
      onLogin(found);
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="backdrop-blur bg-black/40 shadow-[0_0_30px_rgba(255,255,255,0.1)] border border-white/20 p-8 sm:p-10 rounded-3xl w-[90%] max-w-md text-white transition-all duration-300">
        <h2
          className="text-center text-2xl sm:text-3xl font-bold mb-6 drop-shadow-[0_0_3px_black]"
          style={{ textShadow: "1px 1px 2px black" }}
        >
          Vrtxn Notes Journal
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            className="p-3 rounded-lg bg-white/90 text-black placeholder:text-gray-600 focus:outline-none shadow-md"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="p-3 rounded-lg bg-white/90 text-black placeholder:text-gray-600 focus:outline-none shadow-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <p
              className="text-red-400 text-sm"
              style={{ textShadow: "1px 1px 2px black" }}
            >
              {error}
            </p>
          )}
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold shadow-lg transition-all"
          >
            Login
          </button>
        </form>

        <p
          className="mt-6 text-sm text-center text-white/80"
          style={{ textShadow: "1px 1px 2px black" }}
        >
          All notes and notices for <br />
          <span className="font-medium">FYB.Sc.IT — Abhinav College</span>
        </p>
      </div>
    </div>
  );
}

export default Login;
