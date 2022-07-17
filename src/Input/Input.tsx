import type { KeyboardEvent } from 'react';
import cx from 'classnames';
import './Input.css';

interface InputProps {
    disabled: boolean;
    value: string;
    onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
}

export const Input = (props: InputProps) => {
    const { value, disabled, ...otherProps } = props;

    return (
        <div className={cx('input', {
            'input--disabled': disabled,
        })} tabIndex={disabled ? undefined : 0} {...otherProps}>
            {value}
        </div>
    );
}
