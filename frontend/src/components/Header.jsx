import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { Authcontext } from "./Usercontext";

const Header = () => {
  let auth = localStorage.getItem("auth");
  const { userauth, setUserAuth } = useContext(Authcontext);
  if (auth) {
    setUserAuth(true);
  } else {
  }

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>Navbar</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link>
            <Link to="/">Home</Link>
          </Nav.Link>
          <Nav.Link>
            {auth && userauth ? (
              <div className="d-flex align-items-center">
                <li className="me-3">
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <Link to="/logout">Logout</Link>
                </li>
              </div>
            ) : (
              <div className="d-flex align-items-center">
                <li className="me-3">
                  <Link to="/register">Register</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
              </div>
            )}
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
