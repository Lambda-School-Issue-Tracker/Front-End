import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../UserContext/UserContext";
import NavBar from "../Reusable/NavBar/NavBar.js";

// styles
import "./Dashboard.css";

// View Imports:
import TLView from "./Views/TLView/TLView";
import SLView from "./Views/SLView";
import SLCView from "./Views/SLCView";
import SSView from "./Views/SSView";

const Dashboard = () => {
  const { userCredentials, setUserCredentials } = useContext(UserContext);

  console.log("IN DASHBOARD:", userCredentials);

  const logout = () => {
    localStorage.clear("token", "Role", "User_Id");
    setUserCredentials({ Email: "", Password: "" });
  };

  return (
    <>
      <section className="appBody">
        <NavBar />
        <section className="appViews">
          <button className="logOutBtn" onClick={logout}>
            Log Out
          </button>
          {userCredentials.Role === "Team Lead" ? <TLView /> : null}
          {userCredentials.Role === "Section Lead" ? <SLView /> : null}
          {userCredentials.Role === "Student Leadership Coordinator" ? (
            <SLCView />
          ) : null}
          {userCredentials.Role === "Student Success Coordinator" ? (
            <SSView />
          ) : null}
        </section>
      </section>
    </>
  );
};

export default Dashboard;
