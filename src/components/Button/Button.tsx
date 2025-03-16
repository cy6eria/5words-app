import { ButtonHTMLAttributes } from 'react';
import cx from 'classnames';
import './Button.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    size?: 'small' | 'normal';
}

export const Button = (props: ButtonProps) => {
    const { className, children, type, size = 'normal', ...otherProps } = props;

    return (
        <button
            className={cx('button', { 'button--small': size === 'small' }, className)}
            type={type ?? 'button'}
            {...otherProps}
        >
            {children}
        </button>
    );
}
