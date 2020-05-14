import React, { useState, useEffect, useContext } from "react";
import { axiosWithAuth } from "../../../axiosWithAuth/axiosWithAuth";
import { useHistory } from "react-router-dom";
import UserContext from "../../../UserContext/UserContext";
import StudentContext from "../../../UserContext/StudentContext";
import * as yup from "yup";

// components
import NavBar from "../NavBar/NavBar.js";

// styles
import "./AddTicketForm.css";

const AddTicket = () => {
  const { userCredentials } = useContext(UserContext);
  const [students, setStudents] = useState([]);
  console.log("Students STATE:", students);
  const [ticket, setTicket] = useState({
    Full_Name: students,
    Role: [
      "Student Success Coordinator",
      "Student Leadership Coordinator",
      "Section Lead",
      "Team Lead",
    ],
    Track: ["Web", "UX", "DS", "iOS"],
    Cohort: ["Web27", "Web28", "Web29", "Web30"],
    Triggering_Record: [
      "Academic/Technical",
      "Participation/Engagement",
      "Student Request",
      "Emergency",
      "Medical/Mental Health",
      "Plagiarism/Cheating",
      "Access Problems (no internet/computer)",
    ],
    TL_Name: "",
    SL1_Name: "",
    SL2_Name: "",
    TL_Efforts_Made: "",
    SL_Efforts_Made: "",
    Comments: "",
    Creators: parseInt(localStorage.getItem("User_Id")),
  });

  console.log("TICKET:", ticket);

  const [enabler, setEnabler] = useState(false);
  const [error, setError] = useState({
    Full_Name: "",
    Role: "",
    Track: "",
    Cohort: "",
    Triggering_Record: "",
  });

  let history = useHistory();

  useEffect(() => {
    formSchema.isValid(ticket).then((valid) => {
      setEnabler(!valid);
    });
  }, []);

  useEffect(() => {
    /// NOT COMPLETED
    axiosWithAuth()
      .get("/students/byTL", userCredentials.Full_Name)
      .then((res) => {
        console.log("TICKET FORM", res);
        res.data.students.map((student) => {
          students.push(student);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const formSchema = yup.object().shape({
    // Email: yup
    //   .string()
    //   .email(
    //     "Email is invalid. Hint: Make sure the email contains '@provider.com'."
    //   )
    //   .required("Must include email address."),
    // Password: yup.string().required("Password is required."),
  });

  const validateChange = (e) => {
    yup
      .reach(formSchema, e.target.name)
      .validate(e.target.value)
      .then((valid) => {
        setError({
          ...error,
          [e.target.name]: "",
        });
      })
      .catch((err) => {
        setError({
          ...error,
          [e.target.name]: err.errors[0],
        });
      });
  };

  const handleChange = (e) => {
    e.persist();
    const newFormData = {
      [e.target.name]: e.target.value,
    };

    validateChange(e);
    setTicket(newFormData);
  };

  const formSubmit = (e) => {
    e.persist();
  };

  const RegClick = (e) => {
    e.preventDefault();
    // history.push("/register");
  };

  return (
    <div className="loginForm">
      <section className="ATFormContainer">
        <NavBar />
        <div className="ATFormBody">
          <h1>ADD TICKET HERE</h1>
          <form onSubmit={formSubmit}>
            <h2>New Ticket </h2>
            <label className="labelText">
              Student's Name:
              <select
                placeholder="Student's Name"
                type="text"
                name="Role"
                value={ticket.Full_Name}
                onChange={handleChange}
              >
                <option value="Assign a Role.">Assign a Role</option>
                {/* {ticket.Full_Name.map((name) => {
                  return <option value={name}>{name}</option>;
                })} */}
              </select>
              {error.Full_Name.length > 0 ? (
                <p className="error">{error.Role}</p>
              ) : null}
            </label>
            <label className="labelText">
              Role:
              <select
                placeholder="Role"
                type="text"
                name="Role"
                value={ticket.Role}
                onChange={handleChange}
              >
                <option value="Assign a Role.">Assign a Role</option>
                {ticket.Role.map((role) => {
                  return <option value={role}>{role}</option>;
                })}
              </select>
              {error.Role.length > 0 ? (
                <p className="error">{error.Role}</p>
              ) : null}
            </label>
            <label className="labelText">
              Track:
              <select
                placeholder="Track"
                type="text"
                name="Track"
                value={userCredentials.Track}
                onChange={handleChange}
              >
                <option value="none">Subjects Track</option>
                {ticket.Track.map((track) => {
                  return <option value={track}>{track}</option>;
                })}
              </select>
              {error.Track.length > 0 ? (
                <p className="error">{error.Track}</p>
              ) : null}
            </label>
            <label className="labelText">
              Cohort:
              <select
                placeholder="Cohort"
                type="text"
                name="Cohort"
                value={userCredentials.Cohort}
                onChange={handleChange}
              >
                <option value="none">Subjects Cohort</option>
                {ticket.Cohort.map((cohort) => {
                  return <option value={cohort}>{cohort}</option>;
                })}
              </select>
              {error.Cohort.length > 0 ? (
                <p className="error">{error.Cohort}</p>
              ) : null}
            </label>
            <label className="labelText">
              Reason Topic:
              <select
                placeholder="Triage"
                type="text"
                name="Triggering_Record"
                value={userCredentials.Triggering_Record}
                onChange={handleChange}
              >
                <option value="none">Reason</option>
                {ticket.Triggering_Record.map((trigger) => {
                  return <option value={trigger}>{trigger}</option>;
                })}
              </select>
              {error.Triggering_Record.length > 0 ? (
                <p className="error">{error.Cohort}</p>
              ) : null}
            </label>
          </form>
          <button disabled={enabler} onClick={formSubmit}>
            Submit
          </button>
          <button onClick={RegClick}>Register</button>
        </div>
      </section>
    </div>
  );
};

export default AddTicket;
