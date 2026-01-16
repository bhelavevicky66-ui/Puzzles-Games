import axios from "axios";

// ✅ Render backend live URL
const API_URL = "https://puzzle-backend-l83l.onrender.com/api";

export async function saveScore(name, time) {
  await axios.post(`${API_URL}/players`, { name, time });
}

export async function getLeaderboard() {
  const res = await axios.get(`${API_URL}/leaderboard`);
  return res.data;
}
