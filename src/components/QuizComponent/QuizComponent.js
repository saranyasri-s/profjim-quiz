import React, { useState, useEffect } from "react";
// apikey
import apikeyy from "../../openai";
// css
import classes from "./QuizComponent.module.css";

// redux
import { useDispatch, useSelector } from "react-redux";
import { setQuestions, clearQuestions } from "../../store/questionsSlice";
import { setAnswerFeedback } from "../../store/answerSlice";

function QuizComponent() {
  let questions = useSelector((state) => state.questions);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const selectedSubject = useSelector((state) => state.subject);
  //
  const [studentaAnswer,setStudentAnswer]=useState("5")
  const [buttonStatus, setButtonStatus] = useState("Submit");
  const [finalScore, setFinalScore] = useState(0);
  const [score, setScore] = useState(0);
  const [qnIndex, setQnIndex] = useState(0);
  const [presentLevel, setPresentLevel] = useState("easy");
  const [feedbackforAnswer, setFeedbackforAnswer] = useState(false);
  const [hintforAnswer, setHintforAnswer] = useState(false);
  const [feedbackForLevelComplete, setFeedbackForLevelComplete] =
    useState(true);
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
      } catch (error) {
        console.error("Error sending message:", error);
      } finally {
        setLoading(false);
      }
    };
    handleGetQnsListinJsonFormat();
  }, []);


  const handleSubmit=()=>{
    setButtonStatus("Next")
if(questions.questionsList[presentLevel][qnIndex].answer==studentaAnswer){
    setAnswerFeedback(true)
}else{
    setHintforAnswer(true)   
}
  } 
  const handleNext=()=>{
    setButtonStatus("Submit");
    setAnswerFeedback(false);
    setHintforAnswer(false);
    setQnIndex(prev=>prev+1)
  } 
  return (
    <div className={classes.quizComponent}>
      <h1> Its your quiz time!</h1>
      <p style={{ textDecoration: "underline", fontSize: "1.5rem" }}>
        Lets start the quiz
      </p>
      <h2> Subject: {selectedSubject}</h2>
      {loading ? <p>Loading the quiz question</p> : null}

      {questions.questionsList && (
        <div>
          <p>Question:</p>
          <p>{questions.questionsList[presentLevel][qnIndex].question}</p>
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
          )}{" "}
        </div>
      )}

      {buttonStatus === "Submit" ? (
        <button className={classes.button} onClick={handleSubmit}>Submit</button>
      ) : (
        <button className={classes.button} onClick={handleNext}>Next</button>
      )}
    </div>
  );
}

export default QuizComponent;
