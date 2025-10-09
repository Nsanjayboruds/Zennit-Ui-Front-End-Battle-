// src/utils/storage.js

// Load journal entries from localStorage
export const loadJournal = () => {
  const data = localStorage.getItem("mindspace_journal");
  return data ? JSON.parse(data) : [];
};

// Save journal entries to localStorage
export const saveJournal = (entries) => {
  localStorage.setItem("mindspace_journal", JSON.stringify(entries));
};
