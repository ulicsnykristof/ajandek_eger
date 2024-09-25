//import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import UserService from "../login/UserService";

function TopNavigationBar() {
  const handleLogout = () => {
    UserService.logout();
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/home">Ajándék Eger</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/termekek">Termékek</Nav.Link>
              <Nav.Link href="/adminisztracio">Adminisztráció</Nav.Link>
              <Nav.Link href="/statisztikak">Statisztikák</Nav.Link>
              <Nav.Link href="/statisztikak">Aktivitás</Nav.Link>
              <Nav.Link onClick={handleLogout} href="/">
                Kijelentkezés
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default TopNavigationBar;
