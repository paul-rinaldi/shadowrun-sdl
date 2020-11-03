export type ArmorAction = { type: 'SET_ARMOR_ACTION', payload: number};

export const setArmorAction = (newArmor: number): ArmorAction => ({
    type: 'SET_ARMOR_ACTION',
    payload: newArmor
});
