import React, { useState, useEffect } from "react";
// apikey
import apikeyy from "../../openai";
// css
import classes from "./ChatComponent.module.css";

// redux
import { useDispatch, useSelector } from "react-redux";
import { setQuestions } from "../../store/questionsSlice";
import { setAnswerFeedback, clearFeedback } from "../../store/answerSlice";
import { setAllQuestions } from "../../store/answersForAllQns";
const ChatComponent = () => {
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
                  content: `you are a teacher, you have to conduct a quiz for primary school student, please provide a array of 5 questions in ${selectedSubject} covering 3 topics, 4 qns in each topic in the following format {question:"what is 3+4", options:[1,2,7], topic:"addition",difficultyLevel:"easy", studentAnswer:0}, please npote give the array witount any explanations ,just the array in json format`,
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
        dispatch(setQuestions(r));
      } catch (error) {
        console.error("Error sending message:", error);
      } finally {
        setLoading(false);
      }
    };
    handleGetQnsListinJsonFormat();
  }, []);
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

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
      console.log(r);

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
    if (currentIndex < questions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      alert("quiz is over");
    }
    dispatch(clearFeedback());
  };
  return (
    <div className={classes.ChatComponent}>
      {console.log(answerforallQns)}
      <h1> Its your quiz time!</h1>
      <h3> Lets start the quiz</h3>
      <h4> Subject: {selectedSubject}</h4>
      <div className={classes.messages}>
        {messages.map((message, index) => (
          <div key={index} className={classes.msg}>
            {message.content}
          </div>
        ))}
        {questions.length ? (
          <div>
            <p>Select the correct answer among the choices given</p>
            <div>
              <p>{currentQuestion.question}</p>
              {currentQuestion.options.map((option) => (
                <label>
                  <input
                    type="radio"
                    name="answer"
                    value="option"
                    checked={selectedAnswer === option}
                    onChange={() => handleAnswerSelection(option)}
                  />
                  {option}
                </label>
              ))}
              {/* {console.log(feedbackForAnswer)} */}
              <p>{feedbackForAnswer.feedback}</p>
              {feedbackForAnswer.feedback ? (
                <button
                  className={classes.button}
                  onClick={getNextQuestion}
                  disabled={loading}
                >
                  Next
                </button>
              ) : (
                <button
                  className={classes.button}
                  onClick={handleSendMessage}
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Submit"}
                </button>
              )}
            </div>
          </div>
        ) : (
          <p> Please wait, fetching the questions</p>
        )}
      </div>
    </div>
  );
};

export default ChatComponent;
