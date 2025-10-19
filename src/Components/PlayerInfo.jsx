import React from 'react';

export default function PlayerInfo({ xPlayer, oPlayer, isXNext, darkMode }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
      <div className={`p-3 sm:p-4 rounded-xl transition-all border-2 ${
        isXNext ? 'ring-2 ring-offset-2' : ''
      }`} style={{
        backgroundColor: darkMode ? '#1e293b' : xPlayer.color + '15',
        borderColor: xPlayer.color,
        ringColor: xPlayer.color
      }}>
        <p className={`text-xs sm:text-sm font-semibold ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Player X</p>
        <p className={`text-base sm:text-lg font-bold truncate ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>{xPlayer.name}</p>
        <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{isXNext ? 'Playing' : 'Waiting'}</p>
      </div>
      <div className={`p-3 sm:p-4 rounded-xl transition-all border-2 ${
        !isXNext ? 'ring-2 ring-offset-2' : ''
      }`} style={{
        backgroundColor: darkMode ? '#1e293b' : oPlayer.color + '15',
        borderColor: oPlayer.color,
        ringColor: oPlayer.color
      }}>
        <p className={`text-xs sm:text-sm font-semibold ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Player O</p>
        <p className={`text-base sm:text-lg font-bold truncate ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>{oPlayer.name}</p>
        <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{!isXNext ? 'Playing' : 'Waiting'}</p>
      </div>
    </div>
  );
}