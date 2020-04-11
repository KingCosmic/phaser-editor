import { useState } from 'react';
import { createContainer } from 'unstated-next';

type State = {
  x: number;
  y: number;
  items: Array<{
    label: string;
    color?: string;
    onClick(): void;
  }>;
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
