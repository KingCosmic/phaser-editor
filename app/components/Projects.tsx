import * as React from 'react';

import Store, { Project } from '../stores/projects';

import Card from './ProjectCard';
import CreateProject from './CreateProject';

import styles from './projects.css';

type Props = {
  setView(view: string): void;
};

function Projects({ setView }: Props) {
  const [isCreating, setIsCreating] = React.useState(false);

  const { projects, addProject } = Store.useContainer();

  return (
    <div className={styles.container}>
      {projects.map((project: Project, index) => {
        // eslint-disable-next-line react/no-array-index-key
        return <Card key={index} project={project} setView={setView} />;
      })}
      <div
        className={styles.button}
        onKeyDown={() => {}}
        onClick={() => setIsCreating(true)}
        role="button"
        tabIndex={0}
      >
        New
      </div>

      <CreateProject
        isMaking={isCreating}
        setIsMaking={setIsCreating}
        setView={setView}
        addProject={addProject}
      />
    </div>
  );
}

export default Projects;
