import { makeLog } from './logActions';

type AdjustNuyenAction = { type: "ADJUST_NUYEN_ACTION", payload: number };

export type NuyenAction = AdjustNuyenAction;

export const adjustNuyen = (adjustment: number, reason: string, reasonType: string): NuyenAction => {
    makeLog(adjustment, reason, reasonType);
    return ({
        type: "ADJUST_NUYEN_ACTION",
        payload: adjustment
    });
}