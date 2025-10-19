import React, { useState } from 'react';
import HomePage from './Components/HomePage';
import GameBoard from './Components/GameBoard';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameConfig, setGameConfig] = useState(null);

  const handleStartGame = (config) => {
    setGameConfig(config);
    setGameStarted(true);
  };

  const handleGoBack = () => {
    setGameStarted(false);
    setGameConfig(null);
  };

  return (
    <>
      {!gameStarted ? (
        <HomePage 
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          onStartGame={handleStartGame}
        />
      ) : (
        <GameBoard
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          gameConfig={gameConfig}
          onGoBack={handleGoBack}
        />
      )}
    </>
  );
}