import { ChangeEventHandler } from 'react';
import { ReactComponent as CheckIcon } from '../../../assets/icons/check.svg';
import * as classNames from 'classnames';
import styles from './Checkbox.module.scss';

type Props = {
  name?: string;
  className?: string;
  checked?: boolean;
  value?: string | ReadonlyArray<string> | number;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

const Checkbox = ({ name, className, checked, value, onChange }: Props) => {
  return (
    <label
      className={classNames(
        styles.checkbox,
        {
          [styles.checked]: checked,
        },
        className,
      )}
    >
      <span className={styles.checkbox__switch}>
        <CheckIcon className={styles.checkbox__icon} />
      </span>
      <input
        hidden
        type="checkbox"
        name={name}
        checked={checked}
        value={value}
        onChange={onChange}
      />
    </label>
  );
};

export default Checkbox;
