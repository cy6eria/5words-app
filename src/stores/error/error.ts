import { createStore, sample } from "effector";
import dictionary from "../../assets/dictionary.json";
import { LETTERS } from "../../constants";
import { checkWord, nextRow, setLetter, newGame } from "../../events";

export const $error = createStore(false);

sample({
    clock: checkWord,
    fn: (word) => {
        const isWord = word.length === LETTERS;

        if (isWord) {
            return !dictionary.includes(word);
        }

        return !isWord;
    },
    target: [$error, nextRow],
});

sample({
    clock: [newGame, setLetter],
    fn: () => false,
    target: $error,
});
