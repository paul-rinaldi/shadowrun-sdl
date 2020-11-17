type AdjustNuyenAction = { type: "ADJUST_NUYEN_ACTION", payload: number };
type SetNuyenAction = { type: "SET_NUYEN_ACTION", payload: number };

export type NuyenAction = AdjustNuyenAction | SetNuyenAction;

export const adjustNuyen = (adjustment: number): NuyenAction => {
    return ({
        type: "ADJUST_NUYEN_ACTION",
        payload: adjustment
    });
}

export const setNuyen = (total: number): NuyenAction => ({
    type: 'SET_NUYEN_ACTION',
    payload: total
})