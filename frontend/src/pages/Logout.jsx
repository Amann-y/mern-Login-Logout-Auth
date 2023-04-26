import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const auth = localStorage.removeItem("auth");

  useEffect(() => {
    if (!auth) {
      navigate("/login");
    }
  }, []);
  return <></>;
};

export default Logout;
