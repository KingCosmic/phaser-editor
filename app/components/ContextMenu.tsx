import React, { useEffect } from 'react';

import styles from './contextmenu.css';

import Store, { Item } from '../stores/contextMenu';

const emptyState = {
  visible: false,
  x: 0,
  y: 0,
  items: []
};

type Data = {
  data: {
    label: string;
    color?: string;
    onClick(): void;
  };
  setState(state: object): void;
};

function ContextItem({ data, setState }: Data) {
  return (
    <div
      role="presentation"
      className={styles.item}
      onClick={() => {
        data.onClick();
        setState(emptyState);
      }}
      style={{ color: data.color ? data.color : '#b9bbbe' }}
    >
      {data.label}
    </div>
  );
}

type Props = {
  visible: boolean;
  x: number;
  y: number;
  items: Item[];
  setState?(state: object): void;
};

export function ContextMenu(props: Props) {
  const { visible, x, y, items, setState = () => {} } = props;

  useEffect(() => {
    document.addEventListener('click', () => {
      if (!visible) return;

      setState(emptyState);
    });
  });

  return (
    <div
      className={styles.container}
      style={{
        display: visible ? 'block' : 'none',
        position: 'absolute',
        top: `${y}px`,
        left: `${x + 5}px`
      }}
    >
      {items.map(item => {
        return <ContextItem data={item} key={item.label} setState={setState} />;
      })}
    </div>
  );
}

function StoreWrapper() {
  const { state, setState } = Store.useContainer();

  return (
    <ContextMenu
      visible={state.visible}
      items={state.items}
      x={state.x}
      y={state.y}
      setState={setState}
    />
  );
}

export default StoreWrapper;
