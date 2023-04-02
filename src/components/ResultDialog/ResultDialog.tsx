import { useStore } from 'effector-react'
import { $isGameComplete, $hadFoundWord, $masterWord } from '../../stores'
import { newGame } from '../../events';
import { Dialog } from '../Dialog'
import { Word } from '../Word'
import { Button } from '../Button'
import './ResultDialog.css';

export const ResultDialog = () => {
    const isGameComplete = useStore($isGameComplete);
    const hadFoundWord = useStore($hadFoundWord);
    const masterWord = useStore($masterWord);

    return isGameComplete ? (
        <Dialog isOpen className="result">
            <Word word={masterWord} right className="result__word" />
            <h3 className="result__title">{hadFoundWord ? '🥳' : '😔'}</h3>
            <p className="result__message">{hadFoundWord ? 'Вы угадали слово! Сможете еще раз?' : 'Вы не смогли угадать слово, но не отчаивайтесь. Попробуйте еще раз!'}</p>
            <Button onClick={() => newGame()}>Новая игра</Button>
        </Dialog>
    ) : null;
}
