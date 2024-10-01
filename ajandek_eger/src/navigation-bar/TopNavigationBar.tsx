//import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import UserService from "../login/UserService";
import { useState } from "react";
import ConfirmationModal from "../components/confirmation-modal/ConfirmationModal";
import { useNavigate } from "react-router-dom";

function TopNavigationBar() {
  const navigate = useNavigate();

  // Confirmation modal setup
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleFormSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setShow(true);
  };

  const handleLogout = () => {
    UserService.logout();
    setShow(false);
    navigate("/");
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
              {UserService.isAuthenticated() && (
                <Nav.Link onClick={handleFormSubmit} href="/">
                  Kijelentkezés
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <ConfirmationModal
        show={show}
        handleClose={handleClose}
        onSubmit={handleLogout}
        moadlTitle="Kijelejntkezés"
        moadlBody="Biztosan kijelentkezik?"
        moadlCancel="Mégse"
        moadlConfirm="Kijelentkezés"
      />
    </>
  );
}

export default TopNavigationBar;
