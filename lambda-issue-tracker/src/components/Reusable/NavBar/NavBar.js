import React from "react";
import NavLogo from "../../../assets/NavLogo.png";

// styles
import "./navbar.css";

const NavBar = () => {
  return (
    <div className="nav">
      <img className="NavLogoImg" src={NavLogo} />
      <h2>THE NAV</h2>
    </div>
  );
};

export default NavBar;
