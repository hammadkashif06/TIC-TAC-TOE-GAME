let startBtn = document.querySelector("#start-game-btn");
let homePage = document.querySelector(".home-page");
let gamePage = document.querySelector(".game-page");
let winnerPage = document.querySelector(".winner-page");
let startGameBtn = () =>{
    homePage.classList.add("page");
    gamePage.classList.remove("page");
}
startBtn.addEventListener("click", startGameBtn);
let boxes = document.querySelectorAll(".box");
let winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8]
];
let turn0 = true;
let count = 0;
let gameBtns = (e) =>{
    let box = e.target;
    if (turn0) {
        box.innerText = "O";
        turn0 = false;
    }
    else {
        box.innerText = "X";
        turn0 = true;
    }
    box.disabled = true;
    count++;
    checkWinner();
    checkDraw();
}
boxes.forEach((box) => {
    box.addEventListener("click", gameBtns);
});
let winnerText = document.querySelector("#winner-text")
let checkDraw = () => {
    let isWinner = checkWinner();
    if (count === 9 && !isWinner){
        disableBoxes();
        winnerText.innerText = 'The game is drawn';
        gamePage.classList.add("page");
        winnerPage.classList.remove("page");
    }
}
let showWinner = (winner) => {
    winnerText.innerText = `Congratulations, the winner is ${winner}`;
    gamePage.classList.add("page");
    winnerPage.classList.remove("page");
}
let checkWinner = () =>{
    for (let pattern of winPatterns){
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;
        if(pos1 != "" && pos2 != "" && pos3 != ""){
            if(pos1 === pos2 && pos2 === pos3){
                showWinner(pos1);
                disableBoxes();
                return true;
            }
        }
    }
}
let enableBoxes = () =>{
    for (let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}
let disableBoxes = () =>{
    for (let box of boxes){
        box.disabled = true;
    }
}
let resetGame = () =>{
    turn0 = true;
    count = 0;
    enableBoxes();
    gamePage.classList.remove("page");
    winnerPage.classList.add("page");
}
let resetBtn = document.querySelector("#reset-btn");
resetBtn.addEventListener("click", resetGame);
let newGameBtn = document.querySelector("#new-game-btn");
newGameBtn.addEventListener("click", resetGame);