import React, { useRef, useEffect, useLayoutEffect } from 'react';
import CodeMirror from 'codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/theme/material.css';

import { Editor } from '../stores/editor';

type Props = {
  data: Editor;
};

function CodeEditor({ data }: Props) {
  const codeEditor = useRef<HTMLTextAreaElement>(null);
  useLayoutEffect(() => {
    if (codeEditor.current) {
      CodeMirror.fromTextArea(codeEditor.current, {
        mode: 'javascript',
        lineNumbers: true,
        theme: 'material'
      });
    }
  }, []);
  return <textarea ref={codeEditor} />;
}

export default CodeEditor;
