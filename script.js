const pixelBoard = document.getElementById('pixel-board');
const colorPalette = document.getElementById('color-palette');
const colorsList = document.getElementsByClassName('color');
const buttonClear = document.getElementById('clear-board');
const buttonRandomColor = document.getElementById('button-random-color');
const buttonVQV = document.getElementById('generate-board');
const inputGridSize = document.getElementById('board-size');

buttonClear.addEventListener('click', clearBoard);
buttonRandomColor.addEventListener('click', randomColor);
buttonVQV.addEventListener('click', gerarGrid)




function createPalette(quantidade) {
    for (let i = 0; i < quantidade; i += 1) {
        let element = document.createElement('div');
        element.classList.add('color');
        colorPalette.appendChild(element);
        element.addEventListener('click', colorSelect);
    }
}

function createBoard(colunas) {
    const linhas = colunas;
  
    const pixelBoard = document.getElementById('pixel-board');
  
    // Remover todos os elementos com a classe 'pixel'
    const elementosPixel = pixelBoard.querySelectorAll('.pixel');
    elementosPixel.forEach((elemento) => {
      elemento.remove();
    });
  
    pixelBoard.innerHTML = '';
  
    for (let i = 0; i < linhas; i++) {
      const linha = document.createElement('div');
      linha.classList.add('linha');
  
      for (let j = 0; j < colunas; j++) {
        const pixel = document.createElement('div');
        pixel.classList.add('pixel');
        linha.appendChild(pixel);
        pixel.addEventListener('click', colorPixel);
      }
  
      pixelBoard.appendChild(linha);
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
    storage();
}

function clearBoard() {
    let pixelList = document.getElementsByClassName('pixel');
    for (let i = 0; i < pixelList.length; i += 1) {
        let pixel = pixelList[i];
        pixel.style.backgroundColor = 'white';
    }
    storage();
}

function randomColor() {
    for (let i =0; i < colorsList.length; i += 1) {
        let color = colorsList[i];
        let red = generateRandom();
        let blue = generateRandom();
        let green = generateRandom();
        let colorGenerated = `rgb(${red}, ${blue}, ${green})`;
        color.style.backgroundColor = colorGenerated;
    }
}

function generateRandom() {
    return Math.floor(Math.random()*(255 - 0 + 1)) + 0;
}

function storage() {
    let pixelList = document.getElementsByClassName('pixel');
    let colorArray = [];
    for (let i = 0; i < pixelList.length; i += 1) {
        let pixel = pixelList[i];
        colorArray.push(pixel.style.backgroundColor);
    }
    localStorage.setItem('pixelBoard', JSON.stringify(colorArray));
}


function restoreBoard() {
    let storedPixelBoard = JSON.parse(localStorage.getItem('pixelBoard'));
    let pixelList = document.getElementsByClassName('pixel');
    if (storedPixelBoard && storedPixelBoard.length === pixelList.length) {
        for (let i = 0; i < pixelList.length; i += 1) {
            let pixel = pixelList[i];
            pixel.style.backgroundColor = storedPixelBoard[i];
        }
    }
}





function gerarGrid() {
    let colunas = inputGridSize.value;
    if (colunas === '') {
        alert('Board inválido!')
    } else if (colunas < 5) {
        createBoard(5);
    } else if (colunas > 50) {
        createBoard(50);
    } 
    else {
        createBoard(colunas);
        storage();  
    }
}

createPalette(4);
createBoard(5);
restoreBoard();