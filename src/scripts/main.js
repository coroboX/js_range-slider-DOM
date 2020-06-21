/* eslint-disable no-console */
'use strict';

// const slider = document.querySelector('.slider__wrapper');
const inputMax = document.querySelector('#max-input');
const inputMin = document.querySelector('#min-input');
const thumbMax = document.querySelector('.slider__thumb--max');
const thumbMin = document.querySelector('.slider__thumb--min');
const fill = document.querySelector('.slider__fill');
const ruler = document.querySelector('.slider__ruler');
const tooltip = document.querySelector('.slider__tooltip');

let position = 0;
let positionMid = 0;
let positionMin = 0;
let positionMax = 100;

const setPosition = (val) => {
  if (val < 0) {
    position = 0;
  } else if (val > 100) {
    position = 100;
  } else {
    position = val;
  }
};

ruler.addEventListener('mousemove', move => {
  setPosition(Math.round(
    (move.x - ruler.offsetLeft) * 100 / ruler.offsetWidth)
  );

  if (!event.buttons) {
    ruler.removeEventListener('mousemove', moveThumbMax);
  }

  tooltip.textContent = position;
  tooltip.style.left = `${position}%`;
});

ruler.addEventListener('mouseenter', () => {
  tooltip.style.visibility = 'visible';
});

ruler.addEventListener('mouseleave', () => {
  tooltip.style.visibility = 'hidden';
});

const moveThumb = () => {
  if (position > positionMid) {
    moveThumbMax();
  } else {
    moveThumbMin();
  }
};

const moveThumbMin = () => {
  if (position > positionMax) {
    moveThumbMax();
  }
  positionMin = position;
  positionMid = (positionMax + positionMin) / 2;
  inputMin.value = positionMin;
  thumbMin.style.left = `${positionMin}%`;
  thumbMin.style.zIndex = 1;
  thumbMax.style.zIndex = 0;
  fill.style.left = `${positionMin}%`;
  fill.style.width = `${positionMax - positionMin}%`;
};

const moveThumbMax = () => {
  if (position < positionMin) {
    moveThumbMin();
  }
  positionMax = position;
  positionMid = (positionMax + positionMin) / 2;
  inputMax.value = positionMax;
  thumbMax.style.left = `${positionMax}%`;
  thumbMax.style.zIndex = 1;
  thumbMin.style.zIndex = 0;
  fill.style.width = `${positionMax - positionMin}%`;
};

ruler.addEventListener('click', moveThumb);

thumbMax.addEventListener('mousedown', () => {
  ruler.addEventListener('mousemove', moveThumbMax);
  event.target.style.boxShadow = '0 0 5px black';
  event.target.style.backgroundColor = '#347a8b';
});

thumbMax.addEventListener('mouseup', () => {
  ruler.removeEventListener('mousemove', moveThumbMax);
  event.target.style.boxShadow = '';
  event.target.style.backgroundColor = '';
});

inputMax.addEventListener('change', () => {
  setPosition(Number(inputMax.value));

  if (position < positionMin) {
    moveThumbMin();
  }

  moveThumbMax();
});

thumbMin.addEventListener('mousedown', () => {
  ruler.addEventListener('mousemove', moveThumbMin);
  event.target.style.backgroundColor = '#347a8b';
  event.target.style.boxShadow = '0 0 5px black';
});

thumbMin.addEventListener('mouseup', () => {
  ruler.removeEventListener('mousemove', moveThumbMin);
  event.target.style.backgroundColor = '';
  event.target.style.boxShadow = '';
});

inputMin.addEventListener('change', () => {
  setPosition(Number(inputMin.value));

  if (position > positionMax) {
    moveThumbMax();
  }

  moveThumbMin();
});

position = 0;
moveThumbMin();
position = 70;
moveThumbMax();
