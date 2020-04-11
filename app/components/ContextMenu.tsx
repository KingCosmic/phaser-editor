import React, { useEffect } from 'react';

import styles from './contextmenu.css';

import Store from '../stores/contextMenu';

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
  setContext(state: object): void;
};

function Item({ data, setContext }: Data) {
  return (
    <div
      role="presentation"
      className={styles.item}
      onClick={() => {
        data.onClick();
        setContext(emptyState);
      }}
      style={{ color: data.color ? data.color : '#b9bbbe' }}
    >
      {data.label}
    </div>
  );
}

function ContextMenu() {
  const { state, setState } = Store.useContainer();

  useEffect(() => {
    document.addEventListener('click', () => {
      if (!state.visible) return;

      setState(emptyState);
    });
  });

  return (
    <div
      className={styles.container}
      style={{
        display: state.visible ? 'block' : 'none',
        position: 'absolute',
        top: `${state.y}px`,
        left: `${state.x + 5}px`
      }}
    >
      {state.items.map(item => {
        return <Item data={item} key={item.label} setContext={setState} />;
      })}
    </div>
  );
}

export default ContextMenu;
