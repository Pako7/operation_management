import axios from "axios";
import UserService from "./UserService";

const API_URL = "http://localhost:3000/api/v1/";

class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + "login", {
        email,
        password
      })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user_id', response.data.user_id);
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
  }

  getCurrentUser(assignCurrentUser) {
    const userId = localStorage.getItem('user_id');
    if (!userId) { return null; }
    
    UserService.get(userId).then(
      response => {
        assignCurrentUser(response.data.user);
      },
      error => {
        /*
        setContent({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
        */
      }
    );
  }
}

export default new AuthService();