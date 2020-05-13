import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../../UserContext/UserContext";
import NavLogo from "../../../assets/NavLogo.png";

// styles
import "./navbar.css";

const NavBar = () => {
  const { userCredentials } = useContext(UserContext);

  let history = useHistory();

  const handleRoute = (e) => {
    history.push("/dashboard");
  };

  return (
    <div className="nav">
      <img onClick={handleRoute} className="NavLogoImg" src={NavLogo} />
      <h2>THE NAV</h2>
    </div>
  );
};

export default NavBar;
