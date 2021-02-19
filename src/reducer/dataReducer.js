import { SET_DATA } from "../actions/types";

//initial state for data
const initialState = {
  data: {},
};

//data is set if SET_DATA is dipatched from action
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_DATA: {
      return {
        data: action.payload,
      };
    }

    default:
      return state;
  }
}
