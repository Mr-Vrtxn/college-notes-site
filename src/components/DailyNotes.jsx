// college-notes-site/src/components/DailyNotes.jsx
import React, { useEffect, useState } from "react";

const API_KEY = "AIzaSyDfKfLsU9sTuS4ftcRh1Rxk_j4K860vbFs";
const PARENT_FOLDER_ID = "14ikD7JX7xQnrtRxydrZEKdqvpT52vQXT";

function parseDate(str) {
  const [day, month] = str.split("/").map(Number);
  return new Date(2025, month - 1, day);
}

function DailyNotes({ sortOrder: initialSortOrder = "desc" }) {
  const [folders, setFolders] = useState([]);
  const [filesByFolder, setFilesByFolder] = useState({});
  const [sortOrder, setSortOrder] = useState(initialSortOrder);
  const [openFolders, setOpenFolders] = useState({});

  const toggleFolder = (name) => {
    setOpenFolders((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  useEffect(() => {
    fetch(
      `https://www.googleapis.com/drive/v3/files?q='${PARENT_FOLDER_ID}'+in+parents+and+mimeType='application/vnd.google-apps.folder'&key=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        const sortedFolders = [...data.files].sort((a, b) => {
          const dateA = parseDate(a.name);
          const dateB = parseDate(b.name);
          return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
        });
        setFolders(sortedFolders);

        sortedFolders.forEach((folder) => {
          fetch(
            `https://www.googleapis.com/drive/v3/files?q='${folder.id}'+in+parents&key=${API_KEY}`
          )
            .then((res) => res.json())
            .then((filesData) => {
              setFilesByFolder((prev) => ({
                ...prev,
                [folder.name]: filesData.files,
              }));
            });
        });
      });
  }, [sortOrder]);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-indigo-700">📅 Daily Notes</h2>
        <select
          className="border px-2 py-1 rounded text-sm bg-white"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="desc">📉 Newest First</option>
          <option value="asc">📈 Oldest First</option>
        </select>
      </div>
      {folders.map((folder) => (
        <div key={folder.id} className="mb-4">
          <button
            className="w-full text-left font-medium text-blue-600 hover:text-blue-800"
            onClick={() => toggleFolder(folder.name)}
          >
            {openFolders[folder.name] ? "▼" : "▶"} 📁 {folder.name}
          </button>
          {openFolders[folder.name] && (
            <ul className="ml-4 mt-2 space-y-1">
              {(filesByFolder[folder.name] || []).map((file) => (
                <li key={file.id} className="flex justify-between items-center">
                  <span>{file.name}</span>
                  <div className="space-x-2">
                    <a
                      href={`https://drive.google.com/file/d/${file.id}/preview`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-500 underline"
                    >
                      Preview
                    </a>
                    <a
                      href={`https://drive.google.com/uc?id=${file.id}&export=download`}
                      className="text-sm text-green-500 underline"
                    >
                      Download
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}

export default DailyNotes;
