import React, { Component } from 'react';
import Phaser from 'phaser';

import { Renderer } from 'phaser3-react';

import { Project } from '../stores/project';

import generateConfig from '../phaser/config';

import { Editor } from '../stores/editor';

type Props = {
  data: Editor;
  currentProject: Project;
};

class SceneEditor extends Component<Props> {
  game?: Phaser.Game;

  constructor(props: Props) {
    super(props);

    this.game = undefined;
  }

  componentDidMount() {
    const { data, currentProject } = this.props;

    this.game = new Phaser.Game(
      generateConfig(currentProject.filePath, data.path)
    );
  }

  componentWillUnmount() {
    if (this.game) {
      this.game.destroy(true, false);
    }
  }

  render() {
    return (
      <div
        style={{ height: 'calc(100% - 41px)', display: 'flex' }}
        id="game-container"
      >
        <Renderer />
      </div>
    );
  }
}

export default SceneEditor;
