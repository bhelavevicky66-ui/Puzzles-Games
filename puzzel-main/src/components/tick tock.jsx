import React, { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import BgImage from "../assets/tick.webp";
import Bgwinner from "../assets/winner.jpg";

import gameMusicFile from "../assets/match.mp3";
import winMusicFile from "../assets/winner.mp3";
import drawMusicFile from "../assets/drw.mp3";

function TicTacToe({ onExit }) {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [namesLocked, setNamesLocked] = useState(false);

  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [winnerName, setWinnerName] = useState("");

  const [showWinnerPopup, setShowWinnerPopup] = useState(false);

  const gameMusic = useRef(null);
  const winMusic = useRef(null);
  const drawMusic = useRef(null);

  const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const checkWinner = (newBoard) => {
    for (let pattern of winningPatterns) {
      const [a, b, c] = pattern;
      if (
        newBoard[a] &&
        newBoard[a] === newBoard[b] &&
        newBoard[a] === newBoard[c]
      ) {
        return newBoard[a];
      }
    }
    return null;
  };

  const handleClick = (index) => {
    if (board[index] || winner || !namesLocked) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? "❌" : "⭕";
    setBoard(newBoard);

    const win = checkWinner(newBoard);
    if (win) {
      setWinner(win);
      const name = win === "❌" ? player1 : player2;
      setWinnerName(name);
    } else if (!newBoard.includes(null)) {
      setWinner("Draw");
      setWinnerName("🤝 It’s a Draw!");
    } else {
      setIsXNext(!isXNext);
    }
  };

  useEffect(() => {
    if (namesLocked && !winner) {
      gameMusic.current = new Audio(gameMusicFile);
      gameMusic.current.loop = true;
      gameMusic.current.volume = 0.4;
      gameMusic.current.play();
    }

    return () => {
      if (gameMusic.current) {
        gameMusic.current.pause();
        gameMusic.current = null;
      }
    };
  }, [namesLocked, winner]);

  useEffect(() => {
    if (winner) {
      if (gameMusic.current) {
        gameMusic.current.pause();
        gameMusic.current = null;
      }
      if (winner !== "Draw") {
        const duration = 2000;
        const end = Date.now() + duration;
        (function frame() {
          confetti({ particleCount: 6, spread: 70, origin: { y: 0.6 } });
          if (Date.now() < end) requestAnimationFrame(frame);
        })();

        winMusic.current = new Audio(winMusicFile);
        winMusic.current.loop = true;
        winMusic.current.play();
      } else {
        drawMusic.current = new Audio(drawMusicFile);
        drawMusic.current.loop = true;
        drawMusic.current.play();
      }

      setShowWinnerPopup(true);
    }
  }, [winner]);

  const stopWinnerMusic = () => {
    if (winMusic.current) {
      winMusic.current.pause();
      winMusic.current = null;
    }
    if (drawMusic.current) {
      drawMusic.current.pause();
      drawMusic.current = null;
    }
  };

  const resetGame = () => {
    stopWinnerMusic();
    setShowWinnerPopup(false);
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setWinnerName("");
  };

  const startGame = () => {
    if (player1.trim() && player2.trim()) setNamesLocked(true);
  };

  const handleExit = () => {
    stopWinnerMusic();
    if (gameMusic.current) gameMusic.current.pause();
    onExit();
  };

  return (
    <div
      className="relative min-h-screen w-full flex items-center justify-center bg-cover bg-center p-4"
      style={{ backgroundImage: `url(${BgImage})` }}
    >
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-4 sm:p-6 shadow-lg text-center w-full max-w-sm sm:max-w-md">
        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-500 bg-clip-text text-transparent mb-4">
          🎮 Tic Tac Toe
        </h2>

        {/* Name Input */}
        {!namesLocked && (
          <div className="flex flex-col gap-3 mb-4">
            <input
              className="px-3 py-2 rounded-md text-black outline-none text-sm sm:text-base"
              placeholder="Player 1 (❌)"
              value={player1}
              onChange={(e) => setPlayer1(e.target.value)}
            />
            <input
              className="px-3 py-2 rounded-md text-black outline-none text-sm sm:text-base"
              placeholder="Player 2 (⭕)"
              value={player2}
              onChange={(e) => setPlayer2(e.target.value)}
            />
            <button
              onClick={startGame}
              className="mt-2 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-500 px-3 py-2 rounded-md text-black font-bold text-sm sm:text-base"
            >
              Start Game ✅
            </button>
          </div>
        )}

        {/* Game Board */}
        {namesLocked && (
          <>
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {board.map((cell, index) => {
                const flipped = !!cell;
                return (
                  <div
                    key={index}
                    onClick={() => handleClick(index)}
                    className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 perspective cursor-pointer"
                  >
                    <div
                      className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d ${
                        flipped ? "rotate-y-180" : ""
                      }`}
                    >
                      {/* Front Side */}
                      <div
                        className="absolute inset-0 rounded-lg border-2 border-white backface-hidden"
                        style={{
                          backgroundImage: `url(${Bgwinner})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      ></div>

                      {/* Back Side (❌ / ⭕) */}
                      <div className="absolute inset-0 flex items-center justify-center text-2xl sm:text-3xl bg-blue-700 text-white rounded-lg backface-hidden transform rotate-y-180">
                        {cell}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Turn Info */}
            <div className="mt-4 text-base sm:text-lg font-semibold bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-500 bg-clip-text text-transparent">
              {winner
                ? winner === "Draw"
                  ? "🤝 It’s a Draw!"
                  : `🏆 Winner: ${winnerName}`
                : `Turn: ${
                    isXNext ? `${player1} (❌)` : `${player2} (⭕)`
                  }`}
            </div>
          </>
        )}

        {/* Winner Popup */}
        {showWinnerPopup && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm rounded-xl animate-fadeIn p-4">
            <h2 className="text-xl sm:text-2xl font-extrabold text-yellow-400 drop-shadow-lg text-center">
              {winner === "Draw" ? "🤝 It’s a Draw!" : `🏆 ${winnerName} Wins!`}
            </h2>
            <p className="text-white mt-2 text-xs sm:text-sm">
              👇 Choose an option below 👇
            </p>

            <div className="flex flex-wrap justify-center gap-3 mt-4">
              <button
                onClick={resetGame}
                className="px-3 py-2 text-sm sm:text-base bg-yellow-500 hover:bg-yellow-600 text-white rounded-md"
              >
                🔄 Play Again
              </button>
              <button
                onClick={handleExit}
                className="px-3 py-2 text-sm sm:text-base bg-red-500 hover:bg-red-600 text-white rounded-md"
              >
                ⏏ Exit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TicTacToe;
