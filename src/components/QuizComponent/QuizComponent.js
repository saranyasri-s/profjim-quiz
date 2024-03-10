import React, { useState, useEffect } from "react";
// apikey
import apikeyy from "../../openai";
// css
import classes from "./QuizComponent.module.css";

// redux
import { useDispatch, useSelector } from "react-redux";
import { setQuestions, clearQuestions } from "../../store/questionsSlice";
const jsonString = JSON.stringify({
  easy: [
    {
      Subject: "Mathematics",
      question: "What is 5 + 3?",
      options: [6, 7, 8],
      answer: 8,
      feedbackForCorrectAnswer: "Great job! You got it right!",
      hintForWrongAnswer: "Count the numbers together to find the sum.",
    },
    // ... (more questions for 'easy' level)
  ],
  medium: [
    {
      Subject: "Mathematics",
      question: "What is 12 x 3?",
      options: [30, 36, 40],
      answer: 36,
      feedbackForCorrectAnswer: "Amazing! You nailed multiplication.",
      hintForWrongAnswer: "Multiply the two numbers to find the product.",
    },
    // ... (more questions for 'medium' level)
  ],
  hard: [
    {
      Subject: "Mathematics",
      question: "Solve for x: 2x + 5 = 15",
      options: [5, 7, 10],
      answer: 5,
      feedbackForCorrectAnswer: "Incredible! You solved the equation.",
      hintForWrongAnswer:
        "Subtract 5 from both sides and then divide by 2 to find x.",
    },
    // ... (more questions for 'hard' level)
  ],
  feedbackForEasyLevelFailure:
    "Don't worry, practice makes perfect! Try again.",
  feedbackForMediumLevelFailure:
    "It's okay, learning takes time. Give it another shot.",
  feedbackForHardLevelFailure:
    "Keep trying! You're building a strong math foundation.",
  feedbackForEasyLevelSuccess:
    "Awesome job! You've mastered the easy questions.",
  feedbackForMediumLevelSuccess:
    "Great work! You're getting the hang of the medium-level questions.",
  feedbackForHardLevelSuccess:
    "You're doing incredible! You've conquered the hard questions.",
});
console.log(jsonString);
function QuizComponent() {
  let questions = useSelector((state) => state.questions);
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
                  content: `Create a JSON structure named questionsList that contains three difficulty levels (easy, medium, and hard) of mathematics questions for primary-level students. The questionsList should have a total of 21 easy questions, 15 medium questions, and 9 hard questions.

                  For each difficulty level, generate the specified number of questions with the following details:
                  - Subject: 'Mathematics'
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
                  }, give all 45 questions to conduct the quiz`,
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
  return (
    <div className={classes.quizComponent}>
      <p>qns</p>
      {loading ? <p>Loading</p> : <p>Over</p>}
      {console.log(questions)}
    </div>
  );
}

export default QuizComponent;
