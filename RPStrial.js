var you;
var yourScore = 0;
var opponent;
var opponentScore = 0;

var choices = ["rock", "paper", "scissors"];

window.onload = function() {
    for (let i = 0; i < 3; i++) {
        // By using i < 3 I get to place my create elemet img to the 3 boxes for the divs I created earlier.
        let choice = document.createElement("img");
        choice.id = choices[i];
        choice.src = choices[i] + ".png";
        choice.addEventListener("click", selectChoice);
        document.getElementById("choices").append(choice);
    }
}

function selectChoice() {
    you = this.id;
    // this.id gives an id property "you" the "you" variable
    document.getElementById("your-choice").src = you + ".png";

    opponent = choices[Math.floor(Math.random() * 3)];
    document.getElementById("opponent-choice").src = opponent + ".png";

    let matchResult = determineMatchResult(you, opponent);

    // Add match result with timestamp to history
    addMatchToHistory(matchResult, you, opponent);

    // Update scores
    updateScores(matchResult);

    // Update score display
    document.getElementById("your-score").innerText = yourScore;
    document.getElementById("opponent-score").innerText = opponentScore;
}

function determineMatchResult(playerChoice, opponentChoice) {
    if (playerChoice === opponentChoice) {
        return "It's a tie!";
    } else if (
        (playerChoice === 'rock' && opponentChoice === 'scissors') ||
        (playerChoice === 'paper' && opponentChoice === 'rock') ||
        (playerChoice === 'scissors' && opponentChoice === 'paper')
    ) {
        return 'You win!';
    } else {
        return 'Computer wins!';
    }
}

function addMatchToHistory(result, playerChoice, opponentChoice) {
    const now = new Date();
    const timestamp = now.toLocaleString();

    const matchHistory = document.getElementById("history");
    const matchItem = document.createElement("li");
    matchItem.innerText = `${timestamp} - ${result} Player: ${playerChoice} | Bot: ${opponentChoice}`;
    matchHistory.appendChild(matchItem);
}

function updateScores(result) {
    if (result === "You win!") {
        yourScore += 1;
    } else if (result === "Computer wins!") {
        opponentScore += 1;
    }
}

setInterval(
    function(){
    let date = new Date();
    let hours = (date.getHours());
    let newhours;
    if (hours >= 12) {
        newhours = "PM";
    } else {
        newhours = "AM";
    }   
    if (hours >= 12) {
        hours = hours - 12 ;
    }
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    document.getElementById("time").innerHTML = `${hours} : ${minutes} : ${seconds} : ${newhours}`;}
);

document.getElementById("reset-button").addEventListener("click", 
    function() {
    yourScore = 0;
    opponentScore = 0;
    document.getElementById("your-score").innerText = yourScore;
    document.getElementById("opponent-score").innerText = opponentScore;
    document.getElementById("history").innerHTML = "";
});
