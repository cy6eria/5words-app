import { ButtonHTMLAttributes } from 'react';
import cx from 'classnames';
import './Button.css';

export const Button = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
    const { className, children, type, ...otherProps } = props;

    return (
        <button
            className={cx('button', className)}
            type={type ?? 'button'}
            {...otherProps}
        >
            {children}
        </button>
    );
}
