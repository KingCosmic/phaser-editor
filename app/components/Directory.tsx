import React, { ReactNode, useState } from 'react';

type Props = {
  children: ReactNode;
  label: string;
  onContext?(x: number, y: number): void;
};

function Directory(props: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const { onContext = () => {}, label, children } = props;

  return (
    <div
      style={{
        padding: '5px 10px'
      }}
    >
      <div
        onClick={() => setIsOpen(!isOpen)}
        onContextMenu={e => {
          const clickX = e.clientX;
          const clickY = e.clientY;
          onContext(clickX, clickY);
          e.preventDefault();
        }}
        role="presentation"
        style={{ cursor: 'pointer', userSelect: 'none' }}
      >
        <div style={{ float: 'left', marginRight: '10px' }}>
          {!isOpen && <span>&#9650;</span>}
          {isOpen && <span>&#9660;</span>}
        </div>
        {label}
      </div>
      {isOpen && (
        <div
          style={{
            paddingLeft: '10px'
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}

export default Directory;
