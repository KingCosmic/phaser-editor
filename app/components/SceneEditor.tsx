import React, { Component } from 'react';

import { Editor } from '../stores/editor';

type Props = {
  data: Editor;
};

type State = {
  data: object;
};

class SceneEditor extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return (
      <div>

      </div>
    );
  }
}

export default SceneEditor;
