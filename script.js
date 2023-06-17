const pixelBoard = document.getElementById('pixel-board');
const colorPalette = document.getElementById('color-palette');
const colorsList = document.getElementsByClassName('color');

function createPalette() {
    for (let i = 0; i < 4; i += 1) {
        let element = document.createElement('div');
        element.classList.add('color');
        colorPalette.appendChild(element);
        element.addEventListener('click', colorSelect)
    }
}

function createBoard() {
    for (let i = 0; i < 25; i += 1) {
        let element = document.createElement('div');
        element.classList.add('pixel');
        pixelBoard.appendChild(element);
        element.addEventListener('click', colorPixel)
    }
}

function colorSelect(event) {
    for (let i =0; i < colorsList.length; i += 1) {
        let color = colorsList[i];
        let classes = color.classList;
        classes.remove('selected');
    }
    event.target.classList.add('selected');
}

function colorPixel(event) {
    const pixelSelected = event.target;
    for (let i =0; i < colorsList.length; i += 1) {
        let color = colorsList[i];
        let classes = color.classList;
        if (classes.contains('selected')) {
            let selectedColor = getComputedStyle(color).backgroundColor;
            pixelSelected.style.backgroundColor = selectedColor;
        }
    }
}

createPalette();
createBoard();