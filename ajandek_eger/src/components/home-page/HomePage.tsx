import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
//import CardGroup from "react-bootstrap/CardGroup";
//import Row from "react-bootstrap/Row";

function HomePage() {
  return (
    <>
      <div
        className="container-fluid"
        style={{
          display: "grid",
          gridTemplateColumns: "auto auto auto",
          marginTop: "30px",
          paddingLeft: "40px",
        }}
      >
        <Card style={{ width: "90%" }}>
          <Card.Img variant="top" src="../src/assets/termekek.jpg" />
          <Card.Body>
            <Card.Title>Termékek</Card.Title>
            <Card.Text>Termék létrehozása, törlése, módosítása.</Card.Text>
            <Button variant="primary">Tovább</Button>
          </Card.Body>
        </Card>

        <Card style={{ width: "90%" }}>
          <Card.Img variant="top" src="../src/assets/adminisztracio.jpg" />
          <Card.Body>
            <Card.Title>Adminisztráció</Card.Title>
            <Card.Text>Termék létrehozása, törlése, módosítása.</Card.Text>
            <Button variant="primary">Tovább</Button>
          </Card.Body>
        </Card>

        <Card style={{ width: "90%" }}>
          <Card.Img variant="top" src="../src/assets/statisztikak.jpg" />
          <Card.Body>
            <Card.Title>Statisztikák</Card.Title>
            <Card.Text>Termék létrehozása, törlése, módosítása.</Card.Text>
            <Button variant="primary">Tovább</Button>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

export default HomePage;
