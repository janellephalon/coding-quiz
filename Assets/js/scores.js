function printHighscores() {
    //Retreive highscores from localStorage or set to empty array
    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

    //Sort Highscores - Descending 
    highscores.sort(function(a, b) {
        return b.score - a.score;
    });

    highscores.forEach(function(score) {
        // <li> Highscore
        var liTag = document.createElement("li");
        liTag.textContent = score.intials + " - " + score.score;

        // Display on Page
        var olEl = document.getElementById("highscore");
        olEl.appendChild(liTag);
    });
}

function clearHighscores() {
    window.localStorage.removeItem("higscores");
    window.location.reload();
}

document.getElementById("clear").onclick = clearHighscores;

// Run Function when Page Loads
printHighscores();