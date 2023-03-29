import { useStore } from 'effector-react';
import cx from 'classnames';
import { $letters } from '../../stores';
import './Keyboard.css';

const rows = [
    ['й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ'],
    ['ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э'],
    ['я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', 'ё'],
]

export const Keyboard = () => {
    const { used, present, found } = useStore($letters);

    return (
        <>
            {rows.map((row, index) => (
                <div key={index} className="keyboard__row">
                    {row.map((sym) => (
                        <button
                            disabled
                            key={sym}
                            className={cx('keyboard__sym', {
                                ['keyboard__sym--used']: used.has(sym),
                                ['keyboard__sym--in-word']: present.has(sym),
                                ['keyboard__sym--on-place']: found.has(sym),
                            })}
                        >
                            {sym}
                        </button>
                    ))}
                </div>
            ))}
        </>
    );
}
