import React, { useState, useEffect } from "react";
// apikey
import apikeyy from "../../openai";
// css
import classes from "./ChatComponent.module.css";

// redux
import { useDispatch, useSelector } from "react-redux";
import { setQuestions } from "../../store/questionsSlice";
const ChatComponent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const questions = useSelector((state) => state.questions);
  const maxIndex = questions.length - 1;
  const selectedSubject = useSelector((state) => state.subject);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

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
                  content: `you are a teacher, you have to conduct a quiz for primary school student, please provide a array of 12 questions covering 3 topics, 4 qns in each topic in the following format {question:"what is 3+4", options:[1,2,7], topic:"addition",difficultyLevel:"easy", studentAnswer:0}, please npote give the array witount any explanations ,just the array in json format`,
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
        console.log(data.choices[0].message.content);

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
                content:
                  "As a teacher, you need to conduct a quiz for your students on the subject of science. The quiz consists of 10 questions with 4 options each. The questions are categorized into three levels: easy, hard, and difficult. If a student does not score enough marks in a particular level, the subsequent questions for that student will be of the same level until they achieve a satisfactory score. Additionally, each question is accompanied by feedback and a hint to assist the student.",
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
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: "assistant",
          content: data.choices[0].message.content,
        },
      ]);

      setInput("");
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

  return (
    <div className={classes.ChatComponent}>
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
            </div>
          </div>
        ) : (
          <p> Please wait, fetching the questions</p>
        )}
      </div>
      <div className={classes.answers}>
        {/*  <form>
          {questions[currentIndex].options.map((option, index) => (
            <div key={index}>
              <input
                type="radio"
                id={`option${index}`}
                name="answer"
                value={option}
                onChange={() => handleAnswerSelection(option)}
                checked={studentAnswer === option}
              />
              <label htmlFor={`option${index}`}>{option}</label>
            </div>
          ))}
        </form> */}
        <button
          className={classes.button}
          onClick={handleSendMessage}
          disabled={loading}
        >
          {loading ? "Loading..." : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default ChatComponent;
