export type PersonalAction = { type: 'SET_PERSONAL_ACTION', payload: string};

export const SetPersonal = (newPersonal: string): PersonalAction => ({
    type: 'SET_PERSONAL_ACTION',
    payload: newPersonal
});
