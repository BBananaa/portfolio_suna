'use strict';
import * as sound from './sound.js';
//const CARROT_SIZE = 50;

export const ItemType = Object.freeze({
  carrot: 'carrot',
  bug: 'bug'
})
export class Field {
  constructor(carrotCount, bugCount) {
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.field = document.querySelector('.game_field');
    this.field.addEventListener('click', this.onClick);
  }
  init() {
    this.field.innerHTML = '';
    this._addItem(ItemType.carrot, this.carrotCount, './img/project/carrot.png');
    this._addItem(ItemType.bug, this.bugCount, './img/project/bug.png');

  }

  setClickListener(onItemClick) {
    this.onItemClick = onItemClick;
  }

  _addItem(className, count, imgPath) {
    const fieldRect = this.field.getBoundingClientRect();    
    const x1 = 0;
    const y1 = 0;
    const x2 = fieldRect.width;
    const y2 = fieldRect.height;
    for (let i = 0; i < count; i++) {
      const item = document.createElement('img');
      item.setAttribute('class', className);
      item.setAttribute('src', imgPath);
      item.style.position = 'absolute';
      const x = randomNum(x1, x2);
      const y = randomNum(y1, y2);
      item.style.left = `${x}px`
      item.style.top = `${y}px`
      this.field.appendChild(item);
    }

  }

  onClick = event => {
    const target = event.target;
    if(target.matches('.carrot')) {
      target.remove();
      sound.playCarrot();
      this.onItemClick && this.onItemClick(ItemType.carrot);
    } else if(target.matches('.bug')) {
      this.onItemClick && this.onItemClick(ItemType.bug);
      sound.playBug()
    }
  };
}

function randomNum(min, max) {
  return Math.random() * (max - min) + min;
}
