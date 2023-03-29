import { createStore, sample } from "effector";
import { ROWS } from "../../constants";
import { newGame } from "../../events";
import { $activeRow } from "../activeRow";
import { $hadFoundWord } from "../hadFoundWord";

export const $isGameComplete = createStore(false);

sample({
    clock: $activeRow,
    fn: (activeRow) => activeRow === ROWS,
    target: $isGameComplete,
});

sample({
    clock: $hadFoundWord,
    fn: () => true,
    target: $isGameComplete,
});

sample({
    clock: newGame,
    fn: () => false,
    target: $isGameComplete,
});
