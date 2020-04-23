import React from 'react';

import Tabs from './EditorTabs';

import CodeEditor from './CodeEditor';
import SceneEditor from './SceneEditor';

import Store from '../stores/editor';
import ProjectStore from '../stores/project';

import styles from './editormanager.css';

function EditorManager() {
  const { editors, activeEditor, setActive } = Store.useContainer();
  const { currentProject } = ProjectStore.useContainer();

  return (
    <div className={styles.container}>
      <Tabs
        editors={editors}
        setActive={setActive}
        activeEditor={activeEditor}
      />
      {editors.map(editor => {
        if (editor.id !== activeEditor) return null;

        switch (editor.type) {
          case 'code':
            return <CodeEditor data={editor} />;
          case 'scene':
            return (
              <SceneEditor data={editor} currentProject={currentProject} />
            );
          default:
            return '';
        }
      })}
    </div>
  );
}

export default EditorManager;
