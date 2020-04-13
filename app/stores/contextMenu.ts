import { useState } from 'react';
import { createContainer } from 'unstated-next';

export type Item = {
  label: string;
  color?: string;
  onClick(): void;
};

type State = {
  x: number;
  y: number;
  items: Item[];
  visible: boolean;
};

const InitialState: State = {
  x: 0,
  y: 0,
  items: [],
  visible: false
};

function useCounter(initialState: State = InitialState) {
  const [state, setState] = useState(initialState);

  return { state, setState };
}

const Counter = createContainer(useCounter);
export default Counter;
