import React from 'react';

export default function Board({ board, xPlayer, oPlayer, darkMode, winner, isBoardFull, onCellClick, winningLine = null }) {
  return (
    <div className={`mb-6 sm:mb-8 p-3 sm:p-4 rounded-xl relative ${darkMode ? 'bg-slate-700' : 'bg-slate-100'}`}>
      <div className="relative w-full" style={{ paddingBottom: '100%' }}>
        <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-0">
          {board.map((value, index) => (
            <button
              key={index}
              onClick={() => onCellClick(index)}
              className={`transition-all duration-200 font-black text-5xl sm:text-6xl flex items-center justify-center ${
                darkMode ? 'bg-slate-600 hover:bg-slate-500' : 'bg-white hover:bg-slate-50'
              } ${!value && !winner && !isBoardFull ? 'cursor-pointer' : 'cursor-default'} border-2 ${
                darkMode ? 'border-slate-500' : 'border-slate-400'
              }`}
              disabled={board[index] !== null || winner || isBoardFull}
            >
              {value && (
                <span 
                  className="transition-all duration-300 transform hover:scale-110"
                  style={{ 
                    color: value === 'X' ? xPlayer.color : oPlayer.color,
                    textShadow: `0 0 20px ${value === 'X' ? xPlayer.color : oPlayer.color}40`
                  }}
                >
                  {value}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Winning Line Animation */}
        {winningLine && winner && (
          <>
            <style>{`
              @keyframes drawLine {
                from {
                  stroke-dasharray: 1000;
                  stroke-dashoffset: 1000;
                }
                to {
                  stroke-dasharray: 1000;
                  stroke-dashoffset: 0;
                }
              }
              
              @keyframes pulseGlow {
                0%, 100% {
                  filter: drop-shadow(0 0 10px ${winner === 'X' ? xPlayer.color : oPlayer.color});
                }
                50% {
                  filter: drop-shadow(0 0 20px ${winner === 'X' ? xPlayer.color : oPlayer.color});
                }
              }
            `}</style>
            
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center" style={{ zIndex: 10 }}>
              <svg className="absolute w-full h-full">
                <defs>
                  <linearGradient id={`lineGradient-${winner}`} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop 
                      offset="0%" 
                      style={{ 
                        stopColor: winner === 'X' ? xPlayer.color : oPlayer.color, 
                        stopOpacity: 1 
                      }} 
                    />
                    <stop 
                      offset="100%" 
                      style={{ 
                        stopColor: winner === 'X' ? xPlayer.color : oPlayer.color, 
                        stopOpacity: 0.8 
                      }} 
                    />
                  </linearGradient>
                </defs>
                <line
                  x1={`${winningLine.x1}%`}
                  y1={`${winningLine.y1}%`}
                  x2={`${winningLine.x2}%`}
                  y2={`${winningLine.y2}%`}
                  stroke={`url(#lineGradient-${winner})`}
                  strokeWidth="10"
                  strokeLinecap="round"
                  style={{
                    animation: 'drawLine 0.6s ease-out forwards, pulseGlow 2s ease-in-out infinite 0.6s'
                  }}
                />
              </svg>
            </div>
          </>
        )}
      </div>
    </div>
  );
}