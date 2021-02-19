import axios from "axios";

import { SET_CURRENT_USER } from "./types";

// Register User
export const registerUser = (userData, history) => (dispatch) => {
  // console.log(userData);
  // console.log(JSON.stringify(userData));

  fetch("https://tableau-clone.herokuapp.com/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  }).then(
    function (response) {
      // console.log(response.json());
      //redirecting to login page after succeful register
      history.push("/");
    },
    (error) => {
      console.log(error);
    }
  );
};

//Login User
export const loginUser = (userData) => (dispatch) => {
  axios
    .post("https://tableau-clone.herokuapp.com/api-token-auth", {
      username: userData.username,
      password: userData.password,
    })
    .then(
      (res) => {
        const { token } = res.data;
        localStorage.setItem("Token", token);
        localStorage.setItem("User", res.data.username);
        //setting user in redux store
        dispatch(setCurrentUser(res.data.username));
      },
      (error) => {
        console.log(error);
      }
    );
};

//Set Logged in User
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

//Logout User
export const logoutUser = () => (dispatch) => {
  const postMethod = {
    method: "POST", // Method itself
    headers: {
      Authorization: "Token " + localStorage.Token, // Indicates the content
    },
  };

  fetch("https://tableau-clone.herokuapp.com/logout-data", postMethod)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      //remove local storage
      localStorage.removeItem("Token");
      localStorage.removeItem("User");
      //setting currentUser to empty in store
      dispatch(setCurrentUser({}));
    })
    .catch((err) => console.log(err));
};
