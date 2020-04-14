/* eslint-disable no-underscore-dangle */
import { Scene } from 'phaser';

class Scene1 extends Scene {
  constructor() {
    super('scene1');
  }

  _create() {
    this.add.sprite(400, 300, 'logo');
  }

  create() {
    this._create();
  }

  update() {}
}

export default Scene1;
