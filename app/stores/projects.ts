import path from 'path';
import fs from 'fs';

import { useState } from 'react';
import { createContainer } from 'unstated-next';

import { getUserDataPath, saveFile, createProject } from '../helpers/files';

const dataPath = path.join(getUserDataPath(), 'games.json');

export type Project = {
  name: string;
  description: string;
  filePath: string;
};

type State = Array<Project>;

// eslint-disable-next-line @typescript-eslint/no-use-before-define
function useCounter(initialState: State = parseDataFile(dataPath)) {
  const [projects, setProjects] = useState(initialState);

  const addProject = (project: Project) => {
    const updatedProjects = [...projects, project];

    const created = createProject(project);
    if (!created) return;
    setProjects(updatedProjects);
    saveFile(dataPath, updatedProjects);
  };

  return { projects, addProject };
}

function parseDataFile(filePath: string): State {
  // We'll try/catch it in case the file doesn't exist yet, which will be the case on the first application run.
  // `fs.readFileSync` will return a JSON string which we then parse into a Javascript object
  try {
    return JSON.parse((fs.readFileSync(filePath) as unknown) as string);
  } catch (error) {
    // if there was some kind of error, return the passed in defaults instead.
    return [];
  }
}

const Counter = createContainer(useCounter);
export default Counter;
