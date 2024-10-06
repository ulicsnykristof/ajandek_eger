import { useEffect, useState } from "react";
import UserService from "../../login/UserService";

function ActivityPage() {
  const [profileInfo, setProfileInfo] = useState({});

  useEffect(() => {
    fetchProfileInfo();
  }, []);

  const fetchProfileInfo = async () => {
    try {
      const token = localStorage.getItem("token"); // Retrieve the token from localStorage
      const response = await UserService.getYourProfile(token);
      setProfileInfo(response);
      console.log(response.user.username);
    } catch (error) {
      console.error("Error fetching profile information:", error);
    }
  };

  return (
    <>
      <p>Name: </p>
    </>
  );
}

export default ActivityPage;
