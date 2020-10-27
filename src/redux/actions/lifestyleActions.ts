export type LifeStyleAction = { type: 'SET_LIFESTYLE_ACTION', payload: string};

export const setLifeStyle = (newLifestyle: string): LifeStyleAction => ({
    type: 'SET_LIFESTYLE_ACTION',
    payload: newLifestyle
});
