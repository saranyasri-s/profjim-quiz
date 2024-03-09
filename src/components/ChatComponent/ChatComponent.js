import React, { useState } from "react";
// apikey
import apikeyy from "../../openai";
// css
import classes from "./ChatComponent.module.css";
// redux
import { useDispatch, useSelector } from "react-redux";
const ChatComponent = () => {
  const selectedSubject = useSelector((state) => state.subject);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

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
      </div>
      <div className={classes.answers}>
        <input type="text" value={input} onChange={handleInputChange} />
        <button
          className={classes.button}
          onClick={handleSendMessage}
          disabled={loading}
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default ChatComponent;
