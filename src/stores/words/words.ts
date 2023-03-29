import { createStore, sample } from "effector";
import { setLetter, newGame, submit, checkWord } from "../../events";
import { $activeRow } from "../activeRow";

type Word = [string, string, string, string, string];

const emptyRow: Word = ["", "", "", "", ""];
const defaultMatrix = [
    emptyRow,
    emptyRow,
    emptyRow,
    emptyRow,
    emptyRow,
    emptyRow,
];

export const $words = createStore(defaultMatrix);

sample({
    clock: setLetter,
    source: $words,
    fn: (state, { position, value }) => {
        const [row, col] = position;
        const nextState = [...state];
        nextState[row] = [...state[row]];
        nextState[row][col] = value;

        return nextState;
    },
    target: $words,
});

sample({
    clock: submit,
    source: {
        activeRow: $activeRow,
        words: $words,
    },
    fn: ({ activeRow, words }) => words[activeRow]?.join("").toLowerCase(),
    target: checkWord,
});

sample({
    clock: newGame,
    fn: () => defaultMatrix,
    target: $words,
});
