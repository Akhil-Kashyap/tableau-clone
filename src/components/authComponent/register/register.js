import React, { Component } from "react";
import "../auth.css";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../../actions/authActions";

class register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: {
        email: "",
        username: "",
        password: "",
        password2: "",
      },
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  //checking whether user is logged in or not if the page is vistied after being closed
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  //state change based on input from user
  onChange(e) {
    this.setState({
      login: { ...this.state.login, [e.target.name]: e.target.value },
    });
  }

  onSubmitForm(e) {
    e.preventDefault();
    const userData = {
      username: this.state.login.username,
      password: this.state.login.password,
      password2: this.state.login.password2,
      email: this.state.login.email,
    };

    //register user function is called
    this.props.registerUser(userData, this.props.history);
  }

  render() {
    return (
      <div>
        <form className="form" id="login">
          <h1 className="form__heading">Register</h1>
          <div className="form__group">
            <input
              type="email"
              name="email"
              className="form__input"
              placeholder="Enter Email"
              onChange={this.onChange}
            />
          </div>

          <div className="form__group">
            <input
              type="text"
              name="username"
              className="form__input"
              placeholder="Enter Username"
              onChange={this.onChange}
            />
          </div>
          <div className="form__group">
            <input
              type="password"
              name="password"
              className="form__input"
              placeholder="Enter Password"
              onChange={this.onChange}
            />
          </div>
          <div className="form__group">
            <input
              type="password"
              name="password2"
              className="form__input"
              placeholder="Retype Password"
              onChange={this.onChange}
            />
          </div>

          <button
            className="button is-success login-button"
            onClick={this.onSubmitForm}
          >
            Sign Up
          </button>
        </form>
      </div>
    );
  }
}

register.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { registerUser })(register);
