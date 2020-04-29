import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../UserContext/UserContext";
import { axiosWithAuth } from "../../axiosWithAuth/axiosWithAuth";
import * as yup from "yup";
import "./Login.css";

const Login = (props) => {
  const {
    userCredentials,
    setUserCredentials,
    setUserId,
    setUserPermission,
  } = useContext(UserContext);
  const [enabler, setEnabler] = useState(false);
  const [error, setError] = useState({
    Email: "",
    Password: "",
  });

  let history = useHistory();

  useEffect(() => {
    formSchema.isValid(userCredentials).then((valid) => {
      setEnabler(!valid);
    });
  }, [userCredentials]);

  const formSchema = yup.object().shape({
    Email: yup
      .string()
      .email(
        "Email is invalid. Hint: Make sure the email contains '@provider.com'."
      )
      .required("Must include email address."),
    Password: yup.string().required("Password is required."),
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
      .post("/auth/login", userCredentials)
      .then((res) => {
        console.log("API RESPONSE:", res);
        localStorage.setItem("token", res.data.token);

        // set's the items on state so the initial load send this data to the useEffect hook to process axios call.
        // On refresh this data will not exist any longer since Login form unmounted.
        setUserPermission(res.data.Role);
        setUserId(res.data.User_Id);

        // Sets the need user credentials on localStorage so in APP when page is refreshed or reloads the
        // data still exists during the user session to keep that session going.
        localStorage.setItem("Role", res.data.Role);
        parseInt(localStorage.setItem("User_Id", res.data.User_Id));

        history.push("/dashboard");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const RegClick = (e) => {
    e.preventDefault();
    history.push("/register");
  };

  return (
    <div className="loginForm">
      <form onSubmit={formSubmit}>
        <h2>Login </h2>
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
      </form>
      <button disabled={enabler} onClick={formSubmit}>
        Submit
      </button>
      <button onClick={RegClick}>Register</button>
    </div>
  );
};

export default Login;
