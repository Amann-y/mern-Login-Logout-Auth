import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [showpic, setShowPic] = useState([]);

  let auth = localStorage.getItem("auth");
  async function profiles() {
    const res = await axios.get("http://localhost:5000/profile", {
      headers: {
        Authorization: auth,
      },
    });
    if (res.status === 200) {
      setName(res.data.name);
      setEmail(res.data.email);
    } else {
      alert("Failed");
    }
  }

  const showPhotos = async () => {
    const res = await axios.get(
      "https://jsonplaceholder.typicode.com/albums/1/photos"
    );
    const data = await res.data;
    console.log(data);
    setShowPic(data);
  };

  useEffect(() => {
    profiles();
    showPhotos();
  }, []);

  return (
    <>
      <Container>
        <Row>
          <h2>Namaste {name}</h2>
          {showpic &&
            showpic.map((ele, ind) => {
              return (
                <Col
                  sm={4}
                  key={ele.id}
                  className="d-flex justify-content-around align=items-center border-border-dark my-1"
                >
                  <Image src={ele.thumbnailUrl} alt="Pic" />
                </Col>
              );
            })}
        </Row>
      </Container>
    </>
  );
};

export default Profile;
