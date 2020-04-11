import React from 'react';

import Tab from './EditorTab';

import { Editor } from '../stores/editor';

type Props = {
  editors: Array<Editor>;
};

function EditorTabs({ editors }: Props) {
  return (
    <div
      style={{
        display: 'flex'
      }}
    >
      {editors.map(editor => {
        return <Tab data={editor} key={editor.title} />;
      })}
    </div>
  );
}

export default EditorTabs;
