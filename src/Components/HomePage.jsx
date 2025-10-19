import React, { useState } from 'react';
import ThemeToggle from './ThemeToggle';

export default function HomePage({ darkMode, setDarkMode, onStartGame }) {
  const [gameMode, setGameMode] = useState('two-player');
  const [xPlayer, setXPlayer] = useState({ name: '', color: '#2563eb' });
  const [oPlayer, setOPlayer] = useState({ name: '', color: '#16a34a' });

  const handleStartGame = () => {
    if (gameMode === 'two-player') {
      if (xPlayer.name.trim() && oPlayer.name.trim()) {
        onStartGame({ mode: 'two-player', xPlayer, oPlayer });
      }
    } else {
      if (xPlayer.name.trim()) {
        onStartGame({ mode: 'computer', xPlayer, oPlayer: { name: 'Computer', color: '#16a34a' } });
      }
    }
  };

  const canStart = gameMode === 'computer' ? xPlayer.name.trim() : xPlayer.name.trim() && oPlayer.name.trim();

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900' 
        : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
    }`}>
      {/* Floating Theme Toggle */}
      <div className="fixed top-8 right-8 z-50">
        <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
      </div>

      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-4xl">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className={`text-5xl sm:text-7xl font-black mb-4 tracking-tight ${
              darkMode 
                ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400' 
                : 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600'
            }`}>
              Tic Tac Toe
            </h1>
            <p className={`text-sm sm:text-base font-medium tracking-wide ${
              darkMode ? 'text-slate-400' : 'text-slate-600'
            }`}>
              Choose your mode and customize your experience
            </p>
          </div>

          {/* Main Content */}
          <div className={`backdrop-blur-xl rounded-3xl p-8 sm:p-12 transition-all duration-300 ${
            darkMode 
              ? 'bg-slate-800/50 border border-slate-700/50 shadow-2xl' 
              : 'bg-white/70 border border-white/20 shadow-xl'
          }`}>
            
            {/* Game Mode Selection */}
            <div className="mb-10">
              <label className={`block text-sm font-semibold mb-4 uppercase tracking-wider ${
                darkMode ? 'text-slate-300' : 'text-slate-700'
              }`}>
                Game Mode
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={() => setGameMode('two-player')}
                  className={`group relative overflow-hidden p-6 rounded-2xl font-semibold transition-all duration-300 ${
                    gameMode === 'two-player'
                      ? darkMode
                        ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/50'
                        : 'bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/30'
                      : darkMode 
                        ? 'bg-slate-700/50 text-slate-300 hover:bg-slate-700 border border-slate-600' 
                        : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                  }`}
                >
                  <div className="relative z-10">
                    <div className="text-lg font-bold mb-1">Two Player</div>
                    <div className={`text-xs ${gameMode === 'two-player' ? 'text-blue-100' : darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                      Play with a friend
                    </div>
                  </div>
                </button>
                <button
                  onClick={() => setGameMode('computer')}
                  className={`group relative overflow-hidden p-6 rounded-2xl font-semibold transition-all duration-300 ${
                    gameMode === 'computer'
                      ? darkMode
                        ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg shadow-purple-500/50'
                        : 'bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg shadow-purple-500/30'
                      : darkMode 
                        ? 'bg-slate-700/50 text-slate-300 hover:bg-slate-700 border border-slate-600' 
                        : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                  }`}
                >
                  <div className="relative z-10">
                    <div className="text-lg font-bold mb-1">Computer</div>
                    <div className={`text-xs ${gameMode === 'computer' ? 'text-purple-100' : darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                      Challenge the AI
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Players Section */}
            <div className="space-y-6">
              {/* Player X */}
              <div className={`p-6 rounded-2xl transition-all duration-300 ${
                darkMode 
                  ? 'bg-slate-700/30 border border-slate-600/50' 
                  : 'bg-slate-50/50 border border-slate-200/50'
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`text-lg font-bold ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                    Player X
                  </h3>
                  <div 
                    className="w-8 h-8 rounded-full transition-all duration-300 ring-2 ring-offset-2"
                    style={{ 
                      backgroundColor: xPlayer.color,
                      ringColor: xPlayer.color,
                      ringOffsetColor: darkMode ? '#334155' : '#ffffff'
                    }}
                  />
                </div>
                <input
                  type="text"
                  placeholder="Enter name"
                  value={xPlayer.name}
                  onChange={(e) => setXPlayer({ ...xPlayer, name: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl mb-4 font-medium transition-all duration-300 ${
                    darkMode 
                      ? 'bg-slate-800 text-white border border-slate-600 focus:border-blue-500 placeholder-slate-500' 
                      : 'bg-white text-slate-800 border border-slate-300 focus:border-blue-500 placeholder-slate-400'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                />
                <div className="flex gap-3 flex-wrap">
                  {['#2563eb', '#dc2626', '#7c3aed', '#0891b2', '#ea580c', '#ec4899'].map(color => (
                    <button
                      key={color}
                      onClick={() => setXPlayer({ ...xPlayer, color })}
                      className={`w-10 h-10 rounded-full transition-all duration-300 hover:scale-110 ${
                        xPlayer.color === color ? 'ring-4 ring-offset-2' : 'ring-2 ring-transparent hover:ring-slate-400'
                      }`}
                      style={{ 
                        backgroundColor: color,
                        ringColor: xPlayer.color === color ? color : undefined,
                        ringOffsetColor: darkMode ? '#334155' : '#ffffff'
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Player O - Only for two-player mode */}
              {gameMode === 'two-player' && (
                <div className={`p-6 rounded-2xl transition-all duration-300 ${
                  darkMode 
                    ? 'bg-slate-700/30 border border-slate-600/50' 
                    : 'bg-slate-50/50 border border-slate-200/50'
                }`}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className={`text-lg font-bold ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                      Player O
                    </h3>
                    <div 
                      className="w-8 h-8 rounded-full transition-all duration-300 ring-2 ring-offset-2"
                      style={{ 
                        backgroundColor: oPlayer.color,
                        ringColor: oPlayer.color,
                        ringOffsetColor: darkMode ? '#334155' : '#ffffff'
                      }}
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Enter name"
                    value={oPlayer.name}
                    onChange={(e) => setOPlayer({ ...oPlayer, name: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl mb-4 font-medium transition-all duration-300 ${
                      darkMode 
                        ? 'bg-slate-800 text-white border border-slate-600 focus:border-purple-500 placeholder-slate-500' 
                        : 'bg-white text-slate-800 border border-slate-300 focus:border-purple-500 placeholder-slate-400'
                    } focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
                  />
                  <div className="flex gap-3 flex-wrap">
                    {['#16a34a', '#4f46e5', '#b91c1c', '#0891b2', '#f59e0b', '#8b5cf6'].map(color => (
                      <button
                        key={color}
                        onClick={() => setOPlayer({ ...oPlayer, color })}
                        className={`w-10 h-10 rounded-full transition-all duration-300 hover:scale-110 ${
                          oPlayer.color === color ? 'ring-4 ring-offset-2' : 'ring-2 ring-transparent hover:ring-slate-400'
                        }`}
                        style={{ 
                          backgroundColor: color,
                          ringColor: oPlayer.color === color ? color : undefined,
                          ringOffsetColor: darkMode ? '#334155' : '#ffffff'
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Start Button */}
            <button
              onClick={handleStartGame}
              disabled={!canStart}
              className={`w-full mt-8 py-4 px-8 rounded-2xl font-bold text-lg transition-all duration-300 ${
                canStart
                  ? darkMode
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transform hover:scale-[1.02]'
                    : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transform hover:scale-[1.02]'
                  : darkMode
                    ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              Start Game
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}