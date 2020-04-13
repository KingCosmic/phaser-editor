import React from 'react';
import { hot } from 'react-hot-loader/root';

import { BrowserRouter as Router } from 'react-router-dom';

import ProjectStore from '../stores/project';
import EditorStore from '../stores/editor';

import Routes from '../Routes';

const Root = () => (
  <ProjectStore.Provider>
    <EditorStore.Provider>
      <Router>
        <Routes />
      </Router>
    </EditorStore.Provider>
  </ProjectStore.Provider>
);

export default hot(Root);
