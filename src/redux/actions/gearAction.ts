import { Armor, Melee, Ranged } from '../../models/playerModels';

type SetArmorAction = { type: 'SET_ARMOR_ACTION', payload: Armor[] }
type SetMeleeAction = { type: 'SET_MELEE_ACTION', payload: Melee[] }
type SetRangedAction = { type: 'SET_RANGED_ACTION', payload: Ranged[] }

export type GearAction = SetArmorAction | SetMeleeAction | SetRangedAction;

export const setArmor = (armor: Armor[]): SetArmorAction => ({
    type: 'SET_ARMOR_ACTION',
    payload: armor
});

export const setMelee = (melee: Melee[]): SetMeleeAction => ({
    type: 'SET_MELEE_ACTION',
    payload: melee
});

export const setRanged = (ranged: Ranged[]): SetRangedAction => ({
    type: 'SET_RANGED_ACTION',
    payload: ranged
});