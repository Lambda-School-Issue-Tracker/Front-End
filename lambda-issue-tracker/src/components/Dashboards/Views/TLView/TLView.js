import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../../UserContext/UserContext";
import axios from "axios";
import { axiosWithAuth } from "../../../../axiosWithAuth/axiosWithAuth";
import plusBtn from "../../../../assets/plus.png";
import AddTickBtn from "../../../Reusable/addTickBtn/addTickBtn.js";

// styles
import "./TLView.css";

const TLView = () => {
  const [tickets, setTickets] = useState();
  const [students, setStudents] = useState();
  const { userCredentials } = useContext(UserContext);

  console.log("TICKET STATE:", tickets, students);

  useEffect(() => {
    axios
      .all([
        axiosWithAuth().get("/students/byTL", userCredentials.Full_Name),
        axiosWithAuth().get(`/tickets/user/${userCredentials.User_Id}`),
      ])
      .then((res) => {
        // console.log("TICKETS CALL:", res[1].data.tickets);
        setTickets(res[1].data.tickets);
        setStudents(res[0].data.students);
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
