import React, { useState, useEffect, useRef } from "react";
import GameBg from "../assets/play.jpeg";
import GameMusic from "../assets/game.mp3";

const cardImages = ["🐱", "🐶", "🦊", "🐸", "🦁", "🐼", "🐵", "🐨", "🦄", "🐔"];

function PuzzleRoom({ onNext }) {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(true);
  const musicRef = useRef(null);

  useEffect(() => {
    const shuffled = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((emoji, id) => ({ id, emoji }));
    setCards(shuffled);
  }, []);

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
      if (musicRef.current) {
        musicRef.current.loop = true;
        musicRef.current.play().catch(() => {});
      }
    }
    return () => clearInterval(interval);
  }, [running]);

  const handleFlip = (index) => {
    if (
      flipped.length === 2 ||
      flipped.includes(index) ||
      matched.includes(index)
    )
      return;
    setFlipped((prev) => [...prev, index]);
  };

  useEffect(() => {
    if (flipped.length === 2) {
      const [a, b] = flipped;
      if (cards[a].emoji === cards[b].emoji) {
        setMatched((prev) => [...prev, a, b]);
      }
      setTimeout(() => setFlipped([]), 1000);
    }
  }, [flipped, cards]);

  useEffect(() => {
    if (matched.length === cards.length && cards.length > 0) {
      setRunning(false);
      if (musicRef.current) {
        musicRef.current.pause();
        musicRef.current.currentTime = 0;
      }
      setTimeout(() => onNext(), 1200);
    }
  }, [matched, cards, onNext]);

  return (
    <div
      className="relative min-h-screen w-full flex items-center justify-center bg-cover bg-center p-4"
      style={{ backgroundImage: `url(${GameBg})` }}
    >
      <audio ref={musicRef} src={GameMusic} />
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative w-full max-w-2xl text-center bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-lg p-4 sm:p-5">
        {/* Timer */}
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-black/40 text-white px-2 py-1 rounded-md text-xs sm:text-sm">
          ⏳ {time}s
        </div>

        {/* Heading */}
        <h2 className="text-lg sm:text-xl md:text-2xl font-extrabold bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-500 bg-clip-text text-transparent">
          Match All Cards!
        </h2>

        {/* Card Grid */}
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 sm:gap-3 justify-center mt-5">
          {cards.map((card, index) => {
            const isFlipped =
              flipped.includes(index) || matched.includes(index);
            return (
              <div
                key={index}
                className="relative w-14 h-18 sm:w-16 sm:h-20 md:w-18 md:h-24 perspective cursor-pointer"
                onClick={() => handleFlip(index)}
              >
                <div
                  className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d ${
                    isFlipped ? "rotate-y-180" : ""
                  }`}
                >
                  {/* Front Side */}
                  <div className="absolute inset-0 flex items-center justify-center text-xl sm:text-2xl bg-blue-600 border border-white rounded-lg backface-hidden">
                    🏰
                  </div>
                  {/* Back Side */}
                  <div className="absolute inset-0 flex items-center justify-center text-xl sm:text-2xl bg-yellow-400 text-black rounded-lg backface-hidden transform rotate-y-180">
                    {card.emoji}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Info Text */}
        <p className="mt-4 text-gray-200 text-xs sm:text-sm">
          Match all pairs to unlock the{" "}
          <span className="text-yellow-300 font-bold">Treasure Room</span>!
        </p>
      </div>
    </div>
  );
}
export default PuzzleRoom;
