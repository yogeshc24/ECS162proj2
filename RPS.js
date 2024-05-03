
var you;
var yourScore = 0;
var opponent;
var opponentScore = 0;

var choices = ["images/comet", "images/alien", "images/spaceship"];

window.onload = function() {
    for (let i = 0; i < 3; i++) {
        // <img id="comet" src="comet.jpg">
        let choice = document.createElement("img");
        choice.id = choices[i];
        choice.src = choices[i] + ".jpg";
        choice.addEventListener("click", selectChoice);
        document.getElementById("choices").append(choice);
    }
}

function selectChoice() {
    you = this.id;
    document.getElementById("your-choice").src = you + ".jpg";

    //random for oppponent
    opponent = choices[Math.floor(Math.random() * 3)]; //0- .999999 * 3 = 0-2.99999
    document.getElementById("opponent-choice").src = opponent + ".jpg";

    //check for winner
    if (you == opponent) {
        yourScore += 1;
        opponentScore += 1;
    }
    else {
        if (you == "images/comet") {
            if (opponent == "images/alien") {
                yourScore += 1;
            }
            else if (opponent == "images/spaceship") {
                opponentScore += 1;
            }
        }
        else if (you == "images/spaceship") {
            if (opponent == "images/comet") {
                yourScore += 1;
            }
            else if (opponent == "images/alien") {
                opponentScore += 1;
            }
        }
        else if (you == "images/alien") {
            if (opponent == "images/spaceship") {
                yourScore += 1;
            }
            else if (opponent == "images/comet") {
                opponentScore += 1;
            }
        }
    }

    document.getElementById("your-score").innerText = yourScore;
    document.getElementById("opponent-score").innerText = opponentScore;
}