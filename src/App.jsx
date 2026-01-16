
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Game from "./page/game";
import Leaderboard from "./page/Leaderboad";
import "./index.css";
export default function App() {
  return (
    
        <Routes>
          <Route path="/" element={<Game />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
   
  );
}
