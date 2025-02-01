// Declare global variables
let currentQuestionIndex = 0;
let questionsData = [];  // Store the trivia questions

// Function to fetch trivia data asynchronously
async function getData() {
  try {
    // Fetch trivia questions from the API
    const response = await axios.get("https://opentdb.com/api.php?amount=10&category=12&type=multiple&encode=url3986");
    questionsData = response.data.results;  // Store the results from the API
    displayQuestion(questionsData[currentQuestionIndex]);  // Display the first question
  } catch (error) {
    console.log(error.message);  // Log any error if the API call fails
  }
}

// Call getData when the page loads to fetch questions
getData();

// Function to display a question and its answers
function displayQuestion(questionData) {
  const questionElement = document.getElementById('question');
  const answersElement = document.getElementById('answers');

  // Decode and display the question
  const questionText = decodeURIComponent(questionData.question);
  questionElement.textContent = questionText;

  // Decode and prepare the answers
  const answers = [
    ...questionData.incorrect_answers.map(answer => decodeURIComponent(answer)),
    decodeURIComponent(questionData.correct_answer)
  ];

  // Shuffle the answers to randomize the order
  shuffleArray(answers);

  // Clear previous answers
  answersElement.innerHTML = '';

  // Create buttons for each answer
  answers.forEach(answer => {
    const btn = document.createElement('button');
    btn.className = 'btn btn-secondary m-2';
    btn.textContent = answer;
    btn.addEventListener('click', () => checkAnswer(answer, decodeURIComponent(questionData.correct_answer)));
    answersElement.appendChild(btn);
  });
}

// Function to check if the selected answer is correct
function checkAnswer(selectedAnswer, correctAnswer) {
  const scoreElement = document.getElementById('score');
  if (selectedAnswer === correctAnswer) {
    scoreElement.textContent = 'Correct!';
  } else {
    scoreElement.textContent = `Wrong! The correct answer was: ${correctAnswer}`;
  }
}

// Function to shuffle the answers array (randomize order)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];  // Swap elements
  }
}

// Handle "Next Question" button click
document.getElementById('next-btn').addEventListener('click', () => {
  if (currentQuestionIndex < questionsData.length - 1) {
    currentQuestionIndex++;  // Move to the next question
    displayQuestion(questionsData[currentQuestionIndex]);
    document.getElementById('score').textContent = '';  // Clear score message
  } else {
    document.getElementById('score').textContent = 'You have completed all the questions!';
  }
});