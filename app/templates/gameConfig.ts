import { Types, AUTO } from 'phaser';

import preload from './scenes/preload';
import scene1 from './scenes/scene1';

const config: Types.Core.GameConfig = {
  type: AUTO,
  parent: 'appContainer',
  width: 800,
  height: 600,
  scene: [preload, scene1]
};

export default config;
