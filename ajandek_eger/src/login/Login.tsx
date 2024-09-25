import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "./UserService";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  //const [success, setSuccess] = useState(false);

  const [error, setError] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault;
    navigate("/home");
    try {
      const response = await UserService.login(username, pwd);
      console.log(response);

      if (response.token) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("role", response.role);
        console.log(response.role);
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

  /*
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
*/
  return (
    <>
      <div className="login-main">
        <div>
          <p className={errMsg ? "errmsg" : "offsceen"} aria-live="assertive">
            {errMsg}
          </p>
        </div>
        <div className="login-form">
          <h4>Bejelentkezés</h4>
          <br />
          <form onSubmit={handleSubmit}>
            <div>
              <div>
                <label htmlFor="username">Felhasználónév:</label>
              </div>

              <input
                className="login-input"
                id="username"
                placeholder="Felhasználónév"
                type="text"
                autoComplete="off"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
            </div>
            <div>
              <div>
                <label htmlFor="pwd">Jelszó:</label>
              </div>
              <div>
                <input
                  className="login-input"
                  id="pwd"
                  placeholder="Jelszó"
                  type="password"
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd}
                />
              </div>
            </div>
            <div>
              <button className="login-button" type="submit">
                Belépés
              </button>
            </div>
          </form>
          <div>
            <p>
              Nincs még felhasználói fiókja? <a href="/signup">Létrehozás</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
