import { makeLog } from './logActions';

type AdjustKarmaAction = { type: "ADJUST_KARMA_ACTION", payload: number };
type SetKarmaAction = { type: 'SET_KARMA_ACTION', payload: number};

export type KarmaAction = AdjustKarmaAction | SetKarmaAction;

export const adjustKarma = (adjustment: number): KarmaAction => {
    return ({
        type: "ADJUST_KARMA_ACTION",
        payload: adjustment
    });
}

export const setKarma = (value: number): KarmaAction => ({
    type: 'SET_KARMA_ACTION',
    payload: value
});
