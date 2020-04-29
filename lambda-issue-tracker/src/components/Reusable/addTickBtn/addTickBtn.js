import React from "react";
import { useHistory } from "react-router-dom";

// styles
import "./addTickBtn.css";

const AddTickBtn = () => {
  let history = useHistory();

  const addTicketRoute = (e) => {
    e.preventDefault();
    history.push("/addTicket");
  };

  return (
    <>
      <button onClick={addTicketRoute} className="addTicketBtn">
        <ion-icon className="iconImg" name="add-circle-outline"></ion-icon>
      </button>
    </>
  );
};

export default AddTickBtn;
