import React, { Component } from "react";
import "../auth.css";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../../actions/authActions";

class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: {
        username: "",
        password: "",
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

  //changing state based on login data
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
    };

    //login Function is called
    this.props.loginUser(userData);
  }

  render() {
    return (
      <div>
        <form className="form" id="login">
          <h1 className="form__heading">Log In</h1>
          <div className="form__group">
            <input
              type="text"
              name="username"
              className="form__input"
              placeholder="Username"
              onChange={this.onChange}
            />
          </div>
          <div className="form__group">
            <input
              type="password"
              name="password"
              className="form__input"
              placeholder="Password"
              onChange={this.onChange}
            />
          </div>
          <button
            className="button is-success login-button"
            onClick={this.onSubmitForm}
          >
            Login
          </button>
        </form>
      </div>
    );
  }
}

login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { loginUser })(login);
