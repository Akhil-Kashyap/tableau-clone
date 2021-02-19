import { SET_OPTION } from "../actions/types";

//initial state for Option parameter
const initialState = {
  option: "Sales",
};

//option state is reinitialised if it is dispatched from actions
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_OPTION: {
      return {
        option: action.payload,
      };
    }

    default:
      return state;
  }
}
