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

  const handleRefresh = () => setRefreshKey(prev => prev + 1);

  if (!user)
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-100">
        <Login users={USERS} onLogin={setUser} />
      </div>
    );

  return (
    <div className="min-h-screen bg-white p-4 font-sans">
      <header className="mb-6 px-4 sm:px-6 py-4 bg-white shadow rounded-xl border border-blue-100">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-indigo-700">*Vrtxn's Notes Journal*</h1>
            <p className="text-sm text-gray-600">Hello, {user.username} 👋</p>
          </div>
          <button
            className="sm:hidden text-indigo-600 text-2xl"
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
          className={`px-4 py-2 rounded-md shadow font-medium text-sm sm:text-base transition-all ${tab === "daily" ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-700"}`}
          onClick={() => setTab("daily")}
        >
          📅 Daily Notes
        </button>
        <button
          className={`px-4 py-2 rounded-md shadow font-medium text-sm sm:text-base transition-all ${tab === "fair" ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-700"}`}
          onClick={() => setTab("fair")}
        >
          📘 Fair Notes
        </button>
        <button
          className={`px-4 py-2 rounded-md shadow font-medium text-sm sm:text-base transition-all ${tab === "notices" ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-700"}`}
          onClick={() => setTab("notices")}
        >
          📢 Notices & Time Tables
        </button>
      </div>

      <div className="bg-white rounded-xl shadow p-4 sm:p-6 border border-gray-200">
        {tab === "daily" && <DailyNotes key={refreshKey} sortOrder="desc" />}
        {tab === "fair" && <FairNotes key={refreshKey} />}
        {tab === "notices" && <Notices key={refreshKey} />}
      </div>
    </div>
  );
}

export default App;
