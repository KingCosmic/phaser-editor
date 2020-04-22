import React, { useEffect } from 'react';
import Phaser from 'phaser';

import { Renderer } from 'phaser3-react';

import Store from '../stores/project';

import generateConfig from '../phaser/config';

import { Editor } from '../stores/editor';

type Props = {
  data: Editor;
};

function SceneEditor({ data }: Props) {
  const { currentProject } = Store.useContainer();

  useEffect(() => {
    const game = new Phaser.Game(
      generateConfig(currentProject.filePath, data.path)
    );
  });

  return (
    <div
      style={{ height: 'calc(100% - 41px)', display: 'flex' }}
      id="game-container"
    >
      <Renderer />
    </div>
  );
}

export default SceneEditor;
