import { useState, useCallback } from 'react'
import dictionary from '../assets/dictionary.json'
import { Row } from '../Row';
import type { RowValue } from '../Row';
import './App.css';

type Matrix = [RowValue, RowValue, RowValue, RowValue, RowValue];

const dictionarySet = new Set(dictionary);
const rows = [0, 1, 2, 3, 4];
const emptyRow: RowValue = ['', '', '', '' , ''];

export const App = () => {
  const [activeRow, setActiveRow] = useState(0)
  const [matrix, setMatrix] = useState<Matrix>([emptyRow, emptyRow, emptyRow, emptyRow, emptyRow]);

  const handleChange = useCallback((row: number, nextValue: RowValue) => {
    setMatrix((currentState) => {
        const nextState: Matrix = [...currentState];
        nextState[row] = nextValue;

        return nextState;
    })
  }, []);

  const handleTest = useCallback(() => {
    const word = matrix[activeRow].join('').toLowerCase();
    const isValidWord = dictionarySet.has(word);

    if (isValidWord) {
        setActiveRow(activeRow + 1);
    } else {
        console.error(`Слово ${word} не найдено в словаре.`)
    }
  }, [activeRow, matrix]);

  return (
    <div className="app">
        <div className="board">
            {rows.map((val) => (
                <Row key={val} active={activeRow === val} index={val} value={matrix[val]} onChange={handleChange} />
            ))}
        </div>

        <button tabIndex={0} className="submit" type="button" onClick={handleTest} disabled={!(activeRow <= 4)}>Проверить</button>
    </div>
  )
}
