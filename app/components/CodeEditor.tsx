import React, { Component, createRef } from 'react';
import CodeMirror from 'codemirror';
import fs from 'fs';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/theme/material.css';

import { Editor } from '../stores/editor';

type Props = {
  data: Editor;
};

class CodeEditor extends Component<Props> {
  mirrorRef: React.Ref<any>;

  defaultValue: string;

  codeMirror?: object;

  constructor(props: Props) {
    super(props);

    this.codeMirror = undefined;
    this.mirrorRef = createRef();
    console.log('path', props.data.path);
    this.defaultValue = fs.readFileSync(props.data.path, 'utf8');
  }

  componentDidMount() {
    if (this.mirrorRef.current) {
      this.codeMirror = CodeMirror.fromTextArea(this.mirrorRef.current, {
        mode: 'javascript',
        lineNumbers: true,
        theme: 'material'
      });
      this.codeMirror.setValue(this.defaultValue);
    }
  }

  componentWillUnmount() {
    // is there a lighter-weight way to remove the cm instance?
		if (this.codeMirror) {
			this.codeMirror.toTextArea();
		}
  }

  render() {
    return <textarea ref={this.mirrorRef} />;
  }
}

export default CodeEditor;
