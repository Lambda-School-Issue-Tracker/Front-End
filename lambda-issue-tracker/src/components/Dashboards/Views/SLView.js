import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../UserContext/UserContext";
import { axiosWithAuth } from "../../../axiosWithAuth/axiosWithAuth";

const SLView = () => {
  const { userCredentials } = useContext(UserContext);
  const [tickets, setTickets] = useState();
  console.log("in state:", tickets);
  useEffect(() => {
    axiosWithAuth()
      .get("/tickets/cohort", userCredentials.Cohort)
      .then((res) => {
        console.log("TICKET DATA:", res.data);
        setTickets(res.data.tickets);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userCredentials]);
  return <h1>SL VIEW</h1>;
};

export default SLView;
