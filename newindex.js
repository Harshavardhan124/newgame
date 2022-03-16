const boxEl = document.querySelectorAll('[cell-data]');
const gridEl = document.getElementById('grid');
const winningTextEl = document.getElementById('winningText');
const winnerTextEl = document.getElementById('winnerText');
const winningConEl = document.getElementById('winningContainer');
const restartBtnEl = document.getElementById('restartBtn');
const xclass = 'x';
const oclass = 'o';

const win_combintaions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
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
}

function onClickBox(e) {
    const box = e.target;
    const currentClass = xclass;
    placeMark(box, currentClass);
    if(checkWin(currentClass)) {
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
    winningConEl.classList.add('show');
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
        if(checkWin(oclass)) {
            endGame(false, oclass);
        } else if (isdraw()) {
            endGame(true, currentClass);
        }
    }
}

function onHover() {
    gridEl.classList.add(xclass);
}

function checkWin(currentClass){
    return win_combintaions.some(combination => {
        return combination.every(index => {
            return boxEl[index].classList.contains(currentClass);
        })
    })
}