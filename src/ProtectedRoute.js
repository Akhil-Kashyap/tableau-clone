import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

//protected route for which will only work if user is authnticated
class ProtectedRoute extends React.Component {
  render() {
    const Component = this.props.component;

    const isAuthenticated = this.props.auth.isAuthenticated;

    return isAuthenticated ? (
      <Component />
    ) : (
      <Redirect to={{ pathname: "/" }} />
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(ProtectedRoute);
