import { useEffect } from 'react'
import { Row } from '../Row';
import type { RowValue, RowResult } from '../Row';
import { useLogic } from './useLogic';
import { Matrix, ResultMatrix } from './types';
import './App.css';

const rows = [0, 1, 2, 3, 4];

export const App = () => {
    const {
        activeRow,
        matrix,
        resultMatrix,
        isError,
        isComplete,
        onChange,
        onTest,
        onStartNewGame,
    } = useLogic();

    useEffect(() => {
        if (isComplete) {
            alert('Поздравляю!');
        }
    }, [isComplete]);

    return (
        <div className="app">
            <div className="board">
                {rows.map((val) => (
                    <Row
                        key={val}
                        active={activeRow === val}
                        index={val}
                        isError={isError}
                        value={matrix[val]}
                        state={resultMatrix[val]}
                        onChange={onChange}
                    />
                ))}
            </div>

            <div className="actions">
                <button
                    tabIndex={0}
                    className="button"
                    type="button"
                    onClick={onStartNewGame}
                >
                    Заново
                </button>

                <button
                    tabIndex={0}
                    className="button"
                    type="button"
                    onClick={onTest}
                    disabled={activeRow > 4}
                >
                    Проверить
                </button>
            </div>
        </div>
    )
}
