import React from 'react';

import Tabs from './EditorTabs';

import CodeEditor from './CodeEditor';
import SceneEditor from './SceneEditor';

import Store from '../stores/editor';

import styles from './editormanager.css';

function EditorManager() {
  const { editors } = Store.useContainer();

  return (
    <div className={styles.container}>
      <Tabs editors={editors} />
      {editors.map(editor => {
        switch (editor.type) {
          case 'code':
            return <CodeEditor data={editor} />;
          case 'scene':
            return <SceneEditor data={editor} />;
          default:
            return '';
        }
      })}
    </div>
  );
}

export default EditorManager;
