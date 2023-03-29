import { createStore, sample } from "effector";
import dictionary from "../../assets/dictionary.json";
import { newGame } from "../../events";

const getMasterWord = () =>
    dictionary[Math.ceil(Math.random() * dictionary.length)];

export const $masterWord = createStore(getMasterWord());

sample({
    clock: newGame,
    fn: getMasterWord,
    target: $masterWord,
});
