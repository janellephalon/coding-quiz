var highScore = document.querySelector("#highScore");
var clear = document.querySelector("#clear");
var returnHome = document.querySelector("#returnHome");

// Clear Scores
clear.addEventListener("click", function() {
    localStorage.clear();
    localStorage.reload();
});

// Get localStorage 
var allScores = localStorage.getItem("allScores");
allScores = JSON.parse(allScores);

if(allScores !== null) {
    for(var i = 0; i < allScores.length; i++) {
        var createList = document.createElement("li"); 
        createList.textContent = allScores[i].initials + " " + highScore.appendChild(createList);
    }
};

// Return Home
returnHome.addEventListener("click", function() {
    window.location.replace("./index.html");
});