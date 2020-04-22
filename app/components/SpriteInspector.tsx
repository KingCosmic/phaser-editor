import React from 'react';
import { GameObjects } from 'phaser';

import LabelInput from './LabelInput';

import styles from './spriteinspector.css';

type Props = {
  data: GameObjects.Sprite;
};

function SpriteInspector({ data }: Props) {
  return (
    <div className={styles.container}>
      <LabelInput
        placeholder="Variable"
        name="variable"
        value={data.data.get('variable') || ''}
        onChange={v => data.data.set('variable', v)}
      />
    </div>
  );
}

export default SpriteInspector;
