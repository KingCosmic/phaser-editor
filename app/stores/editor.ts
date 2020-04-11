import { useState } from 'react';
import { createContainer } from 'unstated-next';

export type Editor = {
  title: string;
  type: string;
  path: string;
  modified: boolean;
};

type State = Array<Editor>;

const initState: State = [];

function useCounter(initialState: State = initState) {
  const [editors, setEditors] = useState(initialState);

  const addEditor = (name: string, path: string) => {
    if (editors.find(editor => editor.title === name)) return;

    setEditors([
      ...editors,
      {
        title: name,
        type: name.split('.')[1] === 'scene' ? 'scene' : 'code',
        modified: false,
        path
      }
    ]);
  };

  return { editors, setEditors, addEditor };
}

const Counter = createContainer(useCounter);
export default Counter;
