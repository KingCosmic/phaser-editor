import React from 'react';

import ProjectStore from '../stores/project';

import styles from './projectcard.css';

type Props = {
  project: {
    name: string;
    description: string;
    filePath: string;
  };
  setView(view: string): void;
};

function Card({ project, setView }: Props) {
  const { changeProject } = ProjectStore.useContainer();

  return (
    <div
      className={styles.container}
      onClick={() => {
        changeProject(project);
        setView('editor');
      }}
      role="presentation"
    >
      <h3 className={styles.title}>{project.name}</h3>
      <p className={styles.meta}>{project.description}</p>
      <div className={styles.arrow}>
        <svg viewBox="0 0 28 25">
          <path
            fill="#fff"
            d="M13.145 2.13l1.94-1.867 12.178 12-12.178 12-1.94-1.867 8.931-8.8H.737V10.93h21.339z"
          />
        </svg>
      </div>
    </div>
  );
}

export default Card;
