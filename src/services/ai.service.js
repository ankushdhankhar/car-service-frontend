import axios from "axios";

// const AI_API_URL = "http://localhost:8000/ai";

const BASE_URL = process.env.REACT_APP_AI_BASE_URL;

// console.log("AI BASE URL:", BASE_URL);

const AI_API_URL = `${BASE_URL}/ai`;
class AIService {
  analyzeLocation(latitude, longitude, message = null) {
    return axios.post(
      `${AI_API_URL}/analyze`,
      { latitude, longitude, message },
      { timeout: 30000 },
    );
  }
}

const aiService = new AIService();
export default aiService;
