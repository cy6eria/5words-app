import { useStore } from 'effector-react';
import { submit, newGame } from '../../events';
import { $isGameComplete } from '../../stores';

interface ActionsProps {
    className: string;
}

export const Actions = (props: ActionsProps) => {
    const { className } = props;
    const isGameComplete = useStore($isGameComplete);

    return (
        <div className={className}>
            <button
                tabIndex={0}
                className="button"
                type="button"
                onClick={() => newGame()}
            >
                Заново
            </button>

            <button
                tabIndex={0}
                className="button"
                type="button"
                onClick={() => submit()}
                disabled={isGameComplete}
            >
                Проверить
            </button>
        </div>
    );
}
