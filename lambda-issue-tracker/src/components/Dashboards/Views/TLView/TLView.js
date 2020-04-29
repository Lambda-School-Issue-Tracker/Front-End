import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../../UserContext/UserContext";
import { axiosWithAuth } from "../../../../axiosWithAuth/axiosWithAuth";
import plusBtn from "../../../../assets/plus.png";
import AddTickBtn from "../../../Reusable/addTickBtn/addTickBtn.js";

// styles
import "./TLView.css";

const TLView = () => {
  const { userId } = useContext(UserContext);
  const [tickets, setTickets] = useState();
  console.log("in state:", tickets);

  useEffect(() => {
    axiosWithAuth()
      .get(`/tickets/user/${userId}`)
      .then((res) => {
        console.log(res.data);
        setTickets(res.data.tickets);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="TLView">
      <h1>TL Dashboard</h1>
      <AddTickBtn />
    </div>
  );
};

export default TLView;
