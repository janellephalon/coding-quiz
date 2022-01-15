// Variables to keep track of quiz state 
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerID;

// Variables to reference DOM elements 
var timeEl = document.querySelector("#time");
var startBtn = document.querySelector("#startButton");
var submitBtn = document.querySelector("#submit-button");
var titleScreen = document.querySelector("#title-section")
var quizScreen = document.querySelector("#quiz-section");
var highScoreScreen = document.querySelector("#highscore-section");
var highScoreDisplay = document.querySelector("#highscore-display-section");
var initialsEl = document.querySelector("#initials");
var feedbackEl = document.querySelector("#feedback");
var questionEl = document.querySelector("#question");
var choicesEl = document.querySelector("#choices");

// Function to start game 
function startQuiz() {
    // hide start screen 
    titleScreen.setAttribute("class", "hide");

    //un-hide question section
    quizScreen.setAttribute("class", "show");

    // start timer 
    timerID = setInterval(tick, 1000);

    // show starting time 
    timeEl.textContent = time;

    getQuestion();
}

// create a second taken off of a clock
function tick() {
    //update time 
    time--;
    timeEl.textContent = time;

    // check if user ran out of time 
    if(time <=0) {
        quizEnd();
    }
}

function getQuestion() {
    //get current question object from array 
    var currentQuestion = questions[currentQuestionIndex];

    //update title with current question
    var titleEl = document.getElementById("question-title");
    textEl.textContent = currentQuestion.title; 

    //clear out any old question choices 
    choicesEl.innerHTML = ""; 

    // loop over choices 
    currentQuestion.choices.forEach(function(choice, i) {
        // create new button for each choice 
        var choiceNode = document.createElement("button");
        choiceNode.setAttribute("class", "choice");
        choiceNode.setAttribute("value", "choice");

        choiceNode.textContent = i + 1 + ". " + choice;

        // attach click event listener to each choice 
        choiceNode.onclick = questionClick;

        //display on page
        choicesEl.appendChild(choiceNode);
    });
}

// Click to generate new question or end quiz if it's the final question. Time will be deducted for answering wrong. 
function questionClick() {
    // Wrong Answer
    if(this.value !== questions[currentQuestionIndex].answer) {
        // Penalty 
        time -= 15; 

        if(time < 0) {
            time = 0;
        }

        // Display new time on page
        timeEl.textContent = time;

        feedbackEl.textContent = "Wrong!";
    } else {
        feedbackEl.textContent = "Correct!";
    }   

    // Show feedback on page for half second 
    feedbackEl.setAttribute("class", "feedback");
    setTimeout(function() {
        feedbackEl.setAttribute("class", "feedback hide");
    }, 1000);

    // Next question
    currentQuestionIndex++;

    // Check if we've run out of questions 
    if(currentQuestionIndex === questions.length) {
        quizEnd();
    } else {
        getQuestion();  
    }
}

// End Quiz Function 
function quizEnd () {
    // Stop Timer 
    clearInterval(timerID);

    // Display End Screen
    var highscoreSectionEl = document.querySelector("#highscore-section");
    highscoreSectionEl.setAttribute("class", "show");

    // Display Final Score
    var finalScoreEl = document.querySelector("#final-score");
    finalScoreEl.textContent = time;

    // Hide Questions
    quizScreen.setAttribute("class", "hide");
}

// Saving Highscore Function
function saveHighscore() {
    // Get Value of Input
    var initals = initialsEl.value.trim();

    // Check if Empty
    if(initials !== "") {
        //Get saved scores from localstorage, or [if empty] set to empty array
        var highscores = 
            JSON.parse(window.localStorage.getItem("highscores")) || [];

        // New Score Object 
        var newScore = {
            score: time,
            initials: initials
        };

        // Save to localstorage
        highscores.push(newScore);
        window.localStorage.setItem("highscores", JSON.stringify));

        // Redirect Page
        window.location.href = "highscore.html";
    }
}

function checkForEnter(event) {
    if(event.key === "Enter") {
        saveHighscore();
    }
}

// Clicks to Submit Initials 
submitBtn.onclick = saveHighscore;

// Clicks to Start Quiz
startBtn.onclick = startQuiz;

initialsEl.onkeyup = checkForEnter;