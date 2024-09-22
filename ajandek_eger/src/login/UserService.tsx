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
}

export default UserService;
