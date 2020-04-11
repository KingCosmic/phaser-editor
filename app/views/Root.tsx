import React from 'react';
import { hot } from 'react-hot-loader/root';

import { BrowserRouter as Router } from 'react-router-dom';

import Store from '../stores/projects';
import ProjectStore from '../stores/project';
import EditorStore from '../stores/editor';

import Routes from '../Routes';

const Root = () => (
  <Store.Provider>
    <ProjectStore.Provider>
      <EditorStore.Provider>
        <Router>
          <Routes />
        </Router>
      </EditorStore.Provider>
    </ProjectStore.Provider>
  </Store.Provider>
);

export default hot(Root);
