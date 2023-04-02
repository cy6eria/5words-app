import { PropsWithChildren } from 'react';
import cx from 'classnames';
import './Dialog.css';

interface DialogProps {
    className?: string;
    isOpen: boolean;
}

export const Dialog = ({ isOpen, className, children }: PropsWithChildren<DialogProps>) => {
    return (
        <div className="overlay">
            <dialog className={cx('dialog', className)} open={isOpen}>
                {children}
            </dialog>
        </div>
    );
}
