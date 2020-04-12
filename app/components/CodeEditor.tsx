import React from 'react';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import { Editor } from '../stores/editor';
import './codeeditor.css';

type Props = {
  data: Editor;
};

function CodeEditor({ data }: Props) {
  console.log(data);
  return (
    <CodeMirror
      options={{
        mode: 'javascript',
        theme: 'material',
        lineNumbers: true
      }}
    />
  );
}

export default CodeEditor;
