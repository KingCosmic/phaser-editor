import { useState } from 'react';
import { createContainer } from 'unstated-next';

import shortid from 'shortid';

export type Editor = {
  title: string;
  type: string;
  path: string;
  modified: boolean;
  id: string;
};

type State = Array<Editor>;

const initState: State = [];

function useCounter(initialState: State = initState) {
  const [editors, setEditors] = useState(initialState);
  const [activeEditor, setActiveEditor] = useState('');

  const addEditor = (name: string, path: string) => {
    if (editors.find(editor => editor.title === name)) return;

    const id = shortid.generate();

    setEditors([
      ...editors,
      {
        title: name,
        type: name.split('.')[1] === 'scene' ? 'scene' : 'code',
        modified: false,
        id,
        path
      }
    ]);
    setActiveEditor(id);
  };

  const setActive = (id: string) => {
    if (!editors.find(editor => editor.id === id)) return;

    setActiveEditor(id);
  };

  return { editors, setEditors, addEditor, activeEditor, setActive };
}

const Counter = createContainer(useCounter);
export default Counter;
