//import Button from "react-bootstrap/Button";
//import CardGroup from "react-bootstrap/CardGroup";
//import Row from "react-bootstrap/Row";

function HomePage() {
  return (
    <>
      <div className="main-grid">
        <div className="in-div">
          <img
            className="termekek-pics"
            src="../src/assets/termekek.jpg"
            alt=""
          />
          <div className="inner-div">
            <h5>Termékek</h5>
            <p>Termék létrehozása, törlése, módosítása.</p>
            <a className="mybutton" href="/termekek">
              Tovább
            </a>
          </div>
        </div>
        <div className="in-div">
          <img
            className="termekek-pics"
            src="../src/assets/adminisztracio.jpg"
            alt=""
          />
          <div className="inner-div">
            <h5>Adminisztráció</h5>
            <p>Termék bevételezése, kiadása.</p>
            <a className="mybutton" href="/termekek">
              Tovább
            </a>
          </div>
        </div>
        <div className="in-div">
          <img
            className="termekek-pics"
            src="../src/assets/statisztikak.jpg"
            alt=""
          />
          <div className="inner-div">
            <h5>Statisztikák</h5>
            <p>Diagrammok, történések.</p>
            <a className="mybutton" href="/termekek">
              Tovább
            </a>
          </div>
        </div>
        <div className="in-div">
          <img
            className="termekek-pics"
            src="../src/assets/termekek.jpg"
            alt=""
          />
          <div className="inner-div">
            <h5>Aktivitás</h5>
            <p>Változások nyomonkövetése.</p>
            <a className="mybutton" href="/termekek">
              Tovább
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
