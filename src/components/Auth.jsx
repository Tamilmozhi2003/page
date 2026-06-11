import React, { useState } from "react";
import {
  FaGoogle,
  FaFacebookF,
  FaGithub,
  FaLinkedinIn,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import "./Auth.css";

function Auth() {
  /* ── Panel toggle ── */
  const [isLogin, setIsLogin] = useState(false);

  /* ── Forgot Password state ── */
  const [isForgotPwd, setIsForgotPwd] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotMsg, setForgotMsg] = useState("");
  const [forgotError, setForgotError] = useState("");

  /* ── Sign In state ── */
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loginErrors, setLoginErrors] = useState({});
  const [showLoginPwd, setShowLoginPwd] = useState(false);
  const [loginMsg, setLoginMsg] = useState("");

  /* ── Sign Up state ── */
  const [regData, setRegData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [regErrors, setRegErrors] = useState({});
  const [showRegPwd, setShowRegPwd] = useState(false);
  const [regMsg, setRegMsg] = useState("");

  /* ── Helpers ── */
  const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  /* ─── Submit: Forgot Password ─── */
  function handleForgotSubmit(e) {
    e.preventDefault();
    if (!forgotEmail) {
      setForgotError("Email is required.");
    } else if (!isValidEmail(forgotEmail)) {
      setForgotError("Enter a valid email.");
    } else {
      setForgotError("");
      setForgotMsg("Password reset link sent to your email!");
      setTimeout(() => {
        setForgotMsg("");
        setIsForgotPwd(false);
        setForgotEmail("");
      }, 3000);
    }
  }

  /* ─── Sign In validation ─── */
  function validateLogin() {
    const e = {};
    if (!loginData.email)               e.email    = "Email is required.";
    else if (!isValidEmail(loginData.email)) e.email = "Enter a valid email.";
    if (!loginData.password)            e.password = "Password is required.";
    else if (loginData.password.length < 6) e.password = "Minimum 6 characters.";
    return e;
  }

  /* ─── Sign Up validation ─── */
  function validateRegister() {
    const e = {};
    if (!regData.name.trim())             e.name     = "Name is required.";
    if (!regData.email)                   e.email    = "Email is required.";
    else if (!isValidEmail(regData.email)) e.email   = "Enter a valid email.";
    if (!regData.password)                e.password = "Password is required.";
    else if (regData.password.length < 6) e.password = "Minimum 6 characters.";
    return e;
  }

  /* ─── Submit: Sign In ─── */
  function handleLoginSubmit(e) {
    e.preventDefault();
    const errs = validateLogin();
    setLoginErrors(errs);
    if (Object.keys(errs).length === 0) {
      setLoginMsg("✅ Signed in successfully!");
      setLoginData({ email: "", password: "" });
      setTimeout(() => setLoginMsg(""), 3000);
    }
  }

  /* ─── Submit: Sign Up ─── */
  function handleRegisterSubmit(e) {
    e.preventDefault();
    const errs = validateRegister();
    setRegErrors(errs);
    if (Object.keys(errs).length === 0) {
      setRegMsg("🎉 Account created successfully!");
      setRegData({ name: "", email: "", password: "" });
      setTimeout(() => setRegMsg(""), 3000);
    }
  }

  /* ─── Live input handlers ─── */
  function handleLoginChange(e) {
    const { name, value } = e.target;
    setLoginData((p) => ({ ...p, [name]: value }));
    if (loginErrors[name]) setLoginErrors((p) => ({ ...p, [name]: "" }));
  }

  function handleRegChange(e) {
    const { name, value } = e.target;
    setRegData((p) => ({ ...p, [name]: value }));
    if (regErrors[name]) setRegErrors((p) => ({ ...p, [name]: "" }));
  }

  /* ─── Panel switch ─── */
  function goLogin()    { setIsLogin(true);  setLoginErrors({}); setRegErrors({}); setIsForgotPwd(false); }
  function goRegister() { setIsLogin(false); setLoginErrors({}); setRegErrors({}); setIsForgotPwd(false); }

  return (
    <div className="wrapper">

      {/* ── Global toast ── */}
      {loginMsg && <div className="toast success">{loginMsg}</div>}
      {regMsg   && <div className="toast success">{regMsg}</div>}
      {forgotMsg && <div className="toast success">{forgotMsg}</div>}

      <div className={`container ${isLogin ? "active" : ""}`}>

        {/* ════════════ Sign In Form ════════════ */}
        <div className="form-container login">
          {isForgotPwd ? (
            <form onSubmit={handleForgotSubmit} noValidate>
              <h1>Forgot Password</h1>
              <p className="text">Enter your email to reset your password</p>

              <div className="field-group" style={{ marginTop: "20px" }}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={forgotEmail}
                  onChange={(e) => {
                    setForgotEmail(e.target.value);
                    if (forgotError) setForgotError("");
                  }}
                  className={forgotError ? "input-error" : ""}
                />
                {forgotError && (
                  <span className="error-msg">{forgotError}</span>
                )}
              </div>

              <button type="submit" className="btn" style={{ marginTop: "20px" }}>RESET PASSWORD</button>
              <a href="#" className="forgot" onClick={(e) => { e.preventDefault(); setIsForgotPwd(false); }}>
                Back to Sign In
              </a>
            </form>
          ) : (
            <form onSubmit={handleLoginSubmit} noValidate>
              <h1>Sign In</h1>

            <div className="social-icons">
              <a href="#" aria-label="Google">   <FaGoogle />     </a>
              <a href="#" aria-label="Facebook"> <FaFacebookF />  </a>
              <a href="#" aria-label="Github">   <FaGithub />     </a>
              <a href="#" aria-label="LinkedIn"> <FaLinkedinIn /> </a>
            </div>

            <p className="text">or use your email &amp; password</p>

            {/* Email */}
            <div className="field-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={loginData.email}
                onChange={handleLoginChange}
                className={loginErrors.email ? "input-error" : ""}
              />
              {loginErrors.email && (
                <span className="error-msg">{loginErrors.email}</span>
              )}
            </div>

            {/* Password */}
            <div className="field-group">
              <div className="password-box">
                <input
                  type={showLoginPwd ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  className={loginErrors.password ? "input-error" : ""}
                />
                <span className="eye" onClick={() => setShowLoginPwd((v) => !v)}>
                  {showLoginPwd ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {loginErrors.password && (
                <span className="error-msg">{loginErrors.password}</span>
              )}
            </div>

            <a href="#" className="forgot" onClick={(e) => { e.preventDefault(); setIsForgotPwd(true); }}>Forgot Password?</a>
            <button type="submit" className="btn">SIGN IN</button>
          </form>
          )}
        </div>

        {/* ════════════ Sign Up Form ════════════ */}
        <div className="form-container register">
          <form onSubmit={handleRegisterSubmit} noValidate>
            <h1>Create Account</h1>

            <div className="social-icons">
              <a href="#" aria-label="Google">   <FaGoogle />     </a>
              <a href="#" aria-label="Facebook"> <FaFacebookF />  </a>
              <a href="#" aria-label="Github">   <FaGithub />     </a>
              <a href="#" aria-label="LinkedIn"> <FaLinkedinIn /> </a>
            </div>

            <p className="text">or use your email for registration</p>

            {/* Name */}
            <div className="field-group">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={regData.name}
                onChange={handleRegChange}
                className={regErrors.name ? "input-error" : ""}
              />
              {regErrors.name && (
                <span className="error-msg">{regErrors.name}</span>
              )}
            </div>

            {/* Email */}
            <div className="field-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={regData.email}
                onChange={handleRegChange}
                className={regErrors.email ? "input-error" : ""}
              />
              {regErrors.email && (
                <span className="error-msg">{regErrors.email}</span>
              )}
            </div>

            {/* Password */}
            <div className="field-group">
              <div className="password-box">
                <input
                  type={showRegPwd ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={regData.password}
                  onChange={handleRegChange}
                  className={regErrors.password ? "input-error" : ""}
                />
                <span className="eye" onClick={() => setShowRegPwd((v) => !v)}>
                  {showRegPwd ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {regErrors.password && (
                <span className="error-msg">{regErrors.password}</span>
              )}
            </div>



            <button type="submit" className="btn">LOGIN IN</button>
          </form>
        </div>

        {/* ════════════ Sliding Overlay ════════════ */}
        <div className="overlay-container">
          <div className="overlay">
            {!isLogin ? (
              <div className="overlay-content">
                <h1>Hello Friend!</h1>
                <p>Enter your personal details<br />and start your journey with us</p>
                <button className="ghost" onClick={goLogin}>SIGN IN</button>
              </div>
            ) : (
              <div className="overlay-content">
                <h1>Welcome Back!</h1>
                <p>Enter your personal details<br />to use all site features</p>
                <button className="ghost" onClick={goRegister}>SIGN UP</button>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Auth;