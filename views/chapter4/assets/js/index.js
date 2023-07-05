const choiceBtn = document.querySelectorAll('.player-choice');
const comBtn = document.querySelectorAll('.com-choice');
const vs = document.getElementById("vsText");
const resultText = document.getElementById("result");
let player; //untuk menampung pilihan pemain
let computer; // untuk menampung pilihan computer
let result; // untuk menampung hasil
const WARNA_ABU = "#C4C4C4"; 

// Button pilihan player di klik
choiceBtn.forEach(button => button.addEventListener("click", () => {
    player = button.getAttribute('data-choice');
    playerPick(player);
    computerTurn();
    comPick(computer);
    resultShow();
    console.log(resultText.textContent);
    endGame();
}))

// Indikator pilihan player
function playerPick(player) {
    if(player == "rock"){
        choiceBtn[0].style.backgroundColor = WARNA_ABU;
    }
    else if(player == "paper"){
        choiceBtn[1].style.backgroundColor = WARNA_ABU;
    }
    else if(player == "scissors"){
        choiceBtn[2].style.backgroundColor = WARNA_ABU;
    }
}

// me-random pilihan dari computer
function computerTurn() {
    const num = Math.floor(Math.random() * 3) + 1;
    switch(num) {
        case 1:
            computer = "rock";
            break;
        case 2:
            computer = "paper";
            break;
        case 3:
            computer = "scissors";
            break;
    }
}

// indikator pilihan computer
function comPick(computer) {
    if(computer == "rock"){
        comBtn[0].style.backgroundColor = WARNA_ABU;
    }
    else if(computer == "paper"){
        comBtn[1].style.backgroundColor = WARNA_ABU;
    }
    else if(computer == "scissors"){
        comBtn[2].style.backgroundColor = WARNA_ABU;
    }
}

// pernilaian hasil
function checkWinner(player, computer) {
    if(player == computer){
        return "DRAW";
    }
    else if(computer == "rock"){
        return (player == "paper") ? "PLAYER 1 WIN" : "COM WIN";
    }
    else if(computer == "paper"){
        return (player == "scissors") ? "PLAYER 1 WIN" : "COM WIN";
    }
    else if(computer = "scissors"){
        return (player == "rock") ? "PLAYER 1 WIN" : "COM WIN";
    }
}

// memuncilkan hasil permainan
function resultShow() {
    vs.style.display = "none";
    resultText.style.display = "block";
    resultText.textContent = checkWinner(player, computer);
    if(resultText.textContent == "DRAW"){
        resultText.style.paddingTop = "28px";
    }
    else if(resultText.textContent == "PLAYER 1 WIN"){
        resultText.style.paddingTop = "5px";
    }
    else if(resultText.textContent == "COM WIN"){
        resultText.style.paddingTop = "28px";
    }
}

// mengakhiri permainan
function endGame() {
    for(a=0; a<3; a++){
        choiceBtn[a].disabled = true;
    }
}

// tombol refresh game
document.getElementById("refresh-img").onclick = function() {
    for(a=0; a<3; a++){
        choiceBtn[a].style.backgroundColor = "transparent";
        choiceBtn[a].disabled = false;
        comBtn[a].style.backgroundColor = "transparent";
    }
    vs.style.display = "block";
    resultText.style.display = "none";

}