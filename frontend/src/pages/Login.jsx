import React, { useContext, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Authcontext } from "../components/Usercontext";
import { useEffect } from "react";

const Login = () => {
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const { setUserAuth } = useContext(Authcontext);

  const auth = localStorage.getItem("auth");

  useEffect(() => {
    if (auth) {
      navigate("/");
    } else {
      setUserAuth(false);
    }
  }, []);

  const login = async (e) => {
    e.preventDefault();

    const res = await axios.post("http://localhost:5000/login", {
      email: data.email,
      password: data.password,
    });
    if (res.status === 200) {
      localStorage.setItem("auth", res.data.token);
      setUserAuth(true);
      navigate("/");
    }
    setData({ email: "", password: "" });
  };
  return (
    <>
      <Container>
        <Row>
          <Col className="mt-2">
            <h2>User Login</h2>
            <form>
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
                type="password"
                id="inputPassword5"
                aria-describedby="passwordHelpBlock"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
              <div className="mt-2">
                <button onClick={login} className="btn btn-primary">
                  Login
                </button>
              </div>
            </form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
