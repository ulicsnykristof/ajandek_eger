import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "./UserService";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  //const [success, setSuccess] = useState(false);

  /*const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const userData = await UserService.login(email, password)
        console.log(userData)
        if (userData.token) {
            localStorage.setItem('token', userData.token)
            localStorage.setItem('role', userData.role)
            navigate('/profile')
        }else{
            setError(userData.message)
        }
        
    } catch (error) {
        console.log(error)
        setError(error.message)
        setTimeout(()=>{
            setError('');
        }, 5000);
    }
}
*/

  const [error, setError] = useState("");

  /*
  const handleSubmit = async (e: any) => {
    console.log("teszt");
    e.preventDefault;
    try {
      const response = await UserService.login(username, pwd);
      console.log(response);
      if (response.token) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("role", response.role);
        navigate("/home");
      } else {
        setError(response.message);
      }
    } catch (error: unknown) {
      console.log(error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };
*/

  const handleSubmit = async () => {
    try {
      navigate("/home");
      if (!username || !pwd) {
        setError("Please enter both username and password.");
        return;
      }

      const response = await axios.post("http://localhost:8080/auth/login", {
        username,
        pwd,
      });

      console.log("Login successful:", response.data);
    } catch (error) {
      setError("Invalid username or password.");
    }
  };

  return (
    <>
      <div className="login-main">
        <p className={errMsg ? "errmsg" : "offsceen"} aria-live="assertive">
          {errMsg}
        </p>
        <h1>Bejelentkezés</h1>

        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Felhasználónév:</label>
          <input
            type="text"
            autoComplete="off"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />

          <label htmlFor="pwd">Jelszó:</label>
          <input
            type="password"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
          />

          <button type="submit">Belépés</button>
        </form>
        <p>
          Nincs még felhasználói fiókja? <a href="/signup">Létrehozás</a>
        </p>
      </div>
    </>
  );
}

export default Login;
