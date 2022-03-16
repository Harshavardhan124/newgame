const boxEl = document.querySelectorAll('[cell-data]');
const gridEl = document.getElementById('grid');
const winningTextEl = document.getElementById('winningText');
const winnerTextEl = document.getElementById('winnerText');
const winningConEl = document.getElementById('winningContainer');
const restartBtnEl = document.getElementById('restartBtn');
const xclass = 'x';
const oclass = 'o';
let ochance = false;

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

restartBtnEl.addEventListener('click', startGame)

function placeMark(box, currentClass) {
    box.classList.add(currentClass)
}

function onClickBox(e) {
    const box = e.target;
    const currentClass = ochance ? oclass : xclass;
    const nextclass = ochance ? xclass: oclass;
    placeMark(box, currentClass);
    if(checkWin(currentClass)) {
        endGame(false);
    } else if (isdraw()) {
        endGame(true)
    } else {
        ochance = !ochance;
        gridEl.classList.remove(xclass);
        gridEl.classList.remove(oclass);
        gridEl.classList.add(nextclass);
    }
}

function checkWin(currentClass) {
    return win_combintaions.some(combinations => {
        return combinations.every(index => {
            return boxEl[index].classList.contains(currentClass);
        })
    })
}

function isdraw(){
    return [...boxEl].every(box => {
        return box.classList.contains(xclass) || box.classList.contains(oclass);
    })
}

function endGame(draw) {
    if(draw) {
        winningTextEl.textContent = 'XO';
        winnerTextEl.textContent = 'DRAW!';
    } else {
        if(ochance){
            winningTextEl.textContent = 'O';
            winnerTextEl.textContent = 'WINNER!';
        } else {
            winningTextEl.textContent = 'X';
            winnerTextEl.textContent = 'WINNER!';
        }
    }
    winningConEl.classList.add('show');
}
function startGame() {
    ochance = false;
    boxEl.forEach(box => {
        box.classList.remove(xclass);
        box.classList.remove(oclass);
        gridEl.classList.remove(xclass);
        gridEl.classList.remove(oclass);
        box.removeEventListener('click', onClickBox);
        box.addEventListener('click', onClickBox, {once: true});
    })
    gridEl.classList.add(xclass);
    winningConEl.classList.remove('show');

}

startGame()