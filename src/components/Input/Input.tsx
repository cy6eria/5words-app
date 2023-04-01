import { useCallback, useEffect, useRef } from 'react';
import type { KeyboardEvent } from 'react';
import { useStoreMap, useStore } from 'effector-react';
import cx from 'classnames';
import { $words, $activeRow, $error, $masterWord, $isGameComplete, $letters } from '../../stores';
import { setLetter, submit } from '../../events';
import './Input.css';

interface InputProps {
    rowIndex: number;
    colIndex: number;
}

export const Input = (props: InputProps) => {
    const { rowIndex, colIndex } = props;
    const element = useRef(null);
    const letters = useStore($letters);
    const isGameComplete = useStore($isGameComplete);
    const masterWord = useStore($masterWord);
    const error = useStore($error);
    const activeRowIndex = useStore($activeRow);
    const letter = useStoreMap({
        store: $words,
        keys: [rowIndex, colIndex],
        fn: (state, [currentRowIndex, currentColIndex]) => state[currentRowIndex][currentColIndex],
    });

    const isActiveRow = activeRowIndex === rowIndex;
    const isPassedRow = activeRowIndex > rowIndex;
    const isPresent = isPassedRow && letters.present.has(letter);
    const isOnPlace = isPassedRow && masterWord[colIndex] === letter;

    useEffect(() => {
        if (isActiveRow && colIndex === 0) {
            (element.current as HTMLElement | null)?.focus();
        }
    }, [colIndex, isActiveRow]);

    const handleKeyDown = useCallback((e: KeyboardEvent<HTMLElement>) => {
        const { key, currentTarget } = e;

        if (key === 'Enter') {
            submit();
            return;
        }

        if (key === 'Backspace') {
            setLetter({ position: [rowIndex, colIndex], value: '' });

            if (currentTarget.previousSibling && colIndex > 0) {
                (currentTarget.previousSibling as HTMLElement).focus();
            }

            return;
        }

        if (/[А-ЯЁ]/.test(key.toLocaleUpperCase())) {
            setLetter({ position: [rowIndex, colIndex], value: key.toLowerCase() });

            if (currentTarget.nextSibling && colIndex < 4) {
                (currentTarget.nextSibling as HTMLElement).focus();
            }
        }
    }, [rowIndex, colIndex]);

    return (
        <div
            ref={element}
            className={cx('input', {
                'input--disabled': !isActiveRow || isGameComplete,
                'input--error': error && isActiveRow,
                'input--present': isPresent,
                'input--on-place': isOnPlace,
            })}
            tabIndex={!isActiveRow || isGameComplete ? undefined : 0}
            data-row-index={rowIndex}
            data-col-index={colIndex}
            onKeyDown={handleKeyDown}
        >
            {letter}
        </div>
    );
}
