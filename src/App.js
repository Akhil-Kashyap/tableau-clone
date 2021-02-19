import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";
import ProtectedRoute from "./ProtectedRoute";
import { setCurrentUser } from "./actions/authActions";
import Navbar from "./components/Navbar/navbar";
import ChartBody from "./components/chartComponent/chartComponent";
import Login from "./components/authComponent/login/login";
import Register from "./components/authComponent/register/register";

//checking whether token exist in local storage
if (localStorage.Token) {
  //set User
  store.dispatch(setCurrentUser(localStorage.User));
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar></Navbar>
          <Route exact path="/" component={Login}></Route>
          <Route exact path="/signup" component={Register}></Route>
          <ProtectedRoute
            exact={true}
            path="/dashboard"
            component={ChartBody}
          />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
