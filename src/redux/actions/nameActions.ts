type SetNameAction = { type: 'SET_NAME_ACTION', payload: string };
export type NameAction = SetNameAction;

export const setName = (newName: string): NameAction => ({
    type: 'SET_NAME_ACTION',
    payload: newName
});