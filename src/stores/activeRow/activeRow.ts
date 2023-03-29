import { createStore, sample } from "effector";
import { nextRow, newGame } from "../../events";

export const $activeRow = createStore(0);

sample({
    clock: nextRow,
    source: $activeRow,
    target: $activeRow,
    fn: (activeRow, hasError) => (hasError ? activeRow : activeRow + 1),
});

sample({
    clock: newGame,
    fn: () => 0,
    target: $activeRow,
});
