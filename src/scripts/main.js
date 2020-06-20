/* eslint-disable no-console */
'use strict';

// const slider = document.querySelector('.slider__wrapper');
const inputMax = document.querySelector('#max-input');
const inputMin = document.querySelector('#min-input');
const thumb = document.querySelector('.slider__thumb');
const fill = document.querySelector('.slider__fill');
const ruler = document.querySelector('.slider__ruler');
const tooltip = document.querySelector('.slider__tooltip');

let position = 0;

ruler.addEventListener('mousedown', mousedown => {
  inputMin.value = mousedown.x;
});

ruler.addEventListener('mousemove', move => {
  position = Math.round(
    (move.x - ruler.offsetLeft) * 100
    / ruler.offsetWidth);

  position = (position < 0) ? 0 : position;
  position = (position > 100) ? 100 : position;

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
  inputMax.value = position;
  thumb.style.left = `${position}%`;
  fill.style.width = `${position}%`;
};

ruler.addEventListener('click', moveThumb);

thumb.addEventListener('mousedown', () => {
  ruler.addEventListener('mousemove', moveThumb);
});

thumb.addEventListener('mouseup', () => {
  ruler.removeEventListener('mousemove', moveThumb);
});
