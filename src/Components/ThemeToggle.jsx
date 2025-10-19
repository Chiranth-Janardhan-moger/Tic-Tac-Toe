import React from 'react';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle({ darkMode, setDarkMode }) {
  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className={`p-2 rounded-lg transition-all ${
        darkMode
          ? 'bg-amber-500 text-gray-900 hover:bg-amber-400'
          : 'bg-slate-700 text-white hover:bg-slate-800'
      }`}
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {darkMode ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}