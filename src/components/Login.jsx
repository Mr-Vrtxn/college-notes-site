import React, { useState } from "react";

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
    <div className="flex justify-center items-center h-screen bg-gray-100 px-4 text-center">
      <div>
        <h1 className="text-2xl font-bold text-indigo-700 mb-6">
          Welcome to Vrtxn Notes Journal
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md p-6 rounded-lg w-80 mx-auto"
        >
          <h2 className="text-lg font-bold mb-4 text-center">Login</h2>

          <input
            type="text"
            placeholder="Username"
            className="w-full mb-3 p-2 border rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full mb-3 p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-4">
          All notes and notices related to FYB.Sc.IT Abhinav College
        </p>
      </div>
    </div>
  );
}

export default Login;
