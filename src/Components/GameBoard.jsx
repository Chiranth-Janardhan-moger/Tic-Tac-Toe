import React, { useState, useEffect } from 'react';
import WinnerPopup from './WinnerPopup';
import Board from './Board';
import PlayerInfo from './PlayerInfo';

export default function GameBoard({ darkMode, gameConfig, onGoBack }) {
  const { mode, xPlayer, oPlayer } = gameConfig;
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [history, setHistory] = useState([]);
  const [showWinnerPopup, setShowWinnerPopup] = useState(false);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const winner = calculateWinner(board);
  const isBoardFull = board.every(square => square !== null);
  const currentPlayer = isXNext ? 'X' : 'O';

  useEffect(() => {
    if (winner || isBoardFull) {
      setShowWinnerPopup(true);
    }
  }, [winner, isBoardFull]);

  // Computer AI Logic
  const makeComputerMove = (currentBoard) => {
    const availablePositions = currentBoard
      .map((val, idx) => val === null ? idx : null)
      .filter(val => val !== null);

    if (availablePositions.length === 0) return;

    const aiMove = findBestMove(currentBoard, availablePositions);
    
    setTimeout(() => {
      const newBoard = [...currentBoard];
      newBoard[aiMove] = 'O';
      setBoard(newBoard);
      setHistory(prev => [...prev, { board: newBoard, player: 'O', move: aiMove }]);
      setIsXNext(true);
    }, 500);
  };

  const findBestMove = (squares, available) => {
    // Check if computer can win
    for (let pos of available) {
      const testBoard = [...squares];
      testBoard[pos] = 'O';
      if (calculateWinner(testBoard) === 'O') return pos;
    }

    // Check if need to block player
    for (let pos of available) {
      const testBoard = [...squares];
      testBoard[pos] = 'X';
      if (calculateWinner(testBoard) === 'X') return pos;
    }

    // Take center if available
    if (available.includes(4)) return 4;

    // Take corner
    const corners = [0, 2, 6, 8].filter(pos => available.includes(pos));
    if (corners.length > 0) return corners[Math.floor(Math.random() * corners.length)];

    // Random move
    return available[Math.floor(Math.random() * available.length)];
  };

  useEffect(() => {
    if (mode === 'computer' && !isXNext && !winner && !isBoardFull) {
      makeComputerMove(board);
    }
  });

  const handleClick = (index) => {
    if (board[index] || winner || isBoardFull) return;
    if (mode === 'computer' && !isXNext) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    setHistory([...history, { board: newBoard, player: currentPlayer, move: index }]);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setHistory([]);
    setShowWinnerPopup(false);
  };

  const undoMove = () => {
    if (history.length === 0) return;
    
    const movesToUndo = mode === 'computer' ? 2 : 1;
    const newHistory = history.slice(0, -movesToUndo);
    
    if (newHistory.length === 0) {
      resetGame();
    } else {
      setBoard(newHistory[newHistory.length - 1].board);
      setIsXNext(newHistory.length % 2 === 0);
      setHistory(newHistory);
    }
    setShowWinnerPopup(false);
  };

  const getStatus = () => {
    if (winner) {
      return `${winner === 'X' ? xPlayer.name : oPlayer.name} Wins!`;
    }
    if (isBoardFull) {
      return "It's a Draw!";
    }
    return `${isXNext ? xPlayer.name : oPlayer.name}'s Turn`;
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode 
        ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' 
        : 'bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100'
    }`}>
      <WinnerPopup
        show={showWinnerPopup}
        winner={winner}
        xPlayer={xPlayer}
        oPlayer={oPlayer}
        darkMode={darkMode}
        onReset={resetGame}
        onGoBack={onGoBack}
      />

      {/* Top Bar */}
      <div className={`flex justify-between items-center p-4 sm:p-6 relative overflow-hidden ${darkMode ? 'bg-slate-800 shadow-lg' : 'bg-white shadow-md'}`}>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10"></div>
        <button
          onClick={onGoBack}
          className={`px-3 py-2 sm:px-4 sm:py-2 rounded-lg font-semibold transition-all z-10 text-sm sm:text-base ${
            darkMode
              ? 'bg-slate-700 text-slate-200 hover:bg-slate-600'
              : 'bg-slate-200 text-slate-800 hover:bg-slate-300'
          }`}
        >
          Back
        </button>
        <h1 className={`text-2xl sm:text-4xl font-black z-10 text-center  ${
          darkMode ? 'text-slate-100' : 'text-slate-800'
        }`}>
          Tic Tac Toe
        </h1>
       
      </div>

      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4 py-6 sm:py-8">
        <div className={`rounded-2xl shadow-2xl p-4 sm:p-8 max-w-2xl w-full transition-colors duration-300 ${
          darkMode ? 'bg-slate-800' : 'bg-white'
        }`}>
          <PlayerInfo
            xPlayer={xPlayer}
            oPlayer={oPlayer}
            isXNext={isXNext}
            darkMode={darkMode}
          />

          {/* Status */}
          <div className={`text-lg sm:text-2xl font-bold text-center mb-6 sm:mb-8 px-3 sm:px-4 py-3 sm:py-4 rounded-xl transition-all ${
            winner ? (darkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800') : 
            isBoardFull ? (darkMode ? 'bg-amber-900 text-amber-300' : 'bg-amber-100 text-amber-800') : 
            darkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-800'
          }`}>
            {getStatus()}
          </div>

          <Board
            board={board}
            xPlayer={xPlayer}
            oPlayer={oPlayer}
            darkMode={darkMode}
            winner={winner}
            isBoardFull={isBoardFull}
            onCellClick={handleClick}
          />

          {/* Buttons */}
          <div className="space-y-3">
            <button
              onClick={resetGame}
              className="w-full bg-slate-700 hover:bg-slate-800 text-white font-bold py-2.5 sm:py-3 rounded-lg transition-all transform hover:scale-105 shadow-lg text-sm sm:text-base"
            >
              New Game
            </button>
            <button
              onClick={undoMove}
              disabled={history.length === 0}
              className={`w-full font-bold py-2.5 sm:py-3 rounded-lg transition-all text-sm sm:text-base ${
                history.length === 0
                  ? darkMode ? 'bg-slate-600 text-slate-500 cursor-not-allowed' : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white transform hover:scale-105 shadow-lg'
              }`}
            >
              Undo Move
            </button>
          </div>

          {/* Move History */}
          {history.length > 0 && (
            <div className={`mt-4 sm:mt-6 pt-4 sm:pt-6 border-t ${darkMode ? 'border-slate-700' : 'border-slate-300'}`}>
              <p className={`text-xs font-semibold mb-2 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Move History ({history.length}):
              </p>
              <div className="flex flex-wrap gap-2">
                {history.map((move, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 rounded text-xs font-medium text-white"
                    style={{backgroundColor: move.player === 'X' ? xPlayer.color : oPlayer.color}}
                  >
                    {move.player}: {move.move + 1}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}