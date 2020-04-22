import React, { useState } from 'react';

import styles from './labelinput.css';

type Props = {
  placeholder: string;
  name: string;
  value: string;
  onChange(value: string): void;
};

function LabelInput(props: Props) {
  const { placeholder, name, value, onChange } = props;

  const [val, setVal] = useState(value);

  return (
    <div className={styles.group}>
      <input
        type="input"
        className={styles.creationInputs}
        placeholder={placeholder}
        name={name}
        id={placeholder.toLowerCase()}
        required
        value={val}
        onChange={event => {
          setVal(event.target.value);
          onChange(event.target.value);
        }}
      />
      <label htmlFor={placeholder.toLowerCase()} className={styles.label}>
        {placeholder}
      </label>
    </div>
  );
}

export default LabelInput;
