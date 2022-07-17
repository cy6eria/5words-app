import type { KeyboardEvent } from 'react';
import cx from 'classnames';
import './Input.css';

interface InputProps {
    isError: boolean;
    disabled: boolean;
    value: string;
    onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
}

export const Input = (props: InputProps) => {
    const { isError, value, disabled, ...otherProps } = props;

    return (
        <div className={cx('input', {
            'input--disabled': disabled,
            'input--error': isError,
        })} tabIndex={disabled ? undefined : 0} {...otherProps}>
            {value}
        </div>
    );
}
