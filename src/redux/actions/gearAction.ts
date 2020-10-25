import { Armor, Gear, Melee, Ranged } from '../../models/playerModels';

type SetArmorAction = { type: 'SET_ARMOR_ACTION', payload: Armor[] }
type SetMeleeAction = { type: 'SET_MELEE_ACTION', payload: Melee[] }
type SetRangedAction = { type: 'SET_RANGED_ACTION', payload: Ranged[] }
type SetGearAction = { type: 'SET_GEAR_ACTION', payload: Gear}

type AddMeleeAction = { type: 'ADD_MELEE_ACTION', payload: Melee}
type AddRangedAction = { type: 'ADD_RANGED_ACTION', payload: Ranged}
type AddArmorAction = { type: 'ADD_ARMOR_ACTION', payload: Armor}

export type GearAction = SetArmorAction | SetMeleeAction | SetRangedAction | SetGearAction |
    AddMeleeAction | AddArmorAction | AddRangedAction;


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

export const setGear = (gear: Gear): SetGearAction => ({
    type: 'SET_GEAR_ACTION',
    payload: gear
});

export const addMelee = (melee: Melee): AddMeleeAction => ({
    type: 'ADD_MELEE_ACTION',
    payload: melee
});

export const addRaned = (ranged: Ranged): AddRangedAction => ({
    type: 'ADD_RANGED_ACTION',
    payload: ranged
});

export const addArmor = (armor: Armor): AddArmorAction => ({
    type: 'ADD_ARMOR_ACTION',
    payload: armor
});