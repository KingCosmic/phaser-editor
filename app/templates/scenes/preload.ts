import { Scene } from 'phaser';

class Preload extends Scene {
  constructor() {
    super({
      key: 'preload'
    });
  }

  preload() {}

  create() {
    this.scene.start('scene1');
  }
}

export default Preload;
