import { createStore, sample } from "effector";
import { checkWord, newGame } from "../../events";
import { $masterWord } from "../masterWord";

export const $hadFoundWord = createStore(false);

sample({
    clock: checkWord,
    source: $masterWord,
    fn: (word, masterWord) => {
        return masterWord === word;
    },
    target: $hadFoundWord,
});

sample({
    clock: newGame,
    fn: () => false,
    target: $hadFoundWord,
});
