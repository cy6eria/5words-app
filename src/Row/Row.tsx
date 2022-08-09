import { useCallback, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { Input } from '../Input';
import { RowValue, RowResult } from './types';

interface RowProps {
    isError: boolean;
    index: number;
    active: boolean;
    value: RowValue;
    state: RowResult;
    onChange: (row: number, nextValue: RowValue) => void;
}

const cells = [0, 1, 2, 3, 4];

export const Row = (props: RowProps) => {
    const { isError, index, active, value, state, onChange } = props;

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
            {cells.map((index) => (
                <Input
                    key={index}
                    disabled={!active}
                    isError={isError}
                    data-index={index}
                    onKeyDown={handleKeyDown}
                    value={value[index]}
                    state={state[index]}
                />
            ))}
        </>
    );
}
