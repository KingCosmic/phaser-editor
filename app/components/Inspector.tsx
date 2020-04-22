/* eslint-disable no-nested-ternary */
import { Scene, GameObjects } from 'phaser';
import React from 'react';

import SceneInspector from './SceneInspector';
import SpriteInspector from './SpriteInspector';
import ImageInspector from './ImageInspector';
import TextInspector from './TextInspector';

import styles from './inspector.css';

type Props = {
  type: string; // Scene | Sprite | Text | Image
  data: Scene | GameObjects.GameObject; // we'll have to type convert later anyways
};

function Inspector({ type, data }: Props) {
  return (
    <div className={styles.container}>
      {type === 'Scene' ? (
        <SceneInspector data={data as Scene} />
      ) : type === 'Sprite' ? (
        <SpriteInspector data={data as GameObjects.Sprite} />
      ) : type === 'Image' ? (
        <ImageInspector data={data as GameObjects.Image} />
      ) : type === 'Text' ? (
        <TextInspector data={data as GameObjects.Text} />
      ) : (
        ''
      )}
    </div>
  );
}

export default Inspector;
