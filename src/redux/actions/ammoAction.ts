import { Ranged, CharacterAmmo, Ammo } from '../../models/playerModels';

type RemoveAmmoAction = {type: 'REM_AMMO_ACTION', payload: {characterAmmo: CharacterAmmo, ammoType: string, newAmmo: number}};
type AddAmmoAction = {type: 'ADD_AMMO_ACTION', payload: {characterAmmo: CharacterAmmo, ammoType: string, additionalAmmo: number}};

export type AmmoAction = 
    RemoveAmmoAction | AddAmmoAction;

export const remAmmo = (characterAmmo: CharacterAmmo, ammoType: string, newAmmo: number) : RemoveAmmoAction => ({
    type: "REM_AMMO_ACTION",
    payload: {characterAmmo, ammoType, newAmmo}
})

export const addAmmo = (characterAmmo: CharacterAmmo, ammoType: string, additionalAmmo: number) : AddAmmoAction => ({
    type: "ADD_AMMO_ACTION",
    payload: {characterAmmo, ammoType, additionalAmmo}
})