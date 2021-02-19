import { Ammo, Ranged, CharacterAmmo, RangedAmmo } from "../../models/playerModels";
import { AmmoAction } from "../actions/ammoAction";
import { initialState } from "../initialState";

const getAmmoFromName = (characterSet: CharacterAmmo[], ammoName: string): CharacterAmmo => {
    const foundAmmo = characterSet.filter((ammo: CharacterAmmo) => {
        return ammo.name === ammoName; 
    })[0];
    return foundAmmo;
}

export const ammoReducer = (state: Ammo = initialState.ammo, action: AmmoAction): Ammo => {
    switch (action.type) {
        case 'REM_AMMO_ACTION': {
          const newCharacterAmmo: CharacterAmmo = {...action.payload.characterAmmo, ammoType: action.payload.ammoType, amount: action.payload.newAmmo};
          
          let characterAmmoSet;
          switch (action.payload.ammoType) {
            case "throwing":
                characterAmmoSet = state.throwing;  
                break;
            case "arrows": 
                characterAmmoSet = state.arrows;  
                break;
            case "bolts": 
                characterAmmoSet = state.bolts;  
                break;
            case "darts": 
                characterAmmoSet = state.darts;  
                break;
            case "ballistic": 
                characterAmmoSet = state.ballistic;  
                break;
            case "grenades": 
                characterAmmoSet = state.grenades;  
                break;
            case "rockets":  
                characterAmmoSet = state.rockets;  
                break;
            default: 
                characterAmmoSet = state.throwing;
                break;
          }
          const newCharSet = characterAmmoSet.map((ammo) => {
            if (ammo.name === action.payload.characterAmmo.name) {
              return newCharacterAmmo;
            } else {
              return ammo;
            }
          })

          const lastAmmo: Ammo = {
            arrows: state.arrows, 
            throwing: state.throwing, 
            ballistic: state.ballistic, 
            bolts: state.bolts,
            darts: state.darts, 
            grenades: state.grenades, 
            rockets: state.rockets
          };

          switch (action.payload.ammoType) {
            case "throwing":
                lastAmmo.throwing = newCharSet;  
                break;
            case "arrows": 
                lastAmmo.arrows = newCharSet;  
                break;
            case "bolts": 
                lastAmmo.bolts = newCharSet;
                break;
            case "darts": 
                lastAmmo.darts = newCharSet;  
                break;
            case "ballistic": 
                lastAmmo.ballistic = newCharSet;  
                break;
            case "grenades": 
                lastAmmo.grenades = newCharSet;  
                break;
            case "rockets":  
                lastAmmo.rockets = newCharSet;  
                break;
            default: 
                lastAmmo.throwing = newCharSet;
                break;
          }
          return lastAmmo
        }
        case 'ADD_AMMO_ACTION': {
          const newCharacterAmmo: CharacterAmmo = {...action.payload.characterAmmo, ammoType: action.payload.ammoType, amount: action.payload.additionalAmmo};
          
          let characterAmmoSet: CharacterAmmo[];
          switch (action.payload.ammoType) {
            case "throwing":
                characterAmmoSet = state.throwing;
                newCharacterAmmo.amount += getAmmoFromName(state.throwing, action.payload.characterAmmo.name).amount;
                break;
            case "arrows":
                characterAmmoSet = state.arrows;
                newCharacterAmmo.amount += getAmmoFromName(state.arrows, action.payload.characterAmmo.name).amount;
                break;
            case "bolts":
                characterAmmoSet = state.bolts;
                newCharacterAmmo.amount += getAmmoFromName(state.bolts, action.payload.characterAmmo.name).amount;
                break;
            case "darts":
                characterAmmoSet = state.darts;
                newCharacterAmmo.amount += getAmmoFromName(state.darts, action.payload.characterAmmo.name).amount;
                break;
            case "ballistic":
                characterAmmoSet = state.ballistic;
                newCharacterAmmo.amount += getAmmoFromName(state.ballistic, action.payload.characterAmmo.name).amount;
                break;
            case "grenades":
                characterAmmoSet = state.grenades;
                newCharacterAmmo.amount += getAmmoFromName(state.grenades, action.payload.characterAmmo.name).amount;
                break;
            case "rockets":
                characterAmmoSet = state.rockets;
                newCharacterAmmo.amount += getAmmoFromName(state.rockets, action.payload.characterAmmo.name).amount;
                break;
            default:
                characterAmmoSet = state.throwing;
                newCharacterAmmo.amount += getAmmoFromName(state.throwing, action.payload.characterAmmo.name).amount;
                break;
          }
          const newCharSet = characterAmmoSet.map((ammo) => {
            if (ammo.name === action.payload.characterAmmo.name) {
              return newCharacterAmmo;
            } else {
              return ammo;
            }
          })

          const lastAmmo: Ammo = {
            arrows: state.arrows, 
            throwing: state.throwing, 
            ballistic: state.ballistic, 
            bolts: state.bolts,
            darts: state.darts, 
            grenades: state.grenades, 
            rockets: state.rockets
          };

          switch (action.payload.ammoType) {
            case "throwing":
                lastAmmo.throwing = newCharSet;  
                break;
            case "arrows": 
                lastAmmo.arrows = newCharSet;  
                break;
            case "bolts": 
                lastAmmo.bolts = newCharSet;
                break;
            case "darts": 
                lastAmmo.darts = newCharSet;  
                break;
            case "ballistic": 
                lastAmmo.ballistic = newCharSet;  
                break;
            case "grenades": 
                lastAmmo.grenades = newCharSet;  
                break;
            case "rockets":  
                lastAmmo.rockets = newCharSet;  
                break;
            default: lastAmmo.throwing = newCharSet;
                break;
          }
          return lastAmmo
        }
        default: return state;
    }
}