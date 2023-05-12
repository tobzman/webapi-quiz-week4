var startQuiz = document.getElementById("startQuiz");
var saveScore = document.getElementById("saveScore");
var viewScores = document.getElementById("viewScores");
var playAgain = document.getElementById("playAgain");
// Set up variables for the question counter, score, and timer
var welcome = document.getElementById("welcome");
var quiz = document.getElementById("quiz");
var result = document.getElementById("result");

var options = document.getElementById("options");
var message = document.getElementById("message");

var timer = document.getElementById("timer");
var summary = document.getElementById("summary");
var initialsInput = document.getElementById("initials");
var secondsLeft = 0;
var score = 0;
var currentQuestion = 0;
var countdownTimer;
// Function to syaty the quiz. this creates the timer, hides the Welcome screen and shows the first question
// Start the timer
function onStartQuiz() {
  secondsLeft = 75;
  countdownTimer = setInterval(function () {
    if (secondsLeft > 0) {
      timer.textContent = secondsLeft;
      secondsLeft--;
    } else {
      stopGame();
    }
  }, 1000);
  // Hide the Welcome screen
  welcome.style.display = "none";
  result.style.display = "none";
  quiz.style.display = "flex";
  // Show the first question
  getNextQuestion();
}

function getNextQuestion() {
  // Get the next question from the questions array
  currentQuestion++;
  console.log("current question is" + currentQuestion);
  // Display the question
  if (currentQuestion >= question.length) {
    stopGame();
    return;
  }
  var question = questions[currentQuestion];
  document.getElementById("question").textContent = question.title;
  // Display the answers
  options.innerHTML = "";
  console.log("question choices are" + currentQuestion);

  for (var i = 0; i < question.choices.length; i++) {
    var option = document.createElement("div");
    option.textContent = question.choices[i];
    // Add an Event Listener to each answer
    option.onclick = onAnswerClick;
    option.classList.add("options");
    options.appendChild(option);
  }
}

function onAnswerClick(e) {
  // Get the answer that was clicked
  var correctAnswer = questions[currentQuestion].answer;
  var userAnswer = e.target.textContent;

  // Check if the answer is correct
  if (correctAnswer === userAnswer) {
    score++;
    displayMessage("Correct");
  } else {
    score--;
    secondsLeft -= 10;
    displayMessage("wrong :-(");
  }
  getNextQuestion();
}

function displayMessage(msg) {
  message.textContent = msg;
  setTimeout(function () {
    message.textContent = "";
  }, 1000);
}

function stopGame() {
  // Stop the timer
  clearInterval(countdownTimer);
  timer.textContent = "";
  // Hide the question screen
  quiz.style.display = "none";
  result.style.display = "flex";
  // Show the end screen
  alert("Game over");
  // Display the score
  summary.textContent = "Your score is: " + score;
}

function onSaveScore() {
  // Get the user's initials
  var initials = initialsInput.value.trim();

  // Save the score to local storage
  if (initials !== "") {
    localStorage.setItem(initials, score);
    initialsInput.value = "";
  }
  // Show link to the high scores page
  viewScores.style.display = "inline";
}

startQuiz.addEventListener("click", onStartQuiz);
saveScore.addEventListener("click", stopGame);
playAgain.addEventListener("click", onStartQuiz);
