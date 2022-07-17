import { useState, useCallback, useRef } from 'react'
import dictionary from '../assets/dictionary.json'
import { Row } from '../Row';
import type { RowValue } from '../Row';
import './App.css';

type Matrix = [RowValue, RowValue, RowValue, RowValue, RowValue];

const dictionarySet = new Set(dictionary);
const rows = [0, 1, 2, 3, 4];
const emptyRow: RowValue = ['', '', '', '' , ''];
const defaultMatrix: Matrix = [emptyRow, emptyRow, emptyRow, emptyRow, emptyRow];

const generateMasterWord = () => dictionary[Math.ceil(Math.random() * dictionary.length)];

export const App = () => {
  const masterWord = useRef(generateMasterWord());
  const [isError, setIsError] = useState(false)
  const [activeRow, setActiveRow] = useState(0)
  const [matrix, setMatrix] = useState<Matrix>(defaultMatrix);

  const handleChange = useCallback((row: number, nextValue: RowValue) => {
    setMatrix((currentState) => {
        const nextState: Matrix = [...currentState];
        nextState[row] = nextValue;

        return nextState;
    });
    setIsError(false);
  }, []);

  const handleTest = useCallback(() => {
    const word = matrix[activeRow].join('').toLowerCase();
    const isValidWord = dictionarySet.has(word);

    if (isValidWord) {
        if (masterWord.current === word) {
            alert('Ура!');
            masterWord.current = generateMasterWord();
            setActiveRow(0);
            setMatrix(defaultMatrix);
        } else {
            setActiveRow(activeRow + 1);
        }
    } else {
        setIsError(true);
        console.error(`Слово ${word} не найдено в словаре.`)
    }
  }, [activeRow, matrix]);

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
                    onChange={handleChange}
                />
            ))}
        </div>

        <button tabIndex={0} className="submit" type="button" onClick={handleTest} disabled={!(activeRow <= 4)}>Проверить</button>
    </div>
  )
}
