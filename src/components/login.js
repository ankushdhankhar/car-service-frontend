import React from "react";
import { Navigate } from 'react-router-dom';
import { useForm } from "react-hook-form";

import { connect } from "react-redux";
import { login } from "../actions/auth";

import './Login.css'

function LoginForm({ isLoggedIn, message, dispatch }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await dispatch(login(data.email, data.password));
      window.location.href = "/profile";
    } catch (error) {
      setError("submit", { message: "Login failed" });
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/profile" replace />;
  }

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              {...register("email", {
                required: "This field is required!"
              })}
            />
            {errors.email && (
              <div className="alert alert-danger" role="alert">
                {errors.email.message}
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              {...register("password", { 
                required: "This field is required!" 
              })}
            />
            {errors.password && (
              <div className="alert alert-danger" role="alert">
                {errors.password.message}
              </div>
            )}
          </div>

          <div className="form-group">
            <button
              type="submit"
              className="btn btn-primary btn-block"
              disabled={isSubmitting}
            >
              {isSubmitting && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Login</span>
            </button>
          </div>

          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  const { isLoggedIn } = state.auth;
  const { message } = state.message;
  return {
    isLoggedIn,
    message
  };
}

export default connect(mapStateToProps)(LoginForm);
