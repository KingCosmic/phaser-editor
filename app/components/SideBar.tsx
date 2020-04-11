import React, { useState } from 'react';

import Directory from './Directory';
import MenuItem from './SceneMenuItem';

import GetFileName from './GetFileName';

import Store from '../stores/project';
import EditorStore from '../stores/editor';
import ContextMenuStore from '../stores/contextMenu';

import { File } from '../helpers/files';

import styles from './sidebar.css';

const mapDirectory = function md(
  files: File,
  setContext,
  addFile,
  addFolder,
  removeFolder,
  setFileNameProps,
  renameFile,
  removeFile,
  addEditor
) {
  if (!files.directory) return null;

  return (
    <Directory
      key={files.name}
      label={files.name}
      onContext={(x, y) => {
        setContext({
          x,
          y,
          visible: true,
          items: [
            {
              label: 'Create File',
              onClick: () => {
                setFileNameProps({
                  title: 'Create File',
                  confirmation: (name: string) => {
                    setFileNameProps({ isOpen: false });
                    addFile(files.path, name);
                  },
                  isOpen: true
                });
              }
            },
            {
              label: 'Create Folder',
              onClick: () => {
                setFileNameProps({
                  title: 'Create Folder',
                  confirmation: (name: string) => {
                    setFileNameProps({ isOpen: false });
                    addFolder(files.path, name);
                  },
                  isOpen: true
                });
              }
            },
            {
              label: 'Delete Folder',
              color: '#f04747',
              onClick: () => removeFolder(files.path)
            }
          ]
        });
      }}
    >
      {files.directory.map(file => {
        if (file.directory)
          return mapDirectory(
            file,
            setContext,
            addFile,
            addFolder,
            removeFolder,
            setFileNameProps,
            renameFile,
            removeFile
          );

        return (
          <MenuItem
            key={`${files.name}/${file.name}`}
            clickHandler={() => addEditor(file.name, file.path)}
            onContext={(x, y) => {
              setContext({
                x,
                y,
                visible: true,
                items: [
                  {
                    label: 'Rename File',
                    onClick: () => {
                      setFileNameProps({
                        title: 'Rename File',
                        confirmation: (name: string) => {
                          setFileNameProps({
                            isOpen: false,
                            title: '',
                            confirmation: () => {}
                          });
                          renameFile(file.path, name);
                        },
                        isOpen: true
                      });
                    }
                  },
                  {
                    label: 'Delete File',
                    color: '#f04747',
                    onClick: () => removeFile(file.path)
                  }
                ]
              });
            }}
          >
            {file.name}
          </MenuItem>
        );
      })}
    </Directory>
  );
};

type Data = {
  title: string;
  confirmation(name: string): void;
  isOpen: boolean;
};

function SideBar() {
  const {
    files,
    addFile,
    addFolder,
    removeFolder,
    removeFile,
    renameFile,
    currentProject
  } = Store.useContainer();
  const setContext = ContextMenuStore.useContainer().setState;
  const { addEditor } = EditorStore.useContainer();

  const [fileNameProps, setFileNameProps] = useState({} as Data);

  return (
    <div className={styles.container}>
      <GetFileName
        isOpen={fileNameProps.isOpen}
        setIsOpen={setFileNameProps}
        data={fileNameProps}
      />

      <h3 className={styles.title}>EXPLORER</h3>
      <div className={styles.openEditors}>
        <MenuItem>Game</MenuItem>
        <MenuItem>Player</MenuItem>
      </div>

      <Directory label={currentProject.name}>
        {files
          .sort((a, b) => {
            if (b.directory) {
              return 1;
            }
            if (a.directory) return -1;

            // ignore upper and lowercase
            const nameA = a.name.toUpperCase();
            const nameB = b.name.toUpperCase();

            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }

            return 0;
          })
          .map(file => {
            return file.directory ? (
              mapDirectory(
                file,
                setContext,
                addFile,
                addFolder,
                removeFolder,
                setFileNameProps,
                renameFile,
                removeFile,
                addEditor
              )
            ) : (
              <MenuItem
                key={file.name}
                clickHandler={() => addEditor(file.name, file.path)}
                onContext={(x, y) => {
                  setContext({
                    x,
                    y,
                    visible: true,
                    items: [
                      {
                        label: 'Rename File',
                        onClick: () => {
                          setFileNameProps({
                            title: 'Rename File',
                            confirmation: (name: string) => {
                              setFileNameProps({
                                isOpen: false,
                                title: '',
                                confirmation: () => {}
                              });
                              renameFile(file.path, name);
                            },
                            isOpen: true
                          });
                        }
                      },
                      {
                        label: 'Delete File',
                        color: '#f04747',
                        onClick: () => removeFile(file.path)
                      }
                    ]
                  });
                }}
              >
                {file.name}
              </MenuItem>
            );
          })}
      </Directory>
    </div>
  );
}

export default SideBar;
