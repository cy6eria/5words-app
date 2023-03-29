import { useStore } from 'effector-react'
import { $isGameComplete, $hadFoundWord } from '../../stores'

export const ResultDialog = () => {
    const isGameComplete = useStore($isGameComplete);
    const hadFoundWord = useStore($hadFoundWord);

    return isGameComplete ? (
        <dialog open>
            {hadFoundWord ? 'Поздравляем!' : 'Сорян :('}
        </dialog>
    ) : null;
}
