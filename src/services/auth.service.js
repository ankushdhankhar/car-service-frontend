import axios from "axios";

const API_URL = "http://localhost:8080/auth/";

class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + "signin", { email, password })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password) {
    return axios.post(API_URL + "customer/signup", {
      name: username,
      email,
      password,
    });
  }
}

const authService = new AuthService();
export default authService;
