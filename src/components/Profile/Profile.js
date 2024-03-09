import React from "react";
import classes from "./Profile.module.css";
import { UseSelector, useSelector } from "react-redux";
const Profile = () => {
  const name = useSelector((state) => state.user.displayName);
  return (
    <div className={classes.Profile}>
      <p style={{ textTransform: "capitalize" }}>Name: {name} </p>
    </div>
  );
};

export default Profile;
