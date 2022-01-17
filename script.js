// Question Array 
var questions = [
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["strings", "alerts", "booleans", "numbers"],
        answer: "alerts"
    },
    {
        title: "The condition in an if/else statement is enclosed within _____.",
        choices: ["parentheses", "quotes", "curly brackets", "square brackets"],
        answer: "parentheses"
    },
    {
        title: "What JavaScript method can we use to select an HTML element?",
        choices: ["document.queryselector()", "document.getElementChild", "document.getElementById", "Both 1 and 3"],
        answer: "Both 1 and 3"
    },
    {
        title: "What HTML tag is NOT included in the HEAD tag?",
        choices: ["link", "meta", "title", "header"],
        answer: "header"
    },
    {
        title: "What attribute is used in HTML to decorate content?",
        choices: ["css", "class", "src", "style"],
        answer: "style"
    },
];

// Variables 
var score = 0;
var questionIndex = 0;

var currentTime = document.querySelector("#currentTime");
var timer = document.querySelector("#startTime");
var questionsDiv = document.querySelector("#questionsDiv");
var wrapper = document.querySelector("#wrapper");

var secondsLeft = 76;
var holdInterval = 0;
var penalty = 10;
var olCreate = document.createElement("ol");

// Timer Function 
timer.addEventListener("click", function() {
    if(holdInterval === 0) {
        holdInterval = setInterval(function () {
            secondsLeft--;
            currentTime.textContent = "Time: " + secondsLeft;

            if(secondsLeft <= 0) {
                clearInterval(holdInterval);
                allDone();
                currentTime.textContent = "Time's up!";
            }
        }, 1000);
    } 
    render(questionIndex);
});

// Questions and Choices to Page 
function render(questionIndex) {
    questionsDiv.innerHTML = "";
    olCreate.innerHTML = "";
    // For Loop Through Array
    for(var i = 0; i < questions.length; i++) {
        // Append Question Title Only
        var userQuestion = questions[questionIndex].title;
        var userChoices = questions[questionIndex].choices;
        questionsDiv.textContent = userQuestion;
    }

    // New Choices per Question
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionsDiv.appendChild(olCreate);
        olCreate.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}

// Feedback 
function compare(event) {
    var element = event.target;

    if(element.matches("li")) {

        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
        // Correct 
        if(element.textContent == questions[questionIndex].answer) {
            score++;
            createDiv.textContent = "Correct! The answer is:  " + questions[questionIndex].answer;
        } else {
            // Penalty 
            secondsLeft = secondsLeft - penalty;
            createDiv.textContent = "Wrong! The correct answer is:  " + questions[questionIndex].answer;
        }
    }

    questionIndex++;
    
    if(questionIndex >= questions.length) {
        allDone();
        createDiv.textContent = "End of quiz!" + " " + "You got  " + score + "/" + questions.length + " correct!";
    } else {
        render(questionIndex);
    }
    questionsDiv.appendChild(createDiv);
}

// All Done
function allDone() {
    questionsDiv.innerHTML = "";
    currentTime.innerHTML = "";

// Heading 
var createH1 = document.createElement("h1");
createH1.setAttribute("id", "createH1");
createH1.textContent = "All done!";
questionsDiv.appendChild(createH1);

// Paragraph
var createParagraph = document.createElement("p");
createParagraph.setAttribute("id", "createParagraph");
questionsDiv.appendChild(createParagraph);

if(secondsLeft >= 0) {
    var timeRemaining = secondsLeft;
    var createParagraph2 = document.createElement("p");
    clearInterval(holdInterval);
    createParagraph.textContent = "Your final score is: " + timeRemaining;
    questionsDiv.appendChild(createParagraph2);
}

// Initials
var createTitle = document.createElement("title");
createTitle.setAttribute("id", "createLabel");
createTitle.textContent = "Enter your initials: ";
questionsDiv.appendChild(createTitle);

// Input
var createInput = document.createElement("input");
createInput.setAttribute("type", "text");
createInput.setAttribute("id", "initials");
createInput.textContent = "";
questionsDiv.appendChild(createInput);

// Submit 
var createSubmit = document.createElement("button");
createSubmit.setAttribute("type", "Submit");
createSubmit.setAttribute("id", "Submit");
createSubmit.textContent = "Submit";
questionsDiv.appendChild(createSubmit);

// Initials to localStorage 
createSubmit.addEventListener("click", function() {
    var initials = createInput.value;

    if(initials === null) {
        console.log("No value entered!");
    } else {
        var finalScore = {
            intials: initials,
            score: timeRemaining 
        }
        console.log(finalScore);
        var allScores = localStorage.getItem("allScores"); 
        if(allScores === null) {
            allScores = [];
        } else {
            allScores = JSON.parse(allScores);
        }
        allScores.push(finalScore);
        var newScore = JSON.stringify(allScores);
        localStorage.setItem("allScores", newScore);

        window.location.replace("./highScore.html");
    }
});
}