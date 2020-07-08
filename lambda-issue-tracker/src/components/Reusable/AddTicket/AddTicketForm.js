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
    Full_Name: "",
    Role: "",
    Track: "",
    Cohort: "",
    Triggering_Record: "",
    TL_Name: "",
    SL1_Name: "",
    SL2_Name: "",
    TL_Efforts_Made: "",
    SL_Efforts_Made: "",
    Comments: "",
    Creators: parseInt(localStorage.getItem("User_Id")),
  });

  console.log("Ticket:", ticket);

  const [enabler, setEnabler] = useState(false);
  const [error, setError] = useState({
    Full_Name: "",
    Role: "",
    Track: "",
    Cohort: "",
    Triggering_Record: "",
    TL_Name: "",
    TL_Efforts_Made: "",
    SL_Efforts_Made: "",
  });

  let history = useHistory();

  useEffect(() => {
    formSchema.isValid(ticket).then((valid) => {
      setEnabler(!valid);
    });
  }, []);

  useEffect(() => {
    axiosWithAuth()
      .get("/students/byTL", userCredentials.Full_Name)
      .then((res) => {
        console.log("USE EFFECT STUDENT CALL", res);
        const students = res.data.students;
        localStorage.setItem("Name", userCredentials.Full_Name);
        setStudents(
          students.map((student) => {
            if (student.TL_Name === userCredentials.Full_Name) {
              return student.Full_Name;
            }
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const formSchema = yup.object().shape({
    Full_Name: yup.string().required("Please, select a student"),
    Role: yup.string().required("Please select the subjects role!"),
    Track: yup.string().required("Please select the subjects core track!"),
    Cohort: yup.string().required("Please, select the subjects current cohort"),
    Triggering_Record: yup
      .string()
      .required("Please, select why you're making this escalation"),
    TL_Name: yup.string().required("Please, enter your name"),
    TL_Efforts_Made: yup
      .string()
      .required("Please, provide the efforts you've made"),
    SL_Efforts_Made: yup
      .string()
      .required("Please, provide the efforts you've made"),
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
      ...ticket,
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
                name="Full_Name"
                value={ticket.Full_Name}
                onChange={handleChange}
              >
                <option value="Assign a Role.">Select Student</option>
                {students.map((name) => {
                  if (name !== undefined) {
                    return <option value={name}>{name}</option>;
                  }
                })}
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
                <option value="Assign a Role.">Role</option>
                <option value={"Student Success Coordinator"}>
                  {"Student Success Coordinator"}
                </option>
                <option value={"Student Leadership Coordinator"}>
                  {"Student Leadership Coordinator"}
                </option>
                <option value={"Section Lead"}>{"Section Lead"}</option>
                <option value={"Team Lead"}>{"Team Lead"}</option>
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
                value={ticket.Track}
                onChange={handleChange}
              >
                <option value="none">Subjects Track</option>
                <option value={"Web"}>{"Web"}</option>
                <option value={"UX"}>{"UX"}</option>
                <option value={"DS"}>{"DS"}</option>
                <option value={"iOS"}>{"iOS"}</option>
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
                value={ticket.Cohort}
                onChange={handleChange}
              >
                <option value="none">Subjects Cohort</option>
                <option value={"Web27"}>{"Web27"}</option>
                <option value={"Web28"}>{"Web28"}</option>
                <option value={"Web29"}>{"Web29"}</option>
                <option value={"Web30"}>{"Web30"}</option>
              </select>
              {error.Cohort.length > 0 ? (
                <p className="error">{error.Cohort}</p>
              ) : null}
            </label>
            <label className="labelText">
              Triggering Record:
              <select
                placeholder="Triage"
                type="text"
                name="Triggering_Record"
                value={ticket.Triggering_Record}
                onChange={handleChange}
              >
                <option value="none">Reason</option>
                <option value={"Academic/Technical"}>
                  {"Academic/Technical"}
                </option>
                <option value={"Participation/Engagement"}>
                  {"Participation/Engagement"}
                </option>
                <option value={"Student Request"}>{"Student Request"}</option>
                <option value={"Emergency"}>{"Emergency"}</option>
                <option value={"Medical/Mental Health"}>
                  {"Medical/Mental Health"}
                </option>
                <option value={"Plagiarism/Cheating"}>
                  {"Plagiarism/Cheating"}
                </option>
                <option value={"Access Problems (no internet/computer)"}>
                  {"Access Problems (no internet/computer)"}
                </option>
              </select>
              {error.Triggering_Record.length > 0 ? (
                <p className="error">{error.Triggering_Record}</p>
              ) : null}
            </label>
            <label className="labelText">
              Tl's Name
              <select
                placeholder="TL Name"
                type="text"
                name="TL_Name"
                value={ticket.TL_Name}
                onChange={handleChange}
              >
                <option value="None">TL Name</option>
                <option value={localStorage.getItem("FullName")}>
                  {localStorage.getItem("FullName")}
                </option>
              </select>
              {error.Full_Name.length > 0 ? (
                <p className="error">{error.Full_Name}</p>
              ) : null}
            </label>
            <label className="labelText">
              Tl's Name
              <select
                placeholder="TL Name"
                type="text"
                name="TL_Efforts_Made"
                value={ticket.TL_Efforts_Made}
                onChange={handleChange}
              >
                <option value="None">TL Name</option>
                <option value={"Support Hours"}>{"Support Hours"}</option>
                <option value={"After Hours"}>{"After Hours"}</option>
                <option value={"Help Channel"}>{"Help Channel"}</option>
                <option value={"TL 1:1"}>{"TL 1:1"}</option>
                <option value={"SL 1:1"}>{"SL 1:1"}</option>
                <option value={"Instructor Hours"}>{"Instructor Hours"}</option>
                <option value={"Verbally Encourage"}>
                  {"Verbally Encourage"}
                </option>
                <option value={"Suggested Modern Health "}>
                  {"Suggested Modern Health "}
                </option>
                <option value={"Student HandBook"}>{"Student HandBook"}</option>
                <option value={"Direct Escalation"}>
                  {"Direct Escalation"}
                </option>
              </select>
              {error.Full_Name.length > 0 ? (
                <p className="error">{error.Full_Name}</p>
              ) : null}
            </label>
            <label className="labelText">
              Tl's Name
              <select
                placeholder="TL Name"
                type="text"
                name="SL_Efforts_Made"
                value={ticket.SL_Efforts_Made}
                onChange={handleChange}
              >
                <option value="None">TL Name</option>
                <option value={"Support Hours"}>{"Support Hours"}</option>
                <option value={"After Hours"}>{"After Hours"}</option>
                <option value={"Help Channel"}>{"Help Channel"}</option>
                <option value={"TL 1:1"}>{"TL 1:1"}</option>
                <option value={"SL 1:1"}>{"SL 1:1"}</option>
                <option value={"Instructor Hours"}>{"Instructor Hours"}</option>
                <option value={"Verbally Encourage"}>
                  {"Verbally Encourage"}
                </option>
                <option value={"Suggested Modern Health "}>
                  {"Suggested Modern Health "}
                </option>
                <option value={"Student HandBook"}>{"Student HandBook"}</option>
                <option value={"Direct Escalation"}>
                  {"Direct Escalation"}
                </option>
              </select>
              {error.Full_Name.length > 0 ? (
                <p className="error">{error.Full_Name}</p>
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
