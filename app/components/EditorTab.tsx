import React from 'react';

import { Editor } from '../stores/editor';
import styles from './editortab.css';

type Props = {
  data: Editor;
};

function EditorTab({ data }: Props) {
  return <div className={styles.container}>{data.title}</div>;
}

export default EditorTab;
