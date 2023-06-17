const pixelBoard = document.getElementById('pixel-board');
const colorPalette = document.getElementById('color-palette');



function createPalette() {
    for (let i = 0; i < 4; i += 1) {
        let element = document.createElement('div');
        element.classList.add('color');
        colorPalette.appendChild(element);
    }
}

function createBoard() {
    for (let i = 0; i < 25; i += 1) {
        let element = document.createElement('div');
        element.classList.add('pixel');
        pixelBoard.appendChild(element);
    }
}

createPalette();
createBoard();