import React, { useState } from "react";
// css
import classes from "./Auth.module.css";
// child component
import Login from "./Login/Login";
import SignUp from "./Signup/SignUp";

function Auth() {
  // based on authPage state, rendering signup or login page
  const [authPage, setAuthPage] = useState("Login");
  const handleAuthPageToSignUp = () => {
    setAuthPage("SignUp");
  };
  const handleAuthPageToLogin = () => {
    setAuthPage("Login");
  };
  return (
    <div className={classes.Auth}>
      <button
        className={classes.authbutton}
        onClick={
          authPage === "Login" ? handleAuthPageToSignUp : handleAuthPageToLogin
        }
      >
        {authPage === "Login" ? "Create Account" : "Login"}
      </button>
      <div className={classes.loginSignUp}>
        {authPage === "Login" ? (
          <Login></Login>
        ) : (
          <SignUp handleAuthPageToLogin={handleAuthPageToLogin}></SignUp>
        )}
      </div>
    </div>
  );
}

export default Auth;
