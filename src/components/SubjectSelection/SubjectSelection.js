import React, { useState } from "react";
// css
import classes from "./SubjectSelection.module.css";
// redux
import { useDispatch, useSelector } from "react-redux";
import { setSubject } from "../../store/subjectSlice";
// router
import { useNavigate } from "react-router-dom";

function SubjectSelection() {
  const selectedSubject = useSelector((state) => state.subject);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubjectChange = (event) => {
    dispatch(setSubject(event.target.value));
  };

  return (
    <div className={classes.subject}>
      <div className={classes.SubjectSelection}>
        <p>Select a Subject:</p>

        <label>
          <input
            type="radio"
            name="subject"
            value="Maths"
            checked={selectedSubject === "Maths"}
            onChange={handleSubjectChange}
          />
          Maths
        </label>

        <label>
          <input
            type="radio"
            name="subject"
            value="Science"
            checked={selectedSubject === "Science"}
            onChange={handleSubjectChange}
          />
          Science
        </label>

        <label>
          <input
            type="radio"
            name="subject"
            value="History"
            checked={selectedSubject === "History"}
            onChange={handleSubjectChange}
          />
          History
        </label>
      </div>
      <button
        onClick={() => {
          navigate("/quiz");
        }}
        className={classes.button}
      >
        Submit
      </button>
    </div>
  );
}

export default SubjectSelection;
