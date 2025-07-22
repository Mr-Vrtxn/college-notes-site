// college-notes-site/src/App.jsx
import React, { useState } from "react";
import DailyNotes from "./components/DailyNotes";
import FairNotes from "./components/FairNotes";
import Notices from "./components/Notices";
import SourceCode from "./components/SourceCode";
import Login from "./components/Login";

const USERS = [
  { username: "Vrtxn", password: "12345" },
];

function App() {
  const [user, setUser] = useState(null);
  const [tab, setTab] = useState("daily");
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => setRefreshKey((prev) => prev + 1);

  if (!user)
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-100">
        <Login users={USERS} onLogin={setUser} />
      </div>
    );

  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-100 text-black min-h-screen p-4 font-sans relative transition-all duration-300">
      <header className="mb-6 px-6 py-4 shadow-lg rounded-3xl border bg-white border-blue-200 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between transition-all duration-300">
        <div className="text-center sm:text-left w-full">
          <h1 className="text-lg sm:text-xl md:text-2xl font-extrabold text-indigo-600 tracking-wide">
            ✨ Vrtxn's Notes Journal ✨
          </h1>
        </div>
        <div className="flex flex-wrap gap-3 justify-center sm:justify-end">
          <button
            onClick={handleRefresh}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl shadow-md transition-all"
          >
            🔄 Refresh
          </button>
          <button
            onClick={() => setUser(null)}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl shadow-md transition-all"
          >
            🚪 Logout
          </button>
        </div>
      </header>

      <nav className="mb-6 flex justify-center gap-3 flex-wrap">
        <button
          className={`px-5 py-3 rounded-full text-sm sm:text-base font-semibold shadow-lg transition-all duration-200 border-2 ${
            tab === "daily"
              ? "bg-indigo-600 text-white border-indigo-700"
              : "bg-white text-indigo-600 border-indigo-300 hover:bg-indigo-100"
          }`}
          onClick={() => setTab("daily")}
        >
          📅 Daily Notes
        </button>
        <button
          className={`px-5 py-3 rounded-full text-sm sm:text-base font-semibold shadow-lg transition-all duration-200 border-2 ${
            tab === "fair"
              ? "bg-indigo-600 text-white border-indigo-700"
              : "bg-white text-indigo-600 border-indigo-300 hover:bg-indigo-100"
          }`}
          onClick={() => setTab("fair")}
        >
          📘 Fair Notes
        </button>
        <button
          className={`px-5 py-3 rounded-full text-sm sm:text-base font-semibold shadow-lg transition-all duration-200 border-2 ${
            tab === "notices"
              ? "bg-indigo-600 text-white border-indigo-700"
              : "bg-white text-indigo-600 border-indigo-300 hover:bg-indigo-100"
          }`}
          onClick={() => setTab("notices")}
        >
          📢 Notices & Time Tables
        </button>
        <button
          className={`px-5 py-3 rounded-full text-sm sm:text-base font-semibold shadow-lg transition-all duration-200 border-2 ${
            tab === "source"
              ? "bg-indigo-600 text-white border-indigo-700"
              : "bg-white text-indigo-600 border-indigo-300 hover:bg-indigo-100"
          }`}
          onClick={() => setTab("source")}
        >
          🧠 Source Code & References
        </button>
      </nav>

      <main className="rounded-3xl shadow-xl p-6 border bg-white border-gray-200 transition-all duration-300">
        {tab === "daily" && <DailyNotes key={refreshKey} sortOrder="desc" />}
        {tab === "fair" && <FairNotes key={refreshKey} />}
        {tab === "notices" && <Notices key={refreshKey} />}
        {tab === "source" && <SourceCode key={refreshKey} />}
      </main>

      <a
        href="https://www.instagram.com/mr_vrtxn/"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 bg-white hover:bg-gray-200 border border-gray-300 w-12 h-12 rounded-full flex items-center justify-center shadow-lg overflow-hidden"
        title="Instagram"
      >
        <img
          src="Logo.jpg"
          alt="Instagram"
          className="w-full h-full object-cover rounded-full"
        />
      </a>
    </div>
  );
}

export default App;
