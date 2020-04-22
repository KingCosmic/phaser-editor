import { AUTO, Types } from 'phaser';
import PhaserReact from 'phaser3-react';

import LoadScene from './scenes/LoadScene';
import EditScene from './scenes/EditScene';

function generateConfig(
  gamePath: string,
  scenePath: string
): Types.Core.GameConfig {
  return {
    type: AUTO,
    parent: 'game-container',
    zoom: 1,
    backgroundColor: '#000000',
    scene: [LoadScene(gamePath), EditScene(scenePath)],
    scale: {
      width: '85%',
      height: '100%'
    },
    plugins: {
      global: [
        {
          key: 'PhaserReact',
          plugin: PhaserReact,
          start: true,
          data: {
            dontInjectReact: true
          }
        }
      ]
    }
  };
}

export default generateConfig;
