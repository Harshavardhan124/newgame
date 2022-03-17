const boxEl = document.querySelectorAll('[cell-data]');
const gridEl = document.getElementById('grid');
const winningTextEl = document.getElementById('winningText');
const winnerTextEl = document.getElementById('winnerText');
const winningConEl = document.getElementById('winningContainer');
const restartBtnEl = document.getElementById('restartBtn');
const lineEl = document.getElementById('line');
const xclass = 'x';
const oclass = 'o';

const win_combintaions = [
    [0, 1, 2, 0, 25, 47],
    [3, 4, 5, 0, 25, 147],
    [6, 7, 8, 0, 25, 247],
    [0, 3, 6, 90, 148, 75],
    [1, 4, 7, 90, 148, -25],
    [2, 5, 8, 90, 148, -125],
    [0, 4, 8, 45, 105, 105],
    [2, 4, 6, 135, 105, -104]
];

startGame();

restartBtnEl.addEventListener('click', startGame);

function startGame() {
    boxEl.forEach(box => {
        box.classList.remove(xclass);
        box.classList.remove(oclass);
        box.removeEventListener('click', onClickBox);
        box.addEventListener('click', onClickBox, {once: true});
    });
    onHover();
    winningConEl.classList.remove('show');
    lineEl.style.width = '0';
}

function onClickBox(e) {
    const box = e.target;
    const currentClass = xclass;
    placeMark(box, currentClass);
    if(checkWin()) {
        endGame(false, currentClass);
    } else if(isdraw()){
        endGame(true, currentClass);
    } else {
        placeOMark();
        onHover();
    }    
}

function endGame(draw, currentClass){
    if(draw){
        winningTextEl.textContent = 'XO';
        winnerTextEl.textContent = 'DRAW!';
    } else {
        if(currentClass === oclass){
            winningTextEl.textContent = 'O';
            winnerTextEl.textContent = 'WINNER!';
        } else {
            winningTextEl.textContent = 'X';
            winnerTextEl.textContent = 'WINNER!';
        }
    }
    setTimeout(function() {
        winningConEl.classList.add('show');
    }, 1500);
}

function isdraw() {
    return [...boxEl].every(box => {
        return box.classList.contains(xclass) || box.classList.contains(oclass);
    })
}

function placeMark(box, currentClass) {
    box.classList.add(currentClass);
}

function placeOMark() {
    let indexList = [];
    for (let i = 0; i < 9; i++){
        if(!boxEl[i].classList.contains(xclass) && !boxEl[i].classList.contains(oclass)){
            indexList.push(i);
        }
    }
    if(indexList.length !== 0) {
        console.log(indexList);
        const random = Math.floor(Math.random() * indexList.length);
        boxEl[indexList[random]].classList.add(oclass);
        boxEl[indexList[random]].removeEventListener('click', onClickBox);
        if(checkWin()) {
            endGame(false, oclass);
        } else if (isdraw()) {
            endGame(true, currentClass);
        }
    }
}

function onHover() {
    gridEl.classList.add(xclass);
}

function checkWin(){
    let isFound = false;
    let diagonal_array_1 = [0, 4, 8];
    let diagonal_array_2 = [2, 4, 6];
    win_combintaions.forEach(e => {
        if(typeof(boxEl[e[0]].classList[1]) !== 'undefined' && (boxEl[e[0]].classList[1] === boxEl[e[1]].classList[1]) && (boxEl[e[2]].classList[1] === boxEl[e[1]].classList[1])) {
            isFound = true;
            if(diagonal_array_1.every(val => e.includes(val)) || diagonal_array_2.every(val => e.includes(val))) {
                lineEl.style.width = "300px";
            } else {
                lineEl.style.width = "250px";
            }
            lineEl.style.transform = `rotate(${e[3]}deg) translate(${e[4]}px, ${e[5]}px)`;
        }
    });
    if(isFound){
        return true;
    } else {
        return false;
    }
}