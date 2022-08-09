import { useRef, useState, useCallback } from 'react';
import type { CellResult } from '../Input';
import type { RowValue, RowResult } from '../Row';
import type { Matrix, ResultMatrix } from './types';
import dictionary from '../assets/dictionary.json';

const emptyRow: RowValue = ['', '', '', '' , ''];
const defaultMatrix: Matrix = [emptyRow, emptyRow, emptyRow, emptyRow, emptyRow];
const createDefaultCellResult = (): CellResult => ({
    isPresent: false,
    isOnPlace: false,
});
const defaultRowResult: RowResult = [createDefaultCellResult(), createDefaultCellResult(), createDefaultCellResult(), createDefaultCellResult(), createDefaultCellResult()];
const defaultResultMatrix: ResultMatrix = [defaultRowResult, defaultRowResult, defaultRowResult, defaultRowResult, defaultRowResult];

const dictionarySet = new Set(dictionary);
const generateMasterWord = () => dictionary[Math.ceil(Math.random() * dictionary.length)];

export const useLogic = () => {
    const masterWord = useRef(generateMasterWord());
    const [isComplete, setIsComplete] = useState(false);
    const [isError, setIsError] = useState(false);
    const [activeRow, setActiveRow] = useState(0);
    const [matrix, setMatrix] = useState<Matrix>(defaultMatrix);
    const [resultMatrix, setResultMatrix] = useState<ResultMatrix>(defaultResultMatrix);

    const handleStartNewGame = useCallback(() => {
        masterWord.current = generateMasterWord();
        setActiveRow(0);
        setIsComplete(false);
        setMatrix(defaultMatrix);
        setResultMatrix(defaultResultMatrix);
        setIsError(false);
    }, []);

    const handleTest = useCallback(() => {
        const word = matrix[activeRow].join('').toLowerCase();
        const isValidWord = dictionarySet.has(word);
    
        if (isValidWord) {
            if (masterWord.current === word) {
                setIsComplete(true);
            } else {
                setActiveRow(activeRow + 1);
                setResultMatrix((currentResultMatrix) => {
                    const nextResultMatrix: ResultMatrix = [...currentResultMatrix];
                    const masterWordSet = new Set(masterWord.current.split(''));
                    const rowState = matrix[activeRow];

                    nextResultMatrix[activeRow] = rowState.map((i, index) => ({
                        isPresent: masterWordSet.has(i),
                        isOnPlace: masterWord.current[index] === i,
                    })) as RowResult;

                    return nextResultMatrix;
                });
            }
        } else {
            setIsError(true);
            console.error(`Слово ${word} не найдено в словаре.`)
        }
    }, [activeRow, matrix]);

    const handleChange = useCallback((row: number, nextValue: RowValue) => {
        setMatrix((currentState) => {
            const nextState: Matrix = [...currentState];
            nextState[row] = nextValue;

            return nextState;
        });
        setIsError(false);
    }, []);

    return {
        activeRow,
        matrix,
        resultMatrix,
        isError,
        isComplete,
        onChange: handleChange,
        onTest: handleTest,
        onStartNewGame: handleStartNewGame,
    };
}
