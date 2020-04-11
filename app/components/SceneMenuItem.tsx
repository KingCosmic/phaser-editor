import React from 'react';

import styles from './scenemenuitem.css';

type Props = {
  children: string;
  onContext?(x: number, y: number): void;
  clickHandler?(): void;
};

function SceneMenuItem({
  children,
  onContext = () => {},
  clickHandler = () => {}
}: Props) {
  return (
    <div
      className={styles.container}
      onClick={clickHandler}
      onKeyDown={() => {}}
      role="presentation"
      onContextMenu={e => {
        const clickX = e.clientX;
        const clickY = e.clientY;
        onContext(clickX, clickY);
        e.preventDefault();
      }}
    >
      {children}
    </div>
  );
}

export default SceneMenuItem;
