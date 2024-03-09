import React, { useState } from "react";
import classes from "./StartQuiz.module.css";

function StartQuiz() {
  return (
    <div className={classes.StartQuiz}>
      <div className={classes.quote}>
        Welcome to our engaging quiz platform! Test your knowledge, challenge
        yourself, and explore a myriad of topics. Our quizzes not only provide
        you with scores but also serve as a learning opportunity, unraveling the
        mysteries of the unknown. Whether you're a seasoned learner or just
        getting started, each question is a chance to broaden your
        understanding. Join us on this journey of curiosity, discovery, and
        continuous learning. Let the joy of exploring new subjects fuel your
        quest for knowledge!
      </div>
      <button className={classes.button}>Start Quiz </button>
    </div>
  );
}

export default StartQuiz;
