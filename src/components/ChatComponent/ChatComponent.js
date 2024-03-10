import React, { useState, useEffect } from "react";
// apikey
import apikeyy from "../../openai";
// css
import classes from "./ChatComponent.module.css";

// redux
import { useDispatch, useSelector } from "react-redux";
import { setQuestions, clearQuestions } from "../../store/questionsSlice";
import { setAnswerFeedback, clearFeedback } from "../../store/answerSlice";
import { setFinalFeedback } from "../../store/finalFeedback";
import { setAllQuestions } from "../../store/answersForAllQns";


const ChatComponent = () => {
  let finalFeedback = useSelector((state) => state.finalFeedback);
  let answerforallQns = useSelector((state) => state.answerForAllQns);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const feedbackForAnswer = useSelector((state) => state.answerFeedback);
  let questions = useSelector((state) => state.questions);
  const maxIndex = questions.length - 1;
  const selectedSubject = useSelector((state) => state.subject);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [buttonStatus, setButtonStatus] = useState("Submit");

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
                  content: `Create a JSON structure named questionsList that contains three difficulty levels (easy, medium, and hard) of mathematics questions for primary-level students. The questionsList should have a total of 21 easy questions, 15 medium questions, and 9 hard questions.

                  For each difficulty level, generate the specified number of questions with the following details:
                  - Subject: 'Mathematics'
                  - The question itself
                  - Options (an array of 3 integers)
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
                      // ... (more easy questions up to a total of 21)
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
                      // ... (more medium questions up to a total of 15)
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
                      // ... (more hard questions up to a total of 9)
                    ],
                    'feedbackForEasyLevelFailure': 'Don't worry, practice makes perfect! Try again.',
                    'feedbackForMediumLevelFailure': 'It's okay, learning takes time. Give it another shot.',
                    'feedbackForHardLevelFailure': 'Keep trying! You're building a strong math foundation.',
                    'feedbackForEasyLevelSuccess': 'Awesome job! You've mastered the easy questions.',
                    'feedbackForMediumLevelSuccess': 'Great work! You're getting the hang of the medium-level questions.',
                    'feedbackForHardLevelSuccess': 'You're doing incredible! You've conquered the hard questions.'
                  }`,
                },
                {
                  role: "user",
                  content: input,
                },
              ],
              model: "gpt-3.5-turbo",
            }),
          }
        );

        const data = await response.json();
        // console.log(data.choices[0].message.content);

        let r = data.choices[0].message.content;
        r = JSON.parse(r);
        console.log(r);
        dispatch(setQuestions(r));
      } catch (error) {
        console.error("Error sending message:", error);
      } finally {
        setLoading(false);
      }
    };
    handleGetQnsListinJsonFormat();
  }, []);

  const handleSendMessage = async () => {
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
                content: `you are a teacher, you have to conduct a quiz for primary school student, check the answer of this question ${currentQuestion.question}, answer by the student is ${selectedAnswer} and give feedback as correct if correct, and hints if wrong for learning in the following format {correctness:"yes", feedback:"good"} in json format`,
              },
              {
                role: "user",
                content: input,
              },
            ],
            model: "gpt-3.5-turbo",
          }),
        }
      );

      const data = await response.json();
      //   console.log(data.choices[0].message.content);

      let r = data.choices[0].message.content;
      r = JSON.parse(r);
      //   console.log(r);

      dispatch(setAnswerFeedback(r));
      let newQuestions = [...questions];
      if (r.correctness === "yes") {
        let selectedQnWithAnswer = {
          ...newQuestions[currentIndex],
          studentAnswer: 1,
        };

        dispatch(setAllQuestions(selectedQnWithAnswer));
      } else if (r.correctness === "no") {
        let selectedQnWithAnswer = {
          ...newQuestions[currentIndex],
          studentAnswer: 0,
        };

        dispatch(setAllQuestions(selectedQnWithAnswer));
      }

      setButtonStatus("Next");
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelection = (selectedAnswer) => {
    setSelectedAnswer(selectedAnswer);
  };

  const currentQuestion = questions[currentIndex];

  const getNextQuestion = () => {
    // console.log(currentIndex);
    if (currentIndex < questions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      alert("over");
    }
    dispatch(clearFeedback());
  };
  const handleFinalSubmit = async () => {
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
                content: `As ChatGPT, I am tasked with evaluating a student quiz in a specific grade. The questions are presented in the following format:

                {
                  "question": "The question in string format",
                  "options": ["Choice 1", "Choice 2", ..., "Choice N"],
                  "topic": "Subtopic related to the subject",
                  "difficultyLevel": "Easy/Medium/Hard",
                  "studentAnswer": 0 or 1 (0 indicates a wrong answer, 1 indicates a correct answer)
                }
                
                My role involves offering feedback, covering both positive and negative aspects of the student's performance. Additionally, I am expected to recommend another set of 3 questions based on the student's proficiency in a specific topic and the difficulty level of the questions. The student's score is determined by tallying the number of correct and incorrect answers, and the results are provided in a JSON object.
                list of all questions with answer status is ${JSON.stringify(
                  answerforallQns
                )}
                Please provide the feedback and recommendations of topic to study further and improve, along with the calculated score, in the specified JSON format.
                {feedback:"",recommendations;"",score:"'} in json format,score is the sum of studentAnswer property from  ${JSON.stringify(
                  answerforallQns
                )}, feedback should be string and no nested objects needed`,
              },
              {
                role: "user",
                content: input,
              },
            ],
            model: "gpt-3.5-turbo",
          }),
        }
      );

      const data = await response.json();

      let r = data.choices[0].message.content;
      r = JSON.parse(r);
      //   console.log(r);
      setLoading(false);
      dispatch(setFinalFeedback(r));
      //   dispatch(clearQuestions());
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    // <div className={classes.ChatComponent}>
    //   {/* {console.log(answerforallQns)} */}
    //   <h1> Its your quiz time!</h1>
    //   <p style={{ textDecoration: "underline", fontSize: "1.5rem" }}>
    //     {" "}
    //     Lets start the quiz
    //   </p>
    //   <h2> Subject: {selectedSubject}</h2>
    //   <div className={classes.messages}>
    //     {messages.map((message, index) => (
    //       <div key={index} className={classes.msg}>
    //         {message.content}
    //       </div>
    //     ))}
    //     {questions.length ? (
    //       <div>
    //         {/* <p>Select the correct answer among the choices given</p> */}
    //         <div>
    //           <p style={{ fontSize: "1.3rem" }}>{currentQuestion?.question}</p>
    //           {currentQuestion?.options.map((option) => (
    //             <label>
    //               <input
    //                 type="radio"
    //                 name="answer"
    //                 value="option"
    //                 checked={selectedAnswer === option}
    //                 onChange={() => handleAnswerSelection(option)}
    //               />
    //               {option}
    //             </label>
    //           ))}
    //           {/* {console.log(feedbackForAnswer)} */}
    //           <p
    //             style={{
    //               color: "blue",
    //               fontStyle: "Italic",
    //               padding: "1rem",
    //               textTransform: "capitalize",
    //             }}
    //           >
    //             {feedbackForAnswer.feedback}
    //           </p>
    //           {/* {console.log(finalFeedback)} */}
    //           {finalFeedback && currentIndex > maxIndex ? (
    //             <div className={classes.feedback}>
    //               <p>Score: {finalFeedback.score}</p>
    //               <p>Feedback: {finalFeedback.feedback}</p>
    //               <p>Recommendations: {finalFeedback.recommendations}</p>
    //             </div>
    //           ) : null}
    //           {currentIndex > maxIndex ? (
    //             <button
    //               className={classes.button}
    //               style={{ width: "200px" }}
    //               onClick={handleFinalSubmit}
    //               disabled={loading}
    //             >
    //               {loading ? "Loading..." : "Final submit and score"}
    //             </button>
    //           ) : feedbackForAnswer.feedback ? (
    //             <button
    //               className={classes.button}
    //               onClick={getNextQuestion}
    //               disabled={loading}
    //             >
    //               Next
    //             </button>
    //           ) : (
    //             <button
    //               className={classes.button}
    //               onClick={handleSendMessage}
    //               disabled={loading}
    //             >
    //               {loading ? "Loading..." : "Submit"}
    //             </button>
    //           )}
    //         </div>
    //       </div>
    //     ) : (
    //       <p> Please wait, fetching the questions</p>
    //     )}
    //   </div>
    // </div>

    <div>
      <p>qns</p>
      {console.log(questions)}
    </div>
  );
};

export default ChatComponent;
