import axios from "axios";

const AI_API_URL = "http://localhost:8000/ai";

class AIService {
  analyzeLocation(latitude, longitude) {
    return axios.post(`${AI_API_URL}/analyze`, {
      latitude,
      longitude,
    });
  }
}

export default new AIService();
