import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";

class Profile extends Component {
  render() {
    const { user: currentUser } = this.props;

    if (!currentUser) {
      return <Navigate to="/login" replace />;
    }
    
    // Redirect admin, vendor, and employee to their respective dashboards
    if (currentUser.role === "ADMIN") {
      return <Navigate to="/admin-home" replace />;
    } else if (currentUser.role === "VENDOR") {
      return <Navigate to="/vendor/home" replace />;
    } else if (currentUser.role === "EMPLOYEE") {
      return <Navigate to="/employee/home" replace />;
    }
    
    // Show profile for customers and others

    return (
      <div className="container">
        <header className="jumbotron">
          <h3>
            <strong>{currentUser.email}</strong> Profile
          </h3>
        </header>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Account Information</h5>
            <p className="card-text">
              <strong>Email:</strong> {currentUser.email}
            </p>
            <p className="card-text">
              <strong>Role:</strong> {currentUser.role}
            </p>
            <p className="card-text">
              <strong>Account ID:</strong> {currentUser.id}
            </p>
            {currentUser.role === "CUSTOMER" && (
              <div className="mt-3">
                <h6>Customer Dashboard</h6>
                <p>Welcome to your customer dashboard! You can:</p>
                <ul>
                  <li>Book car services</li>
                  <li>View your service history</li>
                  <li>Manage your profile</li>
                  <li>Provide feedback</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(Profile);
