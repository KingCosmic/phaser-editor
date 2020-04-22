import React from 'react';

import SideBar from './SideBar';
import EditorManager from './EditorManager';
import Inspector from './Inspector';

import styles from './editor.css';

type Props = {
  setView(view: string): void;
};

function Editor(props: Props) {
  return (
    <div className={styles.container}>
      <SideBar />
      <EditorManager />
    </div>
  );
}

export default Editor;
