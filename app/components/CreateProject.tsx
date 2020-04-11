/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { remote } from 'electron';
import path from 'path';

import styles from './createproject.css';

import { getUserDataPath } from '../helpers/files';

type Props = {
  isMaking: boolean;
  setIsMaking(making: boolean): void;
  setView(view: string): void;
  addProject(project: {
    name: string;
    description: string;
    filePath: string;
  }): void;
};

function CreateProject(props: Props) {
  const { isMaking, setIsMaking, setView, addProject } = props;

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  if (!isMaking) return null;
  return (
    <div
      onKeyUp={() => {}}
      className={styles.backdrop}
      onClick={() => setIsMaking(false)}
      role="presentation"
    >
      <div
        className={styles.container}
        onKeyUp={() => {}}
        onClick={e => e.stopPropagation()}
        role="presentation"
      >
        <div className={styles.group}>
          <input
            type="input"
            className={styles.creationInputs}
            placeholder="Project Name"
            name="name"
            id="projectname"
            required
            value={name}
            onChange={event => setName(event.target.value)}
          />
          <label htmlFor="projectname" className={styles.label}>
            Project Name
          </label>
        </div>

        <div className={styles.group}>
          <input
            type="input"
            className={styles.creationInputs}
            placeholder="Description"
            name="name"
            id="description"
            required
            value={description}
            onChange={event => setDescription(event.target.value)}
          />
          <label htmlFor="description" className={styles.label}>
            Description
          </label>
        </div>

        <div className={styles.buttonContainer}>
          <div
            className={styles.button}
            onClick={() => setIsMaking(false)}
            onKeyDown={() => {}}
            tabIndex={0}
            role="button"
          >
            Cancel
          </div>

          <div
            className={styles.button}
            onClick={() => {
              addProject({
                name,
                description,
                filePath: path.join(
                  getUserDataPath(),
                  'games',
                  name.toLowerCase().replace(/\s+/g, '')
                )
              });
              const window = remote.getCurrentWindow();
              if (!window.isMaximized()) window.maximize();
              setView('editor');
            }}
            onKeyDown={() => {}}
            tabIndex={0}
            role="button"
          >
            Create
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateProject;
