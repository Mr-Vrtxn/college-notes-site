// college-notes-site/src/components/FairNotes.jsx
import React, { useEffect, useState } from "react";

const API_KEY = "AIzaSyDfKfLsU9sTuS4ftcRh1Rxk_j4K860vbFs";
const FAIR_NOTES_FOLDER_ID = "1xqNAL783f2is_Gu-4sW1WmzqZxBxqWvn"; // Replace with your actual Fair Notes folder ID

function FairNotes() {
  const [folders, setFolders] = useState([]);
  const [filesByFolder, setFilesByFolder] = useState({});
  const [openFolders, setOpenFolders] = useState({});

  const toggleFolder = (name) => {
    setOpenFolders((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  useEffect(() => {
    fetch(
      `https://www.googleapis.com/drive/v3/files?q='${FAIR_NOTES_FOLDER_ID}'+in+parents+and+mimeType='application/vnd.google-apps.folder'&key=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (!data.files) return;
        setFolders(data.files);

        data.files.forEach((folder) => {
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
  }, []);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4 text-indigo-700">📘 Fair Notes</h2>
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

export default FairNotes;
