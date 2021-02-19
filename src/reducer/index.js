import { combineReducers } from "redux";
import yearReducer from "./yearReducer";
import optionReducer from "./optionReducer";
import dataReducer from "./dataReducer";
import authReducer from "./authReducer";

export default combineReducers({
  auth: authReducer,
  year: yearReducer,
  option: optionReducer,
  data: dataReducer,
});
