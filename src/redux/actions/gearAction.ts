import {Armor, Gear, IAttributes, Melee, Ranged, WeaponModes} from '../../models/playerModels';

type SetArmorAction = { type: 'SET_ARMOR_ACTION', payload: Armor[] }
type SetMeleeAction = { type: 'SET_MELEE_ACTION', payload: Melee[] }
type SetRangedAction = { type: 'SET_RANGED_ACTION', payload: Ranged[] }
type SetGearAction = { type: 'SET_GEAR_ACTION', payload: Gear}

type AddMeleeAction = { type: 'ADD_MELEE_ACTION', payload: Melee}
type AddRangedAction = { type: 'ADD_RANGED_ACTION', payload: Ranged}
type AddArmorAction = { type: 'ADD_ARMOR_ACTION', payload: Armor}

type RemoveMeleeAction = { type: 'REM_MELEE_ACTION', payload: number };
type RemoveRangedAction = { type: 'REM_RANGED_ACTION', payload: number };
type RemoveArmorAction = { type: 'REM_ARMOR_ACTION', payload: number };
// type RemoveAmmoAction = {type: 'REM_AMMO_ACTION', payload: {weapon: Ranged, newAmmo: number}};
// type ReduceWeaponCompAction = {type: 'RED_WEPCOMP_ACTION', payload: {weapon: Ranged, newRC: number}};

type ToggleEquipAction = { type: 'TOG_EQUIP', payload: number}

export type GearAction = 
    SetArmorAction | SetMeleeAction | SetRangedAction | SetGearAction |
    AddMeleeAction | AddArmorAction | AddRangedAction |
    RemoveMeleeAction | RemoveRangedAction | RemoveArmorAction | ToggleEquipAction;
    //| RemoveAmmoAction | ReduceWeaponCompAction| ToggleEquipAction;


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

export const addRanged = (ranged: Ranged): AddRangedAction => ({
    type: 'ADD_RANGED_ACTION',
    payload: ranged
});

export const addArmor = (armor: Armor): AddArmorAction => ({
    type: 'ADD_ARMOR_ACTION',
    payload: armor
});


export const remMelee = (index: number): RemoveMeleeAction => ({
    type: 'REM_MELEE_ACTION',
    payload: index
});

export const remArmor = (index: number): RemoveArmorAction => ({
    type: 'REM_ARMOR_ACTION',
    payload: index
});

export const remRanged = (index: number): RemoveRangedAction => ({
    type: 'REM_RANGED_ACTION',
    payload: index
});

export const toggleEquip = (index: number) : ToggleEquipAction => ({
    type: 'TOG_EQUIP',
    payload: index
});

// export const remAmmo = (weapon: Ranged, newAmmo: number) : RemoveAmmoAction => ({
//     type: "REM_AMMO_ACTION",
//     payload: {weapon, newAmmo}
// });
//
// export const remWepComp = (weapon: Ranged, newRC: number) : ReduceWeaponCompAction => ({
//     type: "RED_WEPCOMP_ACTION",
//     payload: {weapon, newRC}
// });