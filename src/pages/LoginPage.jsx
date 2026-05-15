import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogoIcon, IconUser, IconLock } from "../assets/icons";
import logo1 from "../assets/images/logo1.png";
import aguora from "../assets/images/aguora.png";
import "../styles/login.css";

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  function validate() {
    const errs = {};
    if (!form.username.trim()) errs.username = "Username is required";
    if (!form.password.trim()) errs.password = "Password is required";
    return errs;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    navigate("/dashboard");
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  return (
    <div className="login-root">
      <div className="login-left">
        <div className="login-logo">
          <img src={aguora} alt="aguora logo" />
        </div>
        <div className="login-form-wrap">
          <h1 className="login-title">Sign in to Aguora</h1>
          <p className="login-subtitle">
            Welcome back! Enter your credentials below
          </p>
          <form className="login-form" onSubmit={handleSubmit} noValidate>
            <div className="login-field">
              <label className="login-label">Username</label>
              <div
                className={`login-input-wrap ${errors.username ? "error" : ""}`}
              >
                <span className="login-input-icon">
                  <IconUser size={16} color="#9ca3af" />
                </span>
                <input
                  className="login-input"
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  value={form.username}
                  onChange={handleChange}
                  autoComplete="username"
                />
              </div>
              {errors.username && (
                <span className="login-error">{errors.username}</span>
              )}
            </div>
            <div className="login-field">
              <label className="login-label">Password</label>
              <div
                className={`login-input-wrap ${errors.password ? "error" : ""}`}
              >
                <span className="login-input-icon">
                  <IconLock size={16} color="#9ca3af" />
                </span>
                <input
                  className="login-input"
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  value={form.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                />
              </div>
              {errors.password && (
                <span className="login-error">{errors.password}</span>
              )}
            </div>
            <button type="submit" className="login-btn">
              Sign in
            </button>
          </form>
        </div>
      </div>
      <div className="login-right">
        <div className="login-illustration">
          <img src={logo1} alt="aguora logo1" />
        </div>
      </div>
    </div>
  );
}
