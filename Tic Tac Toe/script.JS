let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newBtn = document.querySelector("#new-btn");

let msg = document.querySelector("#msg");
let turnDisplay = document.querySelector("#turn");

let scoreO = document.querySelector("#scoreO");
let scoreX = document.querySelector("#scoreX");
let drawScore = document.querySelector("#drawScore");

let turnO = true;

let oCount = 0;
let xCount = 0;
let drawCount = 0;

const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {

        if(turnO){
            box.innerText = "O";
            turnO = false;
            turnDisplay.innerText = "Current Turn : X";
        }
        else{
            box.innerText = "X";
            turnO = true;
            turnDisplay.innerText = "Current Turn : O";
        }

        box.disabled = true;

        if(!checkWinner()){
            checkDraw();
        }
    });
});

function disableBoxes(){
    boxes.forEach((box)=>{
        box.disabled = true;
    });
}

function enableBoxes(){
    boxes.forEach((box)=>{
        box.disabled = false;
        box.innerText = "";
        box.classList.remove("winner");
    });
}

function showWinner(winner, pattern){

    pattern.forEach((index)=>{
        boxes[index].classList.add("winner");
    });

    msg.innerText = `🎉 Winner is ${winner}`;

    if(winner === "O"){
        oCount++;
        scoreO.innerText = oCount;
    }
    else{
        xCount++;
        scoreX.innerText = xCount;
    }

    disableBoxes();
}

function checkWinner(){

    for(let pattern of winPatterns){

        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if(pos1 !== "" && pos2 !== "" && pos3 !== ""){

            if(pos1 === pos2 && pos2 === pos3){

                showWinner(pos1, pattern);
                return true;
            }
        }
    }

    return false;
}

function checkDraw(){

    let filled = 0;

    boxes.forEach((box)=>{
        if(box.innerText !== ""){
            filled++;
        }
    });

    if(filled === 9){

        drawCount++;
        drawScore.innerText = drawCount;

        msg.innerText = "🤝 Match Draw!!";
    }
}

function resetGame(){

    turnO = true;
    turnDisplay.innerText = "Current Turn : O";
    msg.innerText = "";

    enableBoxes();
}

resetBtn.addEventListener("click", resetGame);
newBtn.addEventListener("click", resetGame);