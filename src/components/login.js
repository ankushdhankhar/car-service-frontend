import React from "react";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { login } from "../actions/auth";

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
    } catch {
      setError("submit", { message: "Login failed" });
    }
  };

  if (isLoggedIn) return <Navigate to="/profile" replace />;

  return (
    <div className="d-flex justify-content-center mt-5">
      <div className="card shadow-lg p-4" style={{ maxWidth: "400px", width: "100%" }}>
        
        <h3 className="text-center fw-bold mb-1">Welcome Back</h3>
        <p className="text-center text-muted mb-4">
          Login to manage your car services
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
          </div>

          <div className="mb-4">
            <label className="form-label">Password</label>
            <input
              type="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
          </div>

          <button className="btn btn-warning w-100 fw-semibold" disabled={isSubmitting}>
            {isSubmitting && <span className="spinner-border spinner-border-sm me-2"></span>}
            Login
          </button>

          {message && <div className="alert alert-danger mt-3">{message}</div>}
        </form>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    message: state.message.message
  };
}

export default connect(mapStateToProps)(LoginForm);
