const pixelBoard = document.getElementById('pixel-board');
const colorPalette = document.getElementById('color-palette');
const colorsList = document.getElementsByClassName('color');
const buttonClear = document.getElementById('clear-board');
const buttonRandomColor = document.getElementById('button-random-color');
const buttonVQV = document.getElementById('generate-board');
const inputGridSize = document.getElementById('board-size');

buttonClear.addEventListener('click', clearBoard);
buttonRandomColor.addEventListener('click', randomColor);
buttonVQV.addEventListener('click', gerarGrid);

function createPalette(quantidade) {
  for (let i = 0; i < quantidade; i += 1) {
    const element = document.createElement('div');
    element.classList.add('color');
    colorPalette.appendChild(element);
    element.addEventListener('click', colorSelect);
  }
}

function createBoard(colunas) {
  const linhas = colunas;
  const elementosPixel = pixelBoard.querySelectorAll('.pixel');
  elementosPixel.forEach((elemento) => {
    elemento.remove();
  });
  pixelBoard.innerHTML = '';
  for (let i = 0; i < linhas; i += 1) {
    const linha = document.createElement('div');
    linha.classList.add('linha');
    for (let j = 0; j < colunas; j += 1) {
      const pixel = document.createElement('div');
      pixel.classList.add('pixel');
      linha.appendChild(pixel);
      pixel.addEventListener('click', colorPixel);
    }
    pixelBoard.appendChild(linha);
  }
}

function colorSelect(event) {
  for (let i = 0; i < colorsList.length; i += 1) {
    const color = colorsList[i];
    const classes = color.classList;
    classes.remove('selected');
  }
  event.target.classList.add('selected');
}

function colorPixel(event) {
  const pixelSelected = event.target;
  for (let i = 0; i < colorsList.length; i += 1) {
    const color = colorsList[i];
    const classes = color.classList;
    if (classes.contains('selected')) {
      const selectedColor = getComputedStyle(color).backgroundColor;
      pixelSelected.style.backgroundColor = selectedColor;
    }
  }
  storage();
}

function clearBoard() {
  const pixelList = document.getElementsByClassName('pixel');
  for (let i = 0; i < pixelList.length; i += 1) {
    const pixel = pixelList[i];
    pixel.style.backgroundColor = 'white';
  }
  storage();
}

function randomColor() {
  for (let i = 0; i < colorsList.length; i += 1) {
    const color = colorsList[i];
    const red = generateRandom();
    const blue = generateRandom();
    const green = generateRandom();
    const colorGenerated = `rgb(${red}, ${blue}, ${green})`;
    color.style.backgroundColor = colorGenerated;
  }
}

function generateRandom() {
  return Math.floor(Math.random() * (255 - 0 + 1)) + 0;
}

function storage() {
  const pixelList = document.getElementsByClassName('pixel');
  const colorArray = [];
  for (let i = 0; i < pixelList.length; i += 1) {
    const pixel = pixelList[i];
    colorArray.push(pixel.style.backgroundColor);
  }
  const boardSize = document.getElementsByClassName('linha').length;
  localStorage.setItem('pixelBoard', JSON.stringify(colorArray));
  localStorage.setItem('boardSize', boardSize);
}

function restoreBoard() {
  const storedColors = JSON.parse(localStorage.getItem('pixelBoard'));
  const storedSize = localStorage.getItem('boardSize');
  if (storedColors && storedSize) {
    createBoard(storedSize);
    const pixelList = document.getElementsByClassName('pixel');
    for (let i = 0; i < pixelList.length; i += 1) {
      const pixel = pixelList[i];
      pixel.style.backgroundColor = storedColors[i];
    }
  } else {
    createBoard(5);
  }
}

function gerarGrid() {
  const colunas = inputGridSize.value;
  if (colunas === '') {
    alert('Board inválido!');
  } else if (colunas < 5) {
    createBoard(5);
  } else if (colunas > 50) {
    createBoard(50);
  } else {
    createBoard(colunas);
    storage();
  }
}

createPalette(4);
restoreBoard();
