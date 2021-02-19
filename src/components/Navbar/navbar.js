import React, { Component } from "react";
import "./navbar.css";
import Logo from "../../images/logo.png";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import axios from "axios";

import { logoutUser } from "../../actions/authActions";

class Nav_menu extends Component {
  handlelogout(e) {
    e.preventDefault();
    //function to logout user
    this.props.logoutUser();
  }

  handleSignup() {
    //redirect user to register page
    this.props.history.push("/signup");
  }

  handleSignin() {
    //redirect user to login page
    this.props.history.push("/");
  }

  render() {
    let param;
    //checking if user is authenticated or not. Based on that the buttons will be rendered
    if (this.props.auth.isAuthenticated) {
      param = (
        <li>
          <div
            className=" btn-small sign-up"
            onClick={this.handlelogout.bind(this)}
          >
            Log Out
          </div>
        </li>
      );
    } else {
      param = (
        <li>
          <div
            className="waves-effect waves-light btn-small sign-up"
            onClick={this.handleSignup.bind(this)}
          >
            Sign Up
          </div>
          <div
            className=" btn-small sign-in"
            onClick={this.handleSignin.bind(this)}
          >
            Sign In
          </div>
        </li>
      );
    }

    return (
      <div>
        <nav>
          <div className="nav-wrapper">
            <a href="#!" className="brand-logo">
              <img src={Logo} style={{ height: "30px" }}></img>
            </a>
            <a href="#" data-target="mobile-demo" className="sidenav-trigger">
              <i className="material-icons">menu</i>
            </a>
            <ul className="right hide-on-med-and-down">
              <li>
                <a>GALLERY</a>
              </li>
              <li>
                <a>AUTHORS</a>
              </li>
              <li>
                <a>BLOGS</a>
              </li>
              <li>
                <a>RESOURCES</a>
              </li>

              {param}
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(withRouter(Nav_menu));
