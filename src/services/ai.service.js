import axios from "axios";

// const AI_API_URL = "http://localhost:8000/ai";

const BASE_URL = process.env.REACT_APP_AI_BASE_URL;

console.log("AI BASE URL:", BASE_URL);

const AI_API_URL = `${BASE_URL}/ai`;
class AIService {
  analyzeLocation(latitude, longitude) {
    return axios.post(`${AI_API_URL}/analyze`, {
      latitude,
      longitude,
    });
  }
}

export default new AIService();
