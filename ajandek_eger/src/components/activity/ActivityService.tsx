import axios from "axios";

class ActivityService {
  static BASE_URL = "http://localhost:8080";

  static async addActivity(activity: String) {
    let dateTime = new Date();
    let date = dateTime.toLocaleString();
    let username = localStorage.getItem("username");
    console.log(date);
    try {
      const response = await axios.post(
        `${ActivityService.BASE_URL}/public/activity/addActivity`,
        {
          username,
          activity,
          date,
        }
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }
}

export default ActivityService;
