import React, { useState } from 'react';

import ProjectsPage from './views/ProjectsPage';
import EditorPage from './views/EditorPage';

export default function Routes() {
  const [currentView, setView] = useState('projects');

  return currentView === 'projects' ? (
    <ProjectsPage setView={setView} />
  ) : (
    <EditorPage setView={setView} />
  );
}
