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
    setError,
  } = useForm();

  const [successful, setSuccessful] = React.useState(false);

  const onSubmit = async (data) => {
    setSuccessful(false);
    try {
      await dispatch(registerAction(data.username, data.email, data.password));
      setSuccessful(true);
      await dispatch(login(data.email, data.password));
      window.location.href = "/profile";
    } catch (error) {
      setSuccessful(false);
      setError("submit", { message: "Registration failed" });
    }
  };

  return (
    <div className="d-flex justify-content-center mt-5">
      <div
        className="card shadow-lg p-4"
        style={{ maxWidth: "420px", width: "100%" }}
      >
        <h3 className="text-center fw-bold mb-1">Create Service Account</h3>
        <p className="text-center text-muted mb-4">
          Register to book and manage car services
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          {!successful && (
            <>
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                  className={`form-control ${
                    errors.username ? "is-invalid" : ""
                  }`}
                  {...register("username", {
                    required: "Username is required",
                    validate: (v) =>
                      (v.length >= 3 && v.length <= 20) ||
                      "Username must be 3–20 characters",
                  })}
                />
                {errors.username && (
                  <div className="invalid-feedback">
                    {errors.username.message}
                  </div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  {...register("email", {
                    required: "Email is required",
                    validate: (v) => isEmail(v) || "Invalid email address",
                  })}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email.message}</div>
                )}
              </div>

              <div className="mb-4">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className={`form-control ${
                    errors.password ? "is-invalid" : ""
                  }`}
                  {...register("password", {
                    required: "Password is required",
                    validate: (v) =>
                      (v.length >= 6 && v.length <= 40) ||
                      "Password must be 6–40 characters",
                  })}
                />
                {errors.password && (
                  <div className="invalid-feedback">
                    {errors.password.message}
                  </div>
                )}
              </div>

              <button
                className="btn btn-warning w-100 fw-semibold"
                disabled={isSubmitting}
              >
                {isSubmitting && (
                  <span className="spinner-border spinner-border-sm me-2"></span>
                )}
                Create Account
              </button>
            </>
          )}

          {message && (
            <div
              className={`alert mt-3 ${
                successful ? "alert-success" : "alert-danger"
              }`}
            >
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return { message: state.message.message };
}

export default connect(mapStateToProps)(RegisterForm);
