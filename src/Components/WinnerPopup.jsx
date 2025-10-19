import React from 'react';

export default function WinnerPopup({ show, winner, xPlayer, oPlayer, darkMode, onReset, onGoBack }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60 p-4" style={{ animation: 'fadeIn 0.3s ease-out' }}>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes popIn {
          0% { transform: scale(0) rotate(-15deg); opacity: 0; }
          50% { transform: scale(1.15) rotate(5deg); }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
      `}</style>
      <div className={`rounded-3xl shadow-2xl p-8 sm:p-10 max-w-md w-full text-center ${
        darkMode ? 'bg-slate-800' : 'bg-white'
      }`} style={{ animation: 'popIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
        {winner ? (
          <>
            <div className="text-6xl sm:text-8xl mb-4 sm:mb-6">🏆</div>
            <h2 className={`text-3xl sm:text-4xl font-bold mb-2 sm:mb-3 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              VICTORY!
            </h2>
            <p className="text-2xl sm:text-3xl font-black mb-3 sm:mb-4 truncate" style={{color: winner === 'X' ? xPlayer.color : oPlayer.color}}>
              {winner === 'X' ? xPlayer.name : oPlayer.name}
            </p>
            <p className={`text-base sm:text-lg mb-6 sm:mb-8 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              has conquered the board!
            </p>
          </>
        ) : (
          <>
            <div className="text-6xl sm:text-8xl mb-4 sm:mb-6">🤝</div>
            <h2 className={`text-3xl sm:text-4xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              DRAW!
            </h2>
            <p className={`text-base sm:text-lg mb-6 sm:mb-8 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              An evenly matched battle!
            </p>
          </>
        )}
        
        <div className="space-y-3">
          <button
            onClick={onReset}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-2.5 sm:py-3 rounded-lg transition-all transform hover:scale-105 text-sm sm:text-base"
          >
            Play Again
          </button>
          <button
            onClick={onGoBack}
            className="w-full bg-slate-600 hover:bg-slate-700 text-white font-bold py-2.5 sm:py-3 rounded-lg transition-all transform hover:scale-105 text-sm sm:text-base"
          >
            Back to Setup
          </button>
        </div>
      </div>
    </div>
  );
}