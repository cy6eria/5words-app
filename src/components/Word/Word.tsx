import cx from 'classnames';
import './Word.css';

interface WordProps {
    word: string;
    right?: boolean;
    className?: string;
}

export const Word = ({ word, right, className }: WordProps) => {
    return (
        <div className={cx('word', className, { ['word--right']: right })}>
            <div>{word[0]}</div>
            <div>{word[1]}</div>
            <div>{word[2]}</div>
            <div>{word[3]}</div>
            <div>{word[4]}</div>
        </div>
    );
}
