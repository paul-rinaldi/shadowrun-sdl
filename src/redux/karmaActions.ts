import { makeLog } from './logActions';

type AdjustKarmaAction = { type: "ADJUST_KARMA_ACTION", payload: number };

export type KarmaAction = AdjustKarmaAction;

export const adjustKarma = (adjustment: number, reason: string, reasonType: string): KarmaAction => {
    makeLog(adjustment, reason, reasonType);
    return ({
        type: "ADJUST_KARMA_ACTION",
        payload: adjustment
    });
}