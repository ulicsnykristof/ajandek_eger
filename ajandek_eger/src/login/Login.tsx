import { SetStateAction, useContext, useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import AuthContext from "./AuthProvider";
import axios from "axios";

function Login() {
  const { setAuth }: any = useContext(AuthContext);

  const userRef = useRef<HTMLDivElement>(null);
  const errRef = useRef<HTMLDivElement>(null);

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const node = userRef.current as any;
    node?.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e: any) => {
    e.preventDefault;

    try {
      //const res = await axios.post(LOGIN_URL, JSON.stringify({user, pwd}));

      setUser("");
      setPwd("");
      setSuccess(true);
    } catch (err) {}
  };

  return (
    <>
      <div className="login-main">
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offsceen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <h1>Bejelentkezés</h1>

        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Felhasználónév:</label>
          <input
            type="text"
            id="username"
            //ref={userRef}
            autoComplete="off"
            onChange={(e: { target: { value: SetStateAction<string> } }) =>
              setUser(e.target.value)
            }
            value={user}
            required
          />

          <label htmlFor="password">Jelszó:</label>
          <input
            type="password"
            id="password"
            onChange={(e: { target: { value: SetStateAction<string> } }) =>
              setPwd(e.target.value)
            }
            value={pwd}
            required
          />

          <Button>Belépés</Button>
        </form>
      </div>
    </>
  );
}

export default Login;
