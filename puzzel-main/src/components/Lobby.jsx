import React from "react";
import GameBg from "../assets/image.png";
import Machhing from "../assets/puzz.webp";
import Tick from "../assets/taa.jpg";

function Lobby({ onStart, onStartTicTacToe }) {
  return (
    <div
      className="relative min-h-screen w-full flex items-center justify-center bg-cover bg-center px-4   p-4 mt-10"
      style={{
        backgroundImage: `url(${GameBg})`,
      }}
    >
      <div className="absolute inset-0 bg-black/0"></div>
      <div className="relative z-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="w-full max-w-xs rounded-xl overflow-hidden bg-white/5 backdrop-blur-md shadow-lg border border-white/20 flex flex-col justify-between">
          <img
            src={Machhing}
            alt="Puzzle Match"
            className="w-full h-48 object-cover"
          />
          <div className="p-4 text-center">
            <h2 className="text-lg sm:text-xl font-extrabold bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-500 bg-clip-text text-transparent">
              Puzzle Match
            </h2>
            <p className="text-xs sm:text-sm mt-2 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-500 bg-clip-text text-transparent">
              Match all cards to start your adventure!
            </p>
            <button
              className="relative mt-4 w-full p-[3px] rounded-lg overflow-hidden group"
              onClick={onStart}
            >
              
              <span className="absolute inset-0 bg-[length:300%_300%] bg-gradient-to-r from-green-400 via-yellow-400 via-pink-500 via-purple-500 to-blue-400 animate-borderMove"></span>

              
              <span className="relative block text-white text-center font-bold py-2 rounded-md transition">
                Start Game
              </span>
            </button>
          </div>
        </div>

        <div className="w-full max-w-xs rounded-xl overflow-hidden bg-white/5 backdrop-blur-md shadow-lg border border-white/20 flex flex-col justify-between">
          <img
            src={Tick}
            alt="Tic tac toe"
            className="w-full h-48 object-cover"
          />
          <div className="p-4 text-center">
            <h2 className="text-lg sm:text-xl font-extrabold bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-500 bg-clip-text text-transparent">
              Tic Tac Toe
            </h2>
            <p className="text-xs sm:text-sm mt-2 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-500 bg-clip-text text-transparent">
              Play with your friend!
            </p>
            <button
              className="relative mt-4 w-full p-[3px] rounded-lg overflow-hidden group"
              onClick={onStartTicTacToe}
            >
              
              <span className="absolute inset-0 bg-[length:300%_300%] bg-gradient-to-r from-green-400 via-yellow-400 via-pink-500 via-purple-500 to-blue-400 animate-borderMove"></span>

              
              <span className="relative block text-white text-center font-bold py-2 rounded-md transition">
                Start Game
              </span>
            </button>
          </div>
        </div>
        <div className="w-full max-w-xs rounded-xl p-6 bg-white/5 shadow-lg border border-white/20 flex flex-col justify-center text-center">
          <h2 className="text-lg sm:text-xl font-extrabold bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-500 bg-clip-text text-transparent">
            Coming Soon
          </h2>
          <p className="text-xs sm:text-sm font-extrabold bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-500 bg-clip-text text-transparent mt-2">
            The most dangerous game
          </p>
          <button className="mt-4 w-full px-4 py-2 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-500 text-black font-bold rounded-lg cursor-not-allowed">
            Locked
          </button>
        </div>
      </div>
    </div>
  );
}

export default Lobby;
