import { useCallback } from 'react';
import type { SyntheticEvent } from 'react';
import { useStore } from 'effector-react';
import cx from 'classnames';
import { $letters } from '../../stores';
import { setLetter, submit } from '../../events';
import './Keyboard.css';

const rows = [
    ['й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ'],
    ['ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э'],
    ['←', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', 'ё', '↵'],
]

export const Keyboard = () => {
    const { used, present, found } = useStore($letters);

    const handleKeyClick = useCallback((e: SyntheticEvent<EventTarget>) => {
        e.preventDefault();

        if (e.target instanceof HTMLButtonElement) {
            const { letter } = e.target.dataset;
            const currentCell = document.activeElement as HTMLElement;
            const { rowIndex, colIndex } = currentCell.dataset;

            if (letter && rowIndex && colIndex) {
                const position: [number, number] = [Number(rowIndex), Number(colIndex)];

                if (letter === '←') {
                    setLetter({ position, value: '' });

                    if (currentCell.previousSibling && position[1] > 0) {
                        (currentCell.previousSibling as HTMLElement).focus();
                    }

                    return;
                }

                if (letter === '↵') {
                    submit();
                    return;
                }

                if (letter && /[а-яё]/.test(letter)) {
                    setLetter({ position, value: letter });

                    if (currentCell.nextSibling && position[1] < 4) {
                        (currentCell.nextSibling as HTMLElement).focus();
                    }
                }
            }
        }
    }, []);

    return (
        <>
            {rows.map((row, index) => (
                <div key={index} className="keyboard__row">
                    {row.map((sym) => (
                        <button
                            key={sym}
                            className={cx('keyboard__sym', {
                                ['keyboard__sym--used']: used.has(sym),
                                ['keyboard__sym--in-word']: present.has(sym),
                                ['keyboard__sym--on-place']: found.has(sym),
                            })}
                            onMouseDown={handleKeyClick}
                            data-letter={sym}
                        >
                            {sym}
                        </button>
                    ))}
                </div>
            ))}
        </>
    );
}
