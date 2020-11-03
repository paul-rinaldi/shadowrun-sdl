export type LifestyleAction = { type: 'SET_LIFESTYLE_ACTION', payload: string};

export const setLifestyle = (newLifestyle: string): LifestyleAction => ({
    type: 'SET_LIFESTYLE_ACTION',
    payload: newLifestyle
});
