// college-notes-site/src/App.jsx
import React, { useState } from "react";
import DailyNotes from "./components/DailyNotes";
import FairNotes from "./components/FairNotes";
import Notices from "./components/Notices";
import Login from "./components/Login";

const USERS = [
  { username: "Vrtxn", password: "12345" },
];

function App() {
  const [user, setUser] = useState(null);
  const [tab, setTab] = useState("daily");
  const [refreshKey, setRefreshKey] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleRefresh = () => setRefreshKey((prev) => prev + 1);

  if (!user)
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-100">
        <Login users={USERS} onLogin={setUser} />
      </div>
    );

  return (
    <div className={`${darkMode ? "dark bg-gray-900 text-white" : "bg-white text-black"} min-h-screen p-4 font-sans relative`}>
      <header className={`mb-6 px-4 sm:px-6 py-4 shadow rounded-xl border ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-blue-100"}`}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-indigo-700">*Vrtxn's Notes Journal*</h1>
            <p className="text-sm text-gray-600 dark:text-gray-300">Hello, {user.username} 👋</p>
          </div>
          <button
            className="sm:hidden text-indigo-600 dark:text-indigo-400 text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>
        <div className={`mt-4 sm:mt-0 sm:flex justify-between items-center ${menuOpen ? "block" : "hidden sm:flex"}`}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mt-4 sm:mt-0">
            <button
              onClick={handleRefresh}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md shadow w-full sm:w-auto"
            >
              🔄 Refresh
            </button>
            <button
              onClick={() => setUser(null)}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md shadow w-full sm:w-auto"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className={`flex ${menuOpen ? "flex-col" : "flex-col sm:flex-row"} justify-center gap-2 sm:gap-4 mb-6`}>
        <button
          className={`px-4 py-2 rounded-md shadow font-medium text-sm sm:text-base transition-all ${tab === "daily" ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-white"}`}
          onClick={() => setTab("daily")}
        >
          📅 Daily Notes
        </button>
        <button
          className={`px-4 py-2 rounded-md shadow font-medium text-sm sm:text-base transition-all ${tab === "fair" ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-white"}`}
          onClick={() => setTab("fair")}
        >
          📘 Fair Notes
        </button>
        <button
          className={`px-4 py-2 rounded-md shadow font-medium text-sm sm:text-base transition-all ${tab === "notices" ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-white"}`}
          onClick={() => setTab("notices")}
        >
          📢 Notices & Time Tables
        </button>
      </div>

      <div className={`rounded-xl shadow p-4 sm:p-6 border ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
        {tab === "daily" && <DailyNotes key={refreshKey} sortOrder="desc" />}
        {tab === "fair" && <FairNotes key={refreshKey} />}
        {tab === "notices" && <Notices key={refreshKey} />}
      </div>

      <button
        onClick={() => setDarkMode(!darkMode)}
        className="fixed bottom-20 right-4 bg-gray-600 hover:bg-gray-700 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
        title="Toggle Dark Mode"
      >
        {darkMode ? "☀️" : "🌙"}
      </button>

      <a
        href="https://www.instagram.com/mr_vrtxn/"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 w-12 h-12 rounded-full overflow-hidden shadow-lg ring-2 ring-pink-500 hover:ring-pink-700 transition      duration-300"
        title="Instagram"
      >
      <img
        src="/vrtxn.jpg"  // place this image in your /public folder
        alt="Instagram Profile"
        className="object-cover w-full h-full"
      />
      </a>
    </div>
  );
}

export default App;
