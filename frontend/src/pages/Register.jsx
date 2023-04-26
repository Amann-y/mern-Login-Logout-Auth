import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [show, setShow] = useState("show");
  const [data, setData] = useState({ name: "", email: "", password: "" });

  const navigate = useNavigate();

  const toggle = (e) => {
    e.preventDefault();
    if (show == "show") {
      setShow("hide");
    } else {
      setShow("show");
    }
  };

  const register = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:5000/register", {
      name: data.name,
      email: data.email,
      password: data.password,
    });
    if (res.status === 200) {
      navigate("/");
    } else {
      alert("Registration Failed");
    }
    setData({ name: "", email: "", password: "" });
  };
  return (
    <>
      <Container>
        <Row>
          <Col className="mt-2">
            <h2>User Registration</h2>
            <form>
              <Form.Label htmlFor="inputName5">Name</Form.Label>
              <Form.Control
                type="text"
                id="inputName5"
                aria-describedby="passwordHelpBlock"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
              />

              <Form.Label htmlFor="inputEmail5">Email</Form.Label>
              <Form.Control
                type="email"
                id="inputEmail5"
                aria-describedby="passwordHelpBlock"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />

              <Form.Label htmlFor="inputPassword5">Password</Form.Label>
              <Form.Control
                type={show === "show" ? "password" : "text"}
                id="inputPassword5"
                aria-describedby="passwordHelpBlock"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
              <div className="d-flex justify-content-around align-items-center">
                <span onClick={toggle}>
                  <button className="btn btn-dark mt-2">{show}</button>
                </span>

                <button onClick={register} className="btn btn-primary">
                  Register
                </button>
              </div>
            </form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Register;
