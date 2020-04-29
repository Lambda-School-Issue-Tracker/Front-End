import axios from "axios";

export const axiosWithAuth = () => {
  const token = localStorage.getItem("token");
  return axios.create({
    baseURL: "https://lambda-issue-tracker.herokuapp.com/api",
    headers: {
      token: token
    }
  });
};
