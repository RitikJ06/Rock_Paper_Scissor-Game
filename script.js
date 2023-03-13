// Rock = 0
// Paper = 1
// Scissor = 2
let playerChoice;
let initialGamestate;
let playerScore = 0;
let pcScore = 0;

// if score is in local storage
if(localStorage.playerScore){
    document.getElementById("player-score").innerHTML = localStorage.playerScore;
}
if(localStorage.pcScore){
    document.getElementById("pc-score").innerHTML = localStorage.pcScore;
}

// define function to open rules popup
function closeRules() {
    const rulesButton = document.getElementById("rules");
    rulesButton.style.display = 'none';
}
// define function to close rules popup
function openRules() {
    const rulesButton = document.getElementById("rules");
    rulesButton.style.display = 'flex'; 
}

// define function to choose rock
function chooseRock() {
    // set playerChoice to rock
    playerChoice = 0;
    handleGame();
}
// define function to choose paper
function choosePaper() {
    // set playerChoice to paper
    playerChoice = 1;
    handleGame();
}
// define function to choose scissor
function chooseScissor() {
    // set playerChoice to scissor
    playerChoice = 2;
    handleGame();
}

// funtion to restart the game
function restartGame(){
    // close rules if they are open
    closeRules();
    
    mainEle = document.getElementsByClassName("main")[0];
    // remove all existing child
    mainEle.innerHTML = "";
    mainEle.append(initialGamestate);

    // if the footer has more than one child
    let footer = document.getElementsByClassName("footer")[0];
    if( footer.children.length > 1){
        // delete last child of footer
        footer.removeChild(footer.lastChild);
    }
}

// define functin to update score
function updateScore(winner){
    // get scores
    playerScore = document.getElementById("player-score");
    pcScore = document.getElementById("pc-score");

    if(winner == "player"){
        let newPlayerScore = (+playerScore.innerHTML) + 1;
        localStorage.setItem("playerScore", newPlayerScore);
        playerScore.innerHTML = newPlayerScore;
    }
    else if(winner == "computer"){
        let newPcScore = (+pcScore.innerHTML) + 1;
        localStorage.setItem("pcScore", newPcScore);
        pcScore.innerHTML = newPcScore;
    }
    
}

// define function to decide who is the winner
function getWinner(plyrChoice, compChoice){
    if(plyrChoice == compChoice){
        return "tie";
    }

    if((plyrChoice == 0 && compChoice == 2) || (plyrChoice == 2 && compChoice == 1) || (plyrChoice == 1 && compChoice == 0)){
        return "player";
    }
    else{
        return "computer";
    }
    
}

// function to set style of message
function styleMsgEle(wpr, heading, subheading){
    // wrapper
    wpr.style.display = "flex";
    wpr.style.flexDirection = "column";
    wpr.style.justifyContent = "flex-end";
    wpr.style.alignItems = "center";
    wpr.style.margin = "0px 60px";
    wpr.style.alignSelf = "flex-end";
    wpr.style.marginBottom = "-30px";
    // heading
    heading.style.fontSize = "38px";
    heading.style.fontWeight = "650";
    heading.style.margin = "0px";
    heading.style.letterSpacing = "0.09em";
    // subheading
    subheading.style.fontSize = "25px";
    subheading.style.fontWeight = "650";
    subheading.style.margin = "0px";
    subheading.style.letterSpacing = "0.09em";
}

// function to add style on winner i.e. mutiple green borders
function styleWinner(winner){
    winner.children[1].style.boxShadow = "0 0 0 25px rgba(29, 168, 43, 1), 0 0 0 45px rgba(29, 168, 43, 0.59), 0 0 0 65px rgba(46, 154, 37, 0.39)";
}

// reset button behaviours on changing game state
function changeBtnBehave(btn){
    btn.style.cursor = "auto";
    btn.onclick = "";
}

// function to add next button if palyer has more score than pc
function addNextBtn(){
    let currentPlayerScore = +document.getElementById("player-score").innerHTML;
    let currentPcScore = +document.getElementById("pc-score").innerHTML;

    if(currentPcScore < currentPlayerScore){
        // make an copy of Rules button
        let nextBtn = document.getElementsByClassName("footer-button")[0].cloneNode(true);
        nextBtn.innerHTML = "NEXT";
        nextBtn.onclick = () => window.location.replace("./win.html");
        // get footer
        let footer = document.getElementsByClassName("footer")[0];
        footer.append(nextBtn);
    }
}

// function to reset the score and restart the game
function resetScoreAndRestart(){
    // clear local storage
    localStorage.clear();
    // move back to the game
    window.location.replace("./index.html");
}


