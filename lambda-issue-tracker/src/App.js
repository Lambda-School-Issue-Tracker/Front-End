import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { UserContext } from "./UserContext/UserContext";
import { axiosWithAuth } from "./axiosWithAuth/axiosWithAuth";

// Components:
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import Login from "./components/Login/Login";
import Register from "./components/Registration/Registration";
import Dashboard from "./components/Dashboards/Dashboard";
import AddTicket from "./components/Reusable/AddTicket/AddTicketForm.js";
import "./App.css";

const App = () => {
  const [userCredentials, setUserCredentials] = useState({
    Full_Name: "",
    Email: "",
    Password: "",
    Role: "",
    Track: "",
    Cohort: "",
  });
  const [userPermission, setUserPermission] = useState();
  const [userId, setUserId] = useState();

  useEffect(() => {
    setUserId(parseInt(localStorage.getItem("User_Id")));
    setUserPermission(window.localStorage.getItem("Role"));

    axiosWithAuth()
      .get(`/users/${parseInt(localStorage.getItem("User_Id"))}`)
      .then((res) => {
        setUserCredentials({
          ...res.data.user,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userId]);

  console.log("After UseEffect:", userCredentials);

  return (
    <UserContext.Provider
      value={{
        userCredentials,
        setUserCredentials,
        userId,
        setUserId,
        setUserPermission,
      }}
    >
      {/* Navigation */}

      {/* Routes */}
      <Route exact path="/" component={Login} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/addTicket" component={AddTicket} />

      {/* Protected Routes */}
      <PrivateRoute path="/dashboard" component={Dashboard} />
    </UserContext.Provider>
  );
};

export default App;
