import { createStore, sample } from "effector";
import { $activeRow } from "../activeRow";
import { $words } from "../words";
import { $masterWord } from "../masterWord";

export const $letters = createStore({
    used: new Set(),
    present: new Set(),
    found: new Set(),
});

sample({
    clock: $activeRow,
    source: { activeRow: $activeRow, words: $words, masterWord: $masterWord },
    fn: ({ activeRow, words, masterWord }) => {
        const part = words.slice(0, activeRow);

        const nextState = {
            used: new Set(),
            present: new Set(),
            found: new Set(),
        };

        part.forEach((row) => {
            row.forEach((letter, index) => {
                nextState.used.add(letter);

                if (masterWord.includes(letter)) {
                    nextState.present.add(letter);

                    if (masterWord[index] === letter) {
                        nextState.found.add(letter);
                    }
                }
            });
        });

        return nextState;
    },
    target: $letters,
});