// function to make the game when user click on any of rock, paper, scissor
function handleGame() {

    // make an copy of initial state of game
    initialGamestate = document.getElementsByClassName("main-wrapper")[0].cloneNode(true);

    // generate a random number between [0,2] for computer choice
    // muliplying random by 10 and using modulo opeator for random choices
    computerChoice = Math.floor((Math.random() * 10) % 3);
    
    // get all horizontal line elements
    horLine = document.getElementsByClassName("hor-line")[0];
    digLine1 = document.getElementsByClassName("dig-line1")[0];
    digLine2 = document.getElementsByClassName("dig-line2")[0];
    // remvoe all three lines from dom
    horLine.remove();
    digLine1.remove();
    digLine2.remove();

    // get all buttons wrapper
    rockBtnWpr = document.getElementsByClassName("rock-button-wrapper")[0];
    scissorBtnWpr = document.getElementsByClassName("scissor-button-wrapper")[0];
    paperBtnWpr = document.getElementsByClassName("paper-button-wrapper")[0];
    // remove all three buttons from dom
    rockBtnWpr.remove();
    scissorBtnWpr.remove();
    paperBtnWpr.remove();

    // get second row element
    secondRow = document.getElementsByClassName("second-row")[0];
    // remove second row from dom
    secondRow.remove();
    // get first row element
    firstRow = document.getElementsByClassName("first-row")[0];

    // decide which buttons to put in first row based on player and computer choices
    let playerBtnWpr;
    let computerBtnWpr;
    if(playerChoice == 0){
        playerBtnWpr = rockBtnWpr.cloneNode(true);
    }
    else if(playerChoice == 1){
        playerBtnWpr = paperBtnWpr.cloneNode(true);
    }
    else{
        playerBtnWpr = scissorBtnWpr.cloneNode(true);
    }

    if(computerChoice == 0){
        computerBtnWpr = rockBtnWpr.cloneNode(true);
    }
    else if(computerChoice == 1){
        computerBtnWpr = paperBtnWpr.cloneNode(true);
    }
    else{
        computerBtnWpr = scissorBtnWpr.cloneNode(true);
    }

    // align all text in center in both button wrappers
    playerBtnWpr.style.textAlign = "center";
    computerBtnWpr.style.textAlign = "center";

    msgAboveBtns = document.createElement("p");
    msgAboveBtns.style.fontWeight = "500";
    msgAboveBtns.style.letterSpacing = "0.09em";
    // add messages above the buttons
    msgAboveBtns.innerHTML = "YOU PICKED";
    msgAboveBtns.style.position = "relative";
    msgAboveBtns.style.zIndex = "1";
    msgAboveBtns.style.bottom = "10px";
    playerBtnWpr.prepend(msgAboveBtns);
    msgAboveBtnsClone = msgAboveBtns.cloneNode(true);
    msgAboveBtnsClone.innerHTML = "PC PICKED"
    computerBtnWpr.prepend(msgAboveBtnsClone);
    

    // create message element that is to be placed between elements
    msgEle = document.createElement("div");
    // create first heading i.e. YOU WIN/YOU LOST / TIE UP
    msgHeading = document.createElement("p");
    // create subheading i.e. AGAINST PC
    msgSubHeading = document.createElement("p");
    msgSubHeading.innerHTML = "AGAINST PC";
    // create play again button
    playAgainBtn = document.createElement("button");
    playAgainBtn.innerHTML = "REPLAY";
    playAgainBtn.onclick = restartGame;
    playAgainBtn.style.margin = "20px 0px";
    playAgainBtn.classList.add("play-again");

    // call function to style message elements properly
    styleMsgEle(msgEle, msgHeading, msgSubHeading);

    // get the winner of the game
    const winner = getWinner(playerChoice, computerChoice);

    // set properties as per winner
    if(winner == "player"){
        msgHeading.innerHTML = "YOU WIN";
        styleWinner(playerBtnWpr);
    }
    else if(winner == "computer"){
        msgHeading.innerHTML = "YOU LOST";
        styleWinner(computerBtnWpr);
    }
    else{
        msgHeading.innerHTML = "TIE UP";
    }

    // add all elements to the msgEle
    msgEle.append(msgHeading);
    if(winner != "tie"){
        msgEle.append(msgSubHeading);
        playAgainBtn.innerHTML = "PLAY AGAIN";
    }
    msgEle.append(playAgainBtn);

    console.log(computerBtnWpr);
    // change buttons behave
    changeBtnBehave(playerBtnWpr.children[1]);
    changeBtnBehave(computerBtnWpr.children[1]);

    // append all elements in fist row
    firstRow.append(playerBtnWpr);
    firstRow.append(msgEle);
    firstRow.append(computerBtnWpr);

    // update the score
    updateScore(winner);

    // Add next button in the footer if player wins
    addNextBtn();
}