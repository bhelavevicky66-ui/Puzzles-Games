import React, { useEffect, useState } from "react";
import { saveScore } from "../Api";
import { useNavigate } from "react-router-dom";
import LobbyBg from "../assets/winner.jpg";

export default function TreasureRoom({ time, restartGame, stopTimer }) {
  const [name, setName] = useState("");
  const [saved, setSaved] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    stopTimer();
  }, [stopTimer]);

  const handleSave = async () => {
    if (!name) return;
    await saveScore(name, time);
    setSaved(true);
  };
  return (
    <div
      className="relative min-h-screen w-[1265px] mt-1 flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${LobbyBg})` }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-8 w-[380px] text-center">
        <h2 className="text-3xl font-extrabold bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-500 bg-clip-text text-transparent mb-4">
          🎉 You Found the Treasure!
        </h2>
        <p className="text-lg text-gray-200 mb-6">
          Completed in <b className="text-yellow-300">{time}s</b> ⏳
        </p>
        <div className="relative w-28 h-28 mx-auto mb-6">
          <div className="absolute inset-0 bg-yellow-400 rounded-xl animate-bounce"></div>
          <div className="absolute inset-2 bg-amber-500 rounded-xl flex items-center justify-center text-4xl">
            💰
          </div>
        </div>
        {!saved ? (
          <div className="flex flex-col gap-3 mb-6 ">
            <input
              className="px-4 py-2 rounded-md text-white font-extrabold bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-500 bg-clip-text text-transparen"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button
              onClick={handleSave}
              className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-lg font-semibold transition"
            >
              Save Score ✅
            </button>
          </div>
        ) : (
          <p className="text-green-300 mb-4">✅ Score saved successfully!</p>
        )}

        <div className="flex justify-center gap-4">
          <button
            onClick={restartGame}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition"
          >
           Play Again
          </button>
          <button
            onClick={() => navigate("/leaderboard")}
            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg transition"
          >
           View Leaderboard
          </button>
        </div>
      </div>
    </div>
  );
}
