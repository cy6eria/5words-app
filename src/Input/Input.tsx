import type { KeyboardEvent } from 'react';
import cx from 'classnames';
import './Input.css';
import { CellResult } from './types';

interface InputProps {
    isError: boolean;
    disabled: boolean;
    value: string;
    state: CellResult;
    onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
}

export const Input = (props: InputProps) => {
    const { isError, value, state, disabled, ...otherProps } = props;

    return (
        <div className={cx('input', {
            'input--disabled': disabled,
            'input--error': isError,
            'input--present': state.isPresent,
            'input--on-place': state.isOnPlace,
        })} tabIndex={disabled ? undefined : 0} {...otherProps}>
            {value}
        </div>
    );
}
