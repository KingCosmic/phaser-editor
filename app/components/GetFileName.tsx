/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';

import styles from './getfilename.css';

type Props = {
  isOpen: boolean;
  data: {
    title: string;
    confirmation(name: string): void;
  };
  setIsOpen(data: object): void;
};

function CreateFile(props: Props) {
  const { isOpen, setIsOpen, data } = props;

  const [name, setName] = useState('');

  if (!isOpen) return null;
  return (
    <div
      onKeyUp={() => {}}
      className={styles.backdrop}
      onClick={() => setIsOpen({ isOpen: false })}
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

        <div className={styles.buttonContainer}>
          <div
            className={styles.button}
            onClick={() => setIsOpen({ isOpen: false })}
            onKeyDown={() => {}}
            tabIndex={0}
            role="button"
          >
            Cancel
          </div>

          <div
            className={styles.button}
            onClick={() => data.confirmation(name)}
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

export default CreateFile;
