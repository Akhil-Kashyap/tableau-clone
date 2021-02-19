import axios from "axios";

import { SET_DATA } from "./types";

//Get Posts
export const setData = (option, year) => (dispatch) => {
  axios
    .get(
      `https://tableau-clone.herokuapp.com/fetch?format=json&stat=${option}&year=${year}`,
      {
        headers: {
          authorization: "Token " + localStorage.Token,
        },
      }
    )
    .then((response) => {
      dispatch({
        type: SET_DATA,
        payload: response.data,
      });
    });
};
