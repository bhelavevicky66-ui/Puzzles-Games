import React, { useState, useEffect } from "react";
import Lobby from "../components/Lobby";
import PuzzleRoom from "../components/PuzzleRoom";
import TreasureRoom from "../components/TreasureRoom";
import TicTacToe from "../components/tick tock";

function Game() {
  const [room, setRoom] = useState(1);
  const [time, setTime] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (timerRunning) {
      interval = setInterval(() => setTime((t) => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning]);

  const startPuzzle = () => {
    setRoom(2);
    setTime(0);
    setTimerRunning(true);
  };

  const goToTreasure = () => {
    setRoom(3);
    setTimerRunning(false);
  };

  const startTicTacToe = () => {
    setRoom(4); // ✅ नया room TicTacToe के लिए
  };

  const restartGame = () => {
    setRoom(1);
    setTime(0);
    setTimerRunning(false);
  };

  const exitToLobby = () => {
    setRoom(1); // ✅ Exit दबाते ही वापस Lobby
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 animate-fadeIn">
      {room !== 1 && room !== 4 && (
        <div className="text-2xl font-semibold mb-3">⏳ Time: {time}s</div>
      )}

      {room === 1 && (
        <Lobby onStart={startPuzzle} onStartTicTacToe={startTicTacToe} />
      )}
      {room === 2 && <PuzzleRoom onNext={goToTreasure} />}
      {room === 3 && (
        <TreasureRoom
          time={time}
          restartGame={restartGame}
          stopTimer={() => setTimerRunning(false)}
        />
      )}
      {room === 4 && <TicTacToe onExit={exitToLobby} />} {/* ✅ Exit→Lobby */}
    </div>
  );
}

export default Game;
