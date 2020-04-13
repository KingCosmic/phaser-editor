import { useState } from 'react';
import { createContainer } from 'unstated-next';
import Path from 'path';
import fs from 'fs';

import {
  mapDirectory,
  File,
  createFile,
  createDir,
  deleteFolder,
  deleteFile,
  rnFile,
  getUserDataPath,
  saveFile,
  createProject
} from '../helpers/files';

const dataPath = Path.join(getUserDataPath(), 'games.json');

export type Project = {
  name: string;
  description: string;
  filePath: string;
};

const initState: Project = { name: '', description: '', filePath: '' };
const initFiles: File[] = [];

function useCounter(initialState: Project = initState) {
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  const [projects, setProjects] = useState(parseDataFile(dataPath));
  const [currentProject, setCurrentProject] = useState(initialState);
  const [files, setFiles] = useState(initFiles);

  const changeProject = (project: Project) => {
    const results = mapDirectory(project.filePath);
    setFiles(results);
    setCurrentProject(project);
  };

  const addProject = (project: Project) => {
    const updatedProjects = [...projects, project];

    const created = createProject(project);
    if (!created) return;
    setProjects(updatedProjects);
    saveFile(dataPath, updatedProjects);
    changeProject(project);
  };

  const basePath = currentProject?.filePath;

  const addFile = (path: string, name: string) => {
    createFile(path, name);
    setFiles(mapDirectory(basePath));
  };

  const addFolder = (path: string, name: string) => {
    createDir(path, name);
    setFiles(mapDirectory(basePath));
  };

  const removeFolder = (path: string) => {
    deleteFolder(path);
    setFiles(mapDirectory(basePath));
  };

  const removeFile = (path: string) => {
    deleteFile(path);
    setFiles(mapDirectory(basePath));
  };

  const renameFile = (path: string, name: string) => {
    rnFile(path, name);
    setFiles(mapDirectory(basePath));
  };

  return {
    currentProject,
    files,
    changeProject,
    addFile,
    addFolder,
    removeFolder,
    removeFile,
    renameFile,
    projects,
    addProject
  };
}

function parseDataFile(filePath: string): Project[] {
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
