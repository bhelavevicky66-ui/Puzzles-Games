import React, { useEffect, useState } from "react";
import { getLeaderboard } from "../Api";
import BgImage from "../assets/winner.jpg";

export default function Leaderboard() {
  const [players, setPlayers] = useState([]);
  const [myName, setMyName] = useState("");

  useEffect(() => {
    async function fetchData() {
      const data = await getLeaderboard();
      setPlayers(data);
      const savedName = localStorage.getItem("lastPlayer");
      if (savedName) setMyName(savedName);
    }
    fetchData();
  }, []);

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${BgImage})` }}
    >
      <div className="absolute inset-0 "></div>

      <div className="relative z-10 p-6 w-full max-w-lg">
        <h2 className="text-4xl font-extrabold bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-500 bg-clip-text text-transparent tracking-wide group-hover:brightness-125 transition mb-6 ml-25">
          Leaderboard
        </h2>

        <div className="bg-white/20 backdrop-blur-md rounded-lg shadow-xl p-4">
          {players.length === 0 ? (
            <p className="text-center text-gray-200">No scores yet...</p>
          ) : (
            <table className="w-full text-center text-white">
              <thead>
                <tr className="border-b font-extrabold bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-500 bg-clip-text text-transparent tracking-wide group-hover:brightness-125 transition">
                  <th className="p-2 ">Rank</th>
                  <th className="p-2">Name</th>
                  <th className="p-2">Time (s)</th>
                </tr>
              </thead>
              <tbody>
                {players.map((p, idx) => {
                  const isMe = p.name === myName;
                  return (
                    <tr
                      key={p._id}
                      className={`hover:bg-white/10 ${
                        isMe ? "bg-yellow-400 text-black font-bold" : ""
                      }`}
                    >
                      <td className="p-2 font-extrabold bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-500 bg-clip-text text-transparent tracking-wide group-hover:brightness-125 transition">
                        {idx + 1}
                      </td>
                      <td className="p-2 font-extrabold bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-500 bg-clip-text text-transparent tracking-wide group-hover:brightness-125 transition">
                        {p.name}
                      </td>
                      <td className="p-2 font-extrabold bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-500 bg-clip-text text-transparent tracking-wide group-hover:brightness-125 transition">
                        {p.time}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        <h2 className="text-4xl font-extrabold bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-500 bg-clip-text text-transparent tracking-wide group-hover:brightness-125 transition mb-6 ml-5">
           After 7 days Removed
          </h2>
      </div>
    </div>
  );
}
