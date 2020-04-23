import React from 'react';

import { Editor } from '../stores/editor';
import styles from './editortab.css';

type Props = {
  data: Editor;
  activeEditor: string;
  setActive(id: string): void;
};

function EditorTab({ data, setActive, activeEditor }: Props) {
  return (
    <div
      style={{ color: activeEditor === data.id ? 'white' : '' }}
      className={styles.container}
      onClick={() => setActive(data.id)}
      role="presentation"
    >
      {data.title}
    </div>
  );
}

export default EditorTab;
