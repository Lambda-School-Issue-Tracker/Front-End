import React, { useState, useEffect } from "react";

// components
import NavBar from "../NavBar/NavBar.js";

// styles
import "./AddTicketForm.css";

const AddTicket = () => {
  return (
    <section className="ATFormContainer">
      <NavBar />
      <div className="ATFormBody">
        <h1>ADD TICKET HERE</h1>
      </div>
    </section>
  );
};

export default AddTicket;
