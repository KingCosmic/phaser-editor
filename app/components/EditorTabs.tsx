import React from 'react';

import Tab from './EditorTab';

import { Editor } from '../stores/editor';

type Props = {
  editors: Array<Editor>;
  activeEditor: string;
  setActive(id: string): void;
};

function EditorTabs({ editors, setActive, activeEditor }: Props) {
  return (
    <div
      style={{
        display: 'flex',
        height: '41px'
      }}
    >
      {editors.map(editor => {
        return (
          <Tab
            data={editor}
            key={editor.title}
            setActive={setActive}
            activeEditor={activeEditor}
          />
        );
      })}
    </div>
  );
}

export default EditorTabs;
