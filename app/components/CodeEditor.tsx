import React from 'react';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/theme/neat.css';
import 'codemirror/mode/javascript/javascript';

import { UnControlled as CodeMirror } from 'react-codemirror2';

import { Editor } from '../stores/editor';

import styles from './codeeditor.css';

type Props = {
  data: Editor;
};

function CodeEditor({ data }: Props) {
  console.log(data);
  return (
    <CodeMirror
      className={styles.container}
      options={{
        mode: 'javascript',
        theme: 'material',
        lineNumbers: true
      }}
      onChange={(editor, data, value) => {}}
    />
  );
}

export default CodeEditor;
