import { Routes, Route } from "react-router-dom";
import TopNavigationBar from "./navigation-bar/TopNavigationBar";
import HomePage from "./components/home-page/HomePage";
import AdministrationPage from "./components/adminisztracio-page/AdministrationPage";
import TermekekPage from "./components/termekek-page/TermekekPage";
import StatisztikakPage from "./components/statisztikak-page/StatisztikakPage";
import Termek from "./components/termekek-page/termek-page/Termek";
import Login from "./login/Login";
import UserService from "./login/UserService";
import ActivityPage from "./components/aktivitas-page/ActivityPage";

function App() {
  return (
    <>
      <TopNavigationBar />
      <Routes>
        <Route path="/" element={<Login />} />
        {UserService.userOnly() && (
          <>
            <Route path="/home" element={<HomePage />} />
            <Route path="/termekek" element={<TermekekPage />} />
            <Route path="/termekek/termek/*" element={<Termek />} />
            <Route path="/adminisztracio/*" element={<AdministrationPage />} />
            <Route path="/statisztikak/*" element={<StatisztikakPage />} />
            <Route path="/aktivitas/*" element={<ActivityPage />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
