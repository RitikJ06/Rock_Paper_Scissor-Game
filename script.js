// Rock = 0
// Paper = 1
// Scissor = 2
let playerChoice;

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
    // else if((computerChoice == 0 && playerChoice == 2) || (computerChoice == 2 && playerChoice == 1) || (computerChoice == 1 && playerChoice == 0))
    //     return "computer";
    // }
    
}

// function to set style of message
function styleMsgEle(wpr, heading, subheading, button){
    // wrapper
    wpr.style.display = "flex";
    wpr.style.flexDirection = "column";
    wpr.style.justifyContent = "center";
    wpr.style.alignItems = "center";
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
    // play again button
    button.style.backgroud = "white";
    button.style.color = "#6B6B6B";
    button.style.padding = "20px 40px";
    button.style.margin = "20px 0px";
    button.style.border = "none";
    button.style.borderRadius = "9px";
    button.style.fontSize = "13px";
    button.style.fontWeight = "300";
    button.style.letterSpacing = "0.09em";
}

// function to add style on winner i.e. mutiple green borders
function styleWinner(winner){

}

// function to make the game when user click on any of rock, paper, scissor
function handleGame() {
    // generate a random number between [0,2] for computer choice
    // muliplying random by 10 and using modulo opeator for random choices
    computerChoice = Math.floor((Math.random() * 10) % 3);
    console.log(playerChoice, computerChoice)
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

    // call function to style message elements properly
    styleMsgEle(msgEle, msgHeading, msgSubHeading, playAgainBtn);

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

    // append all elements in fist row
    firstRow.append(playerBtnWpr);
    firstRow.append(msgEle);
    firstRow.append(computerBtnWpr.cloneNode(true));





    

}