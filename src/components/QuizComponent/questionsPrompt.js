const questionsPrompt = `Create a correct JSON structure without backticks in start and end,  named questionsList that contains three difficulty levels (easy, medium, and hard) of mathematics questions for primary-level students. The questionsList should have a total of 30 questions,10 easy questions, 10 medium questions, and 10 hard questions.

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
}, 
please very strictly give  all the 30 questions to conduct the quiz in json format, 10 in easy , 10 in medium, 10 in hard`;

export default questionsPrompt;
