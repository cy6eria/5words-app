import { createEvent } from "effector";

export const newGame = createEvent();

export const submit = createEvent();

export const checkWord = createEvent<string>();

export const nextRow = createEvent<boolean>();

export const setLetter = createEvent<{
    position: [number, number];
    value: string;
}>();
