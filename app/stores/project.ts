import { useState } from 'react';
import { createContainer } from 'unstated-next';

import {
  mapDirectory,
  File,
  createFile,
  createDir,
  deleteFolder,
  deleteFile,
  rnFile
} from '../helpers/files';

export type Project = {
  name: string;
  description: string;
  filePath: string;
};

const initState: Project = { name: '', description: '', filePath: '' };
const initFiles: Array<File> = [];

function useCounter(initialState: Project = initState) {
  const [currentProject, setCurrentProject] = useState(initialState);
  const [files, setFiles] = useState(initFiles);

  const changeProject = (project: Project) => {
    const results = mapDirectory(project.filePath);
    setFiles(results);
    setCurrentProject(project);
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
    renameFile
  };
}

const Counter = createContainer(useCounter);
export default Counter;
