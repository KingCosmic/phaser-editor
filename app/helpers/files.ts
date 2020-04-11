/* eslint-disable import/prefer-default-export */
import electron from 'electron';
import Path from 'path';
import fs from 'fs';

export function getUserDataPath() {
  // Renderer process has to get `app` module via `remote`, whereas the main process can get it directly
  // app.getPath('userData') will return a string of the user's app data directory path.
  return (electron.app || electron.remote.app).getPath('userData');
}

export function saveFile(path: string, data: object | Array<any>): void {
  // Wait, I thought using the node.js' synchronous APIs was bad form?
  // We're not writing a server so there's not nearly the same IO demand on the process
  // Also if we used an async API and our app was quit before the asynchronous write had a chance to complete,
  // we might lose that data. Note that in a real app, we would try/catch this.
  fs.writeFileSync(path, JSON.stringify(data));
}

export function createFile(path: string, name: string): void {
  fs.writeFileSync(Path.join(path, name), '');
}

export function createDir(path: string, name: string): void {
  fs.mkdirSync(Path.join(path, name));
}

export function rnFile(path: string, name: string): void {
  fs.renameSync(path, Path.join(path, '../', name));
}

export function deleteFile(path: string): void {
  fs.unlinkSync(path);
}

const deleteFolderRecursive = function dfr(path: string): void {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(file => {
      const curPath = Path.join(path, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        // recurse
        deleteFolderRecursive(curPath);
      } else {
        // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};

export function deleteFolder(path: string): void {
  deleteFolderRecursive(path);
}

export type File = {
  name: string;
  path: string;
  directory?: Array<File>;
};

// eslint-disable-next-line consistent-return
export const mapDirectory = function recursiveWalk(dir: string) {
  const results: Array<File> = [];

  const files = fs.readdirSync(dir, { withFileTypes: true });
  let pending = files.length;

  if (!pending) return results;

  files.forEach(file => {
    if (file.isDirectory()) {
      const path = Path.join(dir, file.name);
      results.push({
        name: file.name,
        path,
        directory: mapDirectory(path)
      });

      pending -= 1;
      if (!pending) return results;
    } else {
      results.push({
        name: file.name,
        path: Path.join(dir, file.name)
      });
      pending -= 1;
      if (!pending) return results;
    }
  });

  return results;
};

type Config = {
  name: string;
  description: string;
  filePath: string;
};

export function generateConfig(config: Config) {
  return {
    name: config.name,
    description: config.description,
    version: '1.0.0',
    phaserVersion: '3.22.0'
  };
}

export function createProject(config: Config): boolean {
  if (!fs.existsSync(Path.join(config.filePath, '../'))) {
    fs.mkdirSync(Path.join(config.filePath, '../'));
  }

  if (fs.existsSync(config.filePath)) return false;

  // first we're gonna make our directories.
  // our project path
  fs.mkdirSync(config.filePath);
  // next we make our assets and scenes path
  fs.mkdirSync(Path.join(config.filePath, 'assets'));
  fs.mkdirSync(Path.join(config.filePath, 'scenes'));

  // now we're ready to make our base files.
  // our project config file (holds general info like name and phaser version)
  fs.writeFileSync(
    Path.join(config.filePath, 'config.json'),
    JSON.stringify(generateConfig(config))
  );
  // and the game config file for phaser itself.
  fs.copyFileSync(
    Path.join(__dirname, 'templates/gameConfig.ts'),
    Path.join(config.filePath, 'gameConfig.ts')
  );
  // we'll also make our preloader scene file. it handles asset loading.
  fs.copyFileSync(
    Path.join(__dirname, 'templates/scenes/preload.ts'),
    Path.join(config.filePath, 'scenes', 'preload.ts')
  );

  return true;
}
