import axios from "axios";

class UserService {
  static BASE_URL = "http://localhost:8080";

  static async login(username: any, pwd: any) {
    try {
      const response = await axios.post(`${UserService.BASE_URL}/auth/login`, {
        username,
        pwd,
      });
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  /**AUTHENTICATION CHECKER */
  static logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  }

  static isAuthenticated() {
    const token = localStorage.getItem("token");
    return !!token;
  }

  static isAdmin() {
    const role = localStorage.getItem("role");
    return role === "ADMIN";
  }

  static isUser() {
    const role = localStorage.getItem("role");
    return role === "USER";
  }

  static adminOnly() {
    return this.isAuthenticated() && this.isAdmin();
  }

  static userOnly() {
    return this.isAuthenticated() && this.isUser();
  }
}

export default UserService;
