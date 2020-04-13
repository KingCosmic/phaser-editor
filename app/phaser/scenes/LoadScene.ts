import { Scene } from 'phaser';
import Path from 'path';

function createLoadScene(gamePath: string) {
  return class LoadScene extends Scene {
    constructor() {
      super({
        key: 'loadscene'
      });
    }

    preload() {
      this.load.setBaseURL(`file://${gamePath}`);
      this.load.pack('data', 'pack.json');
    }

    create() {
      this.scene.start('editscene');
    }
  };
}

export default createLoadScene;
