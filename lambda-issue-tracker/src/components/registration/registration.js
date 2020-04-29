import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../UserContext/UserContext";
import { axiosWithAuth } from "../../axiosWithAuth/axiosWithAuth";
import * as yup from "yup";
import "./registration.css";

const Register = (props) => {
  const {
    userCredentials,
    setUserCredentials,
    setUserId,
    setUserPermission,
  } = useContext(UserContext);
  const [enabler, setEnabler] = useState(false);
  const [error, setError] = useState({
    Full_Name: "",
    Email: "",
    Password: "",
    Role: "",
    Track: "",
    Cohort: "",
  });
  const [assignment, setAssignment] = useState({
    Role: [
      "Student Success Coordinator",
      "Student Leadership Coordinator",
      "Section Lead",
      "Team Lead",
    ],
    Cohort: ["Web27", "Web28", "Web29", "Web30"],
    Track: ["Web", "UX", "DS", "iOS"],
  });

  let history = useHistory();

  useEffect(() => {
    formSchema.isValid(userCredentials).then((valid) => {
      setEnabler(!valid);
    });
  }, [userCredentials]);

  const formSchema = yup.object().shape({
    Full_Name: yup.string().required("User's full name is required"),
    Email: yup
      .string()
      .email(
        "Email is invalid. Hint: Make sure the email contains '@provider.com'."
      )
      .required("Must include email address."),
    Password: yup.string().required("Password is required."),
    Role: yup.string().required("Please assign this user a role!"),
    Track: yup.string().required("Please, assign this user to a track!"),
    Cohort: yup
      .string()
      .required(
        "If the user is a SL/TL a Cohort is required otherwise enter N/A."
      ),
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
      ...userCredentials,
      [e.target.name]: e.target.value,
    };

    validateChange(e);
    setUserCredentials(newFormData);
  };

  const formSubmit = (e) => {
    e.persist();
    axiosWithAuth()
      .post("/auth/Register", userCredentials)
      .then((res) => {
        console.log("API RESPONSE:", res);

        history.push("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const LoginClick = (e) => {
    e.preventDefault();
    history.push("/login");
  };

  return (
    <div className="RegisterForm">
      <form onSubmit={formSubmit}>
        <h2>Register </h2>
        <label className="labelText">
          Full Name:
          <input
            placeholder="Full Name"
            type="text"
            name="Full_Name"
            value={userCredentials.Full_Name}
            onChange={handleChange}
          />
          {error.Full_Name.length > 0 ? (
            <p className="error">{error.Full_Name}</p>
          ) : null}
        </label>
        <label className="labelText">
          Email:
          <input
            placeholder="Email"
            type="text"
            name="Email"
            value={userCredentials.Email}
            onChange={handleChange}
          />
          {error.Email.length > 0 ? (
            <p className="error">{error.Email}</p>
          ) : null}
        </label>
        <label className="labelText">
          Password:
          <input
            placeholder="Password"
            type="password"
            name="Password"
            value={userCredentials.Password}
            onChange={handleChange}
          />
          {error.Password.length > 0 ? (
            <p className="error">{error.Password}</p>
          ) : null}
        </label>
        <label className="labelText">
          Role:
          <select
            placeholder="Role"
            type="text"
            name="Role"
            value={userCredentials.Role}
            onChange={handleChange}
          >
            {" "}
            <option value="none">Assign User to a Role</option>
            {assignment.Role.map((role) => {
              return <option value={role}>{role}</option>;
            })}
          </select>
          {error.Role.length > 0 ? <p className="error">{error.Role}</p> : null}
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
            <option value="none">Assign User to a Cohort</option>
            {assignment.Track.map((track) => {
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
            <option value="none">Assign User to a Cohort</option>
            {assignment.Cohort.map((cohort) => {
              return <option value={cohort}>{cohort}</option>;
            })}
          </select>
          {error.Cohort.length > 0 ? (
            <p className="error">{error.Cohort}</p>
          ) : null}
        </label>
      </form>
      <button disabled={enabler} onClick={formSubmit}>
        Submit
      </button>
      <button onClick={LoginClick}>Login</button>
    </div>
  );
};

export default Register;
