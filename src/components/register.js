import React from "react";
import { useForm } from "react-hook-form";
import { isEmail } from "../shared/validator";

import { connect } from "react-redux";
import { register as registerAction, login } from "../actions/auth";

function RegisterForm({ message, dispatch }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError
  } = useForm();

  const [successful, setSuccessful] = React.useState(false);

  const onSubmit = async (data) => {
    setSuccessful(false);
    
    try {
      await dispatch(registerAction(data.username, data.email, data.password));
      setSuccessful(true);
      
      // Auto-login after successful registration
      await dispatch(login(data.email, data.password));
      window.location.href = "/profile";
    } catch (error) {
      setSuccessful(false);
      setError("submit", { message: "Registration failed" });
    }
  };

  const validateEmail = (value) => {
    if (!isEmail(value)) {
      return "This is not a valid email.";
    }
    return true;
  };

  const validateUsername = (value) => {
    if (value.length < 3 || value.length > 20) {
      return "The username must be between 3 and 20 characters.";
    }
    return true;
  };

  const validatePassword = (value) => {
    if (value.length < 6 || value.length > 40) {
      return "The password must be between 6 and 40 characters.";
    }
    return true;
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <form onSubmit={handleSubmit(onSubmit)}>
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                  {...register("username", { 
                    required: "This field is required!",
                    validate: validateUsername
                  })}
                />
                {errors.username && (
                  <div className="alert alert-danger" role="alert">
                    {errors.username.message}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  {...register("email", { 
                    required: "This field is required!",
                    validate: validateEmail
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
                    required: "This field is required!",
                    validate: validatePassword
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
                  Sign Up
                </button>
              </div>
            </div>
          )}

          {message && (
            <div className="form-group">
              <div className={successful ? "alert alert-success" : "alert alert-danger"} role="alert">
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
  const { message } = state.message;
  return {
    message,
  };
}

export default connect(mapStateToProps)(RegisterForm);
