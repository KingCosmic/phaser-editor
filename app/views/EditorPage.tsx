import React from 'react';

import Editor from '../components/Editor';
import ContextMenu from '../components/ContextMenu';

import ContextMenuStore from '../stores/contextMenu';

type Props = {
  setView(view: string): void;
};

export default function ProjectsPage({ setView }: Props) {
  return (
    <ContextMenuStore.Provider>
      <ContextMenu />
      <Editor setView={setView} />
    </ContextMenuStore.Provider>
  );
}
