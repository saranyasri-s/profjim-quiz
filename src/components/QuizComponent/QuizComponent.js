import React, { useState, useEffect } from "react";
// apikey
import apikeyy from "../../openai";
// css
import classes from "./QuizComponent.module.css";
import LinearProgress from "@mui/material/LinearProgress";
// redux
import { useDispatch, useSelector } from "react-redux";
import { setQuestions, clearQuestions } from "../../store/questionsSlice";

import { setScores } from "../../store/scoresSlice";

import PieChart from "../Pie/PieChart";
function QuizComponent() {
  let questions = useSelector((state) => state.questions);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const selectedSubject = useSelector((state) => state.subject);
  const scores = useSelector((state) => state.scores);
  //
  const [studentAnswer, setStudentAnswer] = useState("");
  const [buttonStatus, setButtonStatus] = useState("Submit");
  const [finalScore, setFinalScore] = useState(0);
  const [score, setScore] = useState(0);
  const [qnIndex, setQnIndex] = useState(0);
  const [presentLevel, setPresentLevel] = useState("easy");
  const [feedbackforAnswer, setFeedbackforAnswer] = useState(false);
  const [hintforAnswer, setHintforAnswer] = useState(false);
  const [feedbackForEasyLevelComplete, setFeedbackForEasyLevelComplete] =
    useState(0);
  const [feedbackForEasyLevelFailure, setFeedbackForEasyLevelFailure] =
    useState(0);
  const [feedbackForMediumLevelComplete, setFeedbackForMediumLevelComplete] =
    useState(0);
  const [feedbackForMediumLevelFailure, setFeedbackForMediumLevelFailure] =
    useState(0);
  const [feedbackForHardLevelComplete, setFeedbackForHardLevelComplete] =
    useState(0);
  const [feedbackForHardLevelFailure, setFeedbackForHardLevelFailure] =
    useState(0);

  //
  useEffect(() => {
    const handleGetQnsListinJsonFormat = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://api.openai.com/v1/chat/completions",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: apikeyy,
            },
            body: JSON.stringify({
              messages: [
                {
                  role: "system",
                  content: `Create a correct JSON structure without backticks in start and end,  named questionsList that contains three difficulty levels (easy, medium, and hard) of mathematics questions for primary-level students. The questionsList should have a total of 30 questions,10 easy questions, 10 medium questions, and 10 hard questions.

                  For each difficulty level, generate the specified number of questions with the following details:
                  - Subject: ${selectedSubject}
                  - The question itself
                  - Options 
                  - Correct answer
                  - Feedback for a correct answer
                  - Hint for a wrong answer
                  
                  Additionally, provide feedback messages for failures and successes at each difficulty level. Ensure that feedback messages are tailored for primary-level students.
                  
                  Use the following structure as a reference:
                  {
                    'easy': [
                      {
                        'Subject': 'Mathematics',
                        'question': 'What is 5 + 3?',
                        'options': [6, 7, 8],
                        'answer': 8,
                        'feedbackForCorrectAnswer': 'Great job! You got it right!',
                        'hintForWrongAnswer': 'Count the numbers together to find the sum.'
                      },
                      
                    ],
                    'medium': [
                      {
                        'Subject': 'Mathematics',
                        'question': 'What is 12 x 3?',
                        'options': [30, 36, 40],
                        'answer': 36,
                        'feedbackForCorrectAnswer': 'Amazing! You nailed multiplication.',
                        'hintForWrongAnswer': 'Multiply the two numbers to find the product.'
                      },
                      
                    ],
                    'hard': [
                      {
                        'Subject': 'Mathematics',
                        'question': 'Solve for x: 2x + 5 = 15',
                        'options': [5, 7, 10],
                        'answer': 5,
                        'feedbackForCorrectAnswer': 'Incredible! You solved the equation.',
                        'hintForWrongAnswer': 'Subtract 5 from both sides and then divide by 2 to find x.'
                      },
                    
                    ],
                    'feedbackForEasyLevelFailure': 'Don't worry, practice makes perfect! Try again.',
                    'feedbackForMediumLevelFailure': 'It's okay, learning takes time. Give it another shot.',
                    'feedbackForHardLevelFailure': 'Keep trying! You're building a strong math foundation.',
                    'feedbackForEasyLevelSuccess': 'Awesome job! You've mastered the easy questions.',
                    'feedbackForMediumLevelSuccess': 'Great work! You're getting the hang of the medium-level questions.',
                    'feedbackForHardLevelSuccess': 'You're doing incredible! You've conquered the hard questions.'
                  }, 
                  please very strictly give  all the 30 questions to conduct the quiz in json format, 10 in easy , 10 in medium, 10 in hard`,
                },
              ],
              model: "gpt-3.5-turbo",
            }),
          }
        );

        const data = await response.json();
        // console.log(data.choices[0].message.content);

        let r = data.choices[0].message.content;
        // console.log(r, "before parsing");
        r = JSON.parse(r);
        // console.log(r, "parsed");
        dispatch(setQuestions(r));
        setLoading(false);
      } catch (error) {
        console.error("Error sending message:", error);
      } finally {
        setLoading(false);
      }
    };
    handleGetQnsListinJsonFormat();
  }, []);

  const handleSubmit = () => {
    setFeedbackForEasyLevelComplete(0);
    setFeedbackForEasyLevelFailure(0);
    setFeedbackForMediumLevelComplete(0);
    setFeedbackForMediumLevelFailure(0);
    setFeedbackForHardLevelComplete(0);
    setFeedbackForHardLevelFailure(0);

    setButtonStatus("Next");
    if (
      questions.questionsList[presentLevel][qnIndex].answer == studentAnswer
    ) {
      console.log("correct");
      setFeedbackforAnswer(true);
      setScore((prev) => prev + 1);
    } else {
      setHintforAnswer(true);
    }
  };
  //   const handleNext = () => {
  //     setFeedbackforAnswer(false);
  //     setHintforAnswer(false);
  //     if (qnIndex == 4 && score >= 3) {
  //       setFeedbackForEasyLevelComplete(true);
  //     } else if (qnIndex == 4 && score < 3) {
  //       setFeedbackForEasyLevelFailure(true);
  //     }
  //     if (qnIndex == 9 && score >= 3) {
  //       setFeedbackForEasyLevelComplete(true);
  //     } else if (qnIndex == 9 && score < 3) {
  //       setFeedbackForEasyLevelFailure(true);
  //     } else {
  //       setButtonStatus("Submit");

  //       setQnIndex((prev) => prev + 1);
  //     }
  //   };
  const handleNext = () => {
    setFeedbackforAnswer(false);
    setHintforAnswer(false);
    setFeedbackForEasyLevelComplete(0);
    setFeedbackForEasyLevelFailure(0);
    setFeedbackForMediumLevelComplete(0);
    setFeedbackForMediumLevelFailure(0);
    setFeedbackForHardLevelComplete(0);
    setFeedbackForHardLevelFailure(0);
    // Check if the current level is easy and index is 4
    if (presentLevel === "easy" && qnIndex === 4) {
      if (score >= 3) {
        console.log(score);
        setFeedbackForEasyLevelComplete(1);
        dispatch(setScores({ level: "easy", score: score, qns: 5 }));
        setQnIndex(0);
        setButtonStatus("Submit");
        setPresentLevel("medium");
        setScore(0);
      } else {
        console.log(score);
        setFeedbackForEasyLevelFailure(1);
        dispatch(setScores({ level: "easy", score: score, qns: 5 }));
        setQnIndex(5);
        setScore(0);
        setButtonStatus("Submit");
      }
    } else if (presentLevel === "medium" && qnIndex === 4) {
      if (score >= 3) {
        console.log(score);
        setFeedbackForMediumLevelComplete(1);
        dispatch(setScores({ level: "medium", score: score, qns: 5 }));
        setQnIndex(0);
        setButtonStatus("Submit");
        setPresentLevel("hard");
        setScore(0);
      } else {
        console.log(score);
        setFeedbackForMediumLevelFailure(1);
        dispatch(setScores({ level: "medium", score: score, qns: 5 }));
        setQnIndex(5);
        setScore(0);
        setButtonStatus("Submit");
      }
    } else if (presentLevel === "hard" && qnIndex === 4) {
      if (score >= 3) {
        console.log(score);
        setFeedbackForHardLevelComplete(1);
        dispatch(setScores({ level: "hard", score: score, qns: 5 }));
        dispatch(clearQuestions());
        setQnIndex(0);
        setScore(0);
        setButtonStatus("Submit");
      } else {
        console.log(score);
        setFeedbackForHardLevelFailure(1);
        dispatch(setScores({ level: "hard", score: score, qns: 5 }));
        setQnIndex(5);
        setScore(0);
        setButtonStatus("Submit");
      }
    } else if (presentLevel === "easy" && qnIndex === 9) {
      // Switch to the next level
      if (score >= 3) {
        console.log(score);
        setFeedbackForEasyLevelComplete(2);
        dispatch(
          setScores({
            level: "easy",
            score: score + scores.easy.score,
            qns: 10,
          })
        );
        setQnIndex(0);
        setButtonStatus("Submit");
        setPresentLevel("medium");
      } else {
        console.log(score);
        setFeedbackForEasyLevelFailure(2);
        dispatch(
          setScores({
            level: "easy",
            score: score + scores.easy.score,
            qns: 10,
          })
        );
        dispatch(clearQuestions());
      }
    } else if (presentLevel === "medium" && qnIndex === 9) {
      if (score >= 3) {
        console.log(score);
        setFeedbackForMediumLevelComplete(2);
        dispatch(
          setScores({
            level: "medium",
            score: score + scores.medium.score,
            qns: 10,
          })
        );
        setQnIndex(0);
        setButtonStatus("Submit");
        setPresentLevel("hard");
      } else {
        console.log(score);
        setFeedbackForMediumLevelFailure(2);
        dispatch(
          setScores({
            level: "medium",
            score: score + scores.medium.score,
            qns: 10,
          })
        );
        dispatch(clearQuestions());
      }
      // Reset the index
    } else if (presentLevel === "hard" && qnIndex === 9) {
      if (score >= 3) {
        console.log(score);
        setFeedbackForHardLevelComplete(2);
        dispatch(
          setScores({
            level: "hard",
            score: score + scores.hard.score,
            qns: 10,
          })
        );
        dispatch(clearQuestions());
        setQnIndex(0);
        setButtonStatus("Submit");
      } else {
        console.log(score);
        setFeedbackForHardLevelFailure(2);
        dispatch(
          setScores({
            level: "hard",
            score: score + scores.hard.score,
            qns: 10,
          })
        );
        dispatch(clearQuestions());
      }
      // Reset the index
    } else {
      setButtonStatus("Submit");

      setQnIndex((prev) => prev + 1);
    }
  };
  const handleAnswerSelection = (selectedAnswer) => {
    setStudentAnswer(selectedAnswer);
  };
  return (
    <div className={classes.quizComponent}>
      <h1> Its your quiz time!</h1>

      <h2> Subject: {selectedSubject}</h2>
      {loading ? (
        <div style={{ width: "100%", marginTop: "20px" }}>
          <LinearProgress color="primary" />
          <p>Loading the quiz questions</p>
        </div>
      ) : null}

      {questions.questionsList ? (
        <div>
          {feedbackForEasyLevelComplete == 1 ? (
            <p
              style={{
                color: "#4CAF50",
                fontStyle: "Italic",
                fontWeight: "700",
                textAlign: "center",
                padding: "0.7rem",
                backgroundColor: "#51ee5114",
              }}
            >
              Fantastic! You have completed the easy level, now is your medium
              level
            </p>
          ) : null}
          {feedbackForEasyLevelFailure === 1 ? (
            <p
              style={{
                color: "red",
                fontStyle: "Italic",
                fontWeight: "700",
                textAlign: "center",
                padding: "1rem",
                backgroundColor: "#ff00000a",
              }}
            >
              {" "}
              Sorry! You failed the easy level, Please try again with next 5
              questions as last attempt
            </p>
          ) : null}

          {feedbackForMediumLevelComplete == 1 ? (
            <p
            style={{
                color: "#4CAF50",
                fontStyle: "Italic",
                fontWeight: "700",
                textAlign: "center",
                padding: "0.7rem",
                backgroundColor: "#51ee5114",
              }}
            >
              {" "}
              Fantastic! You have completed the medium level, now is your hard
              level
            </p>
          ) : null}
          {feedbackForMediumLevelFailure === 1 ? (
            <p
              style={{
                color: "red",
                fontStyle: "Italic",
                fontWeight: "700",
                textAlign: "center",
                padding: "1rem",
                backgroundColor: "#ff00000a",
              }}
            >
              {" "}
              Sorry! You failed the medium level, Please try again with next 5
              questions as last attempt
            </p>
          ) : null}

          {feedbackForHardLevelFailure === 1 ? (
            <p
              style={{
                color: "red",
                fontStyle: "Italic",
                fontWeight: "700",
                textAlign: "center",
                padding: "1rem",
                backgroundColor: "#ff00000a",
              }}
            >
              {" "}
              Sorry! You failed the Hard level, Please try again with next 5
              questions as last attempt
            </p>
          ) : null}

          <p
            style={{
              textTransform: "capitalize",
              textAlign: "center",
              color: "#006cff",
              fontSize: "1.4rem",
              fontWeight: "700",
            }}
          >
            {presentLevel} level{" "}
          </p>
          <p className={classes.questionNumber}>Question: {qnIndex + 1}</p>
          <p
            style={{
              color: "grey",
              fontSize: "1.4rem",
            }}
          >
            {questions.questionsList[presentLevel][qnIndex].question}
          </p>
          {questions.questionsList[presentLevel][qnIndex].options.map(
            (option) => (
              <label>
                <input
                  type="radio"
                  name="answer"
                  value="option"
                  checked={studentAnswer === option}
                  onChange={() => handleAnswerSelection(option)}
                />
                {option}
              </label>
            )
          )}
          {feedbackforAnswer && (
            <p style={{ color: "blue", fontStyle: "Italic" }}>
              {
                questions.questionsList[presentLevel][qnIndex]
                  .feedbackForCorrectAnswer
              }
            </p>
          )}
          {hintforAnswer && (
            <p style={{ color: "red", fontStyle: "Italic" }}>
              {
                questions.questionsList[presentLevel][qnIndex]
                  .hintForWrongAnswer
              }
            </p>
          )}

          {buttonStatus === "Submit" ? (
            <button className={classes.button} onClick={handleSubmit}>
              Submit
            </button>
          ) : (
            <button className={classes.button} onClick={handleNext}>
              Next
            </button>
          )}
        </div>
      ) : null}
      {feedbackForHardLevelComplete ? (
        <p               style={{
            color: "#4CAF50",
            fontStyle: "Italic",
            fontWeight: "700",
            textAlign: "center",
            padding: "0.7rem",
            backgroundColor: "#51ee5114",
          }}>
          Fantastic! You have completed the Hard level
        </p>
      ) : null}
      {feedbackForHardLevelFailure === 2 ? (
        <p
          style={{
            color: "red",
            fontStyle: "Italic",
            fontWeight: "700",
            textAlign: "center",
            padding: "1rem",
            backgroundColor: "#ff00000a",
          }}
        >
          {" "}
          Sorry! You failed at the Hard level twice, please learn the concepts
          in depth and try later
        </p>
      ) : null}
      {feedbackForMediumLevelFailure === 2 ? (
        <p
          style={{
            color: "red",
            fontStyle: "Italic",
            fontWeight: "700",
            textAlign: "center",
            padding: "1rem",
            backgroundColor: "#ff00000a",
          }}
        >
          {" "}
          Sorry! You failed at the medium level twice, please learn the basics
          and try later
        </p>
      ) : null}
      {feedbackForEasyLevelFailure === 2 ? (
        <p
          style={{
            color: "red",
            fontStyle: "Italic",
            fontWeight: "700",
            textAlign: "center",
            padding: "1rem",
            backgroundColor: "#ff00000a",
          }}
        >
          Sorry! You failed at the easy level twice, please learn the basics and
          try later
        </p>
      ) : null}
      {console.log(scores, "scores")}
      {feedbackForHardLevelComplete ||
      feedbackForHardLevelFailure === 2 ||
      feedbackForMediumLevelFailure === 2 ||
      feedbackForEasyLevelFailure === 2 ? (
        <div>
          <h2> Your Scores </h2>
          <div className={classes.results}>
            <PieChart
              level={"Easy level score"}
              labels={["correct", "incorrect"]}
              data={[scores.easy.score, scores.easy.qns - scores.easy.score]}
            ></PieChart>
            <PieChart
              level={"Medium level score"}
              labels={["correct", "incorrect"]}
              data={[
                scores.medium.score,
                scores.easy.qns - scores.medium.score,
              ]}
            ></PieChart>
            <PieChart
              level={"Hard level score"}
              labels={["correct", "incorrect"]}
              data={[scores.hard.score, scores.hard.qns - scores.hard.score]}
            ></PieChart>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default QuizComponent;
