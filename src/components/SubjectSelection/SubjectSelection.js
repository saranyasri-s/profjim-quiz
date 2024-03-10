// import React, { useState } from "react";
// // css
// import classes from "./SubjectSelection.module.css";
// // redux
// import { useDispatch, useSelector } from "react-redux";
// import { setSubject } from "../../store/subjectSlice";
// // router
// import { useNavigate } from "react-router-dom";

// function SubjectSelection() {
//   const selectedSubject = useSelector((state) => state.subject);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleSubjectChange = (event) => {
//     dispatch(setSubject(event.target.value));
//   };

//   return (
//     <div className={classes.subject}>
//       <div className={classes.SubjectSelection}>
//         <p>Select a Subject:</p>

//         <label>
//           <input
//             type="radio"
//             name="subject"
//             value="Maths"
//             checked={selectedSubject === "Maths"}
//             onChange={handleSubjectChange}
//           />
//           Maths
//         </label>

//         <label>
//           <input
//             type="radio"
//             name="subject"
//             value="Science"
//             checked={selectedSubject === "Science"}
//             onChange={handleSubjectChange}
//           />
//           Science
//         </label>

//         <label>
//           <input
//             type="radio"
//             name="subject"
//             value="History"
//             checked={selectedSubject === "History"}
//             onChange={handleSubjectChange}
//           />
//           History
//         </label>
//       </div>
//       <button
//         onClick={() => {
//           navigate("/quiz");
//         }}
//         className={classes.button}
//       >
//         Submit
//       </button>
//     </div>
//   );
// }

// export default SubjectSelection;

import React from "react";
import {
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setSubject } from "../../store/subjectSlice";
import { useNavigate } from "react-router-dom";

import classes from "./SubjectSelection.module.css";

const subjects = ["Maths", "Science", "History"];

function SubjectSelection() {
  const selectedSubject = useSelector((state) => state.subject);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubjectChange = (event) => {
    dispatch(setSubject(event.target.value));
  };

  return (
    <div className={classes.subject}>
      <FormControl component="fieldset">
        <p>Select a Subject:</p>
        <RadioGroup
          row
          aria-label="subject"
          name="subject"
          value={selectedSubject}
          onChange={handleSubjectChange}
        >
          {subjects.map((subject) => (
            <FormControlLabel
              key={subject}
              value={subject}
              control={<Radio />}
              label={subject}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <div className={classes.buttonContainer}>
        <Button
          variant="contained"
          onClick={() => {
            navigate("/quiz");
          }}
          className={classes.button}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}

export default SubjectSelection;
