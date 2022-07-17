import { useCallback, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { Input } from '../Input';

export type RowValue = [string, string, string, string, string];

interface RowProps {
    index: number;
    active: boolean;
    value: RowValue;
    onChange: (row: number, nextValue: RowValue) => void;
}

export const Row = (props: RowProps) => {
    const { index, active, value, onChange } = props;

    const handleKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
        const { key, currentTarget } = e;
        const isValidSymbol = /[А-Я]/.test(key.toLocaleUpperCase());

        if (isValidSymbol || key === 'Backspace') {
            const nextState: RowValue = [...value];
            const letterIndex = Number(currentTarget.dataset.index);

            if (isValidSymbol) {
                nextState[letterIndex] = key;

                if (currentTarget.nextSibling && letterIndex < 4) {
                    currentTarget.nextSibling.focus();
                } 
            } else {
                nextState[letterIndex] = '';

                if (currentTarget.previousSibling && letterIndex > 0) {
                    currentTarget.previousSibling.focus();
                }
            }

            onChange(index, nextState);
        }
    }, [index, value, onChange]);

    return (
        <>
            <Input disabled={!active} data-index={0} onKeyDown={handleKeyDown} value={value[0]} />
            <Input disabled={!active} data-index={1} onKeyDown={handleKeyDown} value={value[1]} />
            <Input disabled={!active} data-index={2} onKeyDown={handleKeyDown} value={value[2]} />
            <Input disabled={!active} data-index={3} onKeyDown={handleKeyDown} value={value[3]} />
            <Input disabled={!active} data-index={4} onKeyDown={handleKeyDown} value={value[4]} />
        </>
    );
}
