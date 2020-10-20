type SetIDAction = {type: 'SET_ID_ACTION', payload: string}
export type IDAction = SetIDAction;

export const setID = (newId: string): SetIDAction => ({
    type: 'SET_ID_ACTION',
    payload: newId
});