
let currentQuestionIndex = 0;
let questionsData = [];  


async function getData() {
  try {
 
    const response = await axios.get("https://opentdb.com/api.php?amount=10&category=12&type=multiple&encode=url3986");
    questionsData = response.data.results; 
    displayQuestion(questionsData[currentQuestionIndex]);  
  } catch (error) {
    console.log(error.message);  
  }
}


getData();

function displayQuestion(questionData) {
  const questionElement = document.getElementById('question');
  const answersElement = document.getElementById('answers');

  const questionText = decodeURIComponent(questionData.question);
  questionElement.textContent = questionText;

  const answers = [
    ...questionData.incorrect_answers.map(answer => decodeURIComponent(answer)),
    decodeURIComponent(questionData.correct_answer)
  ];

  shuffleArray(answers);

  answersElement.innerHTML = '';

  answers.forEach(answer => {
    const btn = document.createElement('button');
    btn.className = 'btn btn-secondary m-2';
    btn.textContent = answer;
    btn.addEventListener('click', () => checkAnswer(answer, decodeURIComponent(questionData.correct_answer)));
    answersElement.appendChild(btn);
  });
}

function checkAnswer(selectedAnswer, correctAnswer) {
  const scoreElement = document.getElementById('score');
  if (selectedAnswer === correctAnswer) {
    scoreElement.textContent = 'Correct!';
  } else {
    scoreElement.textContent = `Wrong! The correct answer was: ${correctAnswer}`;
  }
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];  
  }
}

document.getElementById('next-btn').addEventListener('click', () => {
  if (currentQuestionIndex < questionsData.length - 1) {
    currentQuestionIndex++;  
    displayQuestion(questionsData[currentQuestionIndex]);
    document.getElementById('score').textContent = '';  
  } else {
    document.getElementById('score').textContent = 'You have completed all the questions!';
  }
});