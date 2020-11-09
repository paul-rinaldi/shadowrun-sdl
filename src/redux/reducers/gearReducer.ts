import { Gear } from "../../models/playerModels";
import { GearAction } from "../actions/gearAction";
import { initialState } from "../initialState";

export const gearReducer = (state: Gear = initialState.gear, action: GearAction): Gear => {
    switch (action.type) {
        case 'SET_ARMOR_ACTION': return { ...state, armor: action.payload };
        case 'SET_MELEE_ACTION': return { ...state, melee: action.payload };
        case 'SET_RANGED_ACTION': return { ...state, ranged: action.payload };
        case 'SET_GEAR_ACTION': return action.payload;
        case 'ADD_ARMOR_ACTION': return {...state, armor: [...state.armor, action.payload]};
        case 'ADD_MELEE_ACTION': return {...state, melee: [...state.melee, action.payload]};
        case 'ADD_RANGED_ACTION': return {...state, ranged: [...state.ranged, action.payload]};
        case 'REM_MELEE_ACTION': return {...state, melee: [ ...state.melee.slice(0, action.payload).concat(state.melee.slice(action.payload + 1, state.melee.length)) ] };
        case 'REM_RANGED_ACTION': return {...state, ranged: [ ...state.ranged.slice(0, action.payload).concat(state.ranged.slice(action.payload + 1, state.ranged.length)) ] };
        case 'REM_ARMOR_ACTION': return {...state, armor: [ ...state.armor.slice(0, action.payload).concat(state.armor.slice(action.payload + 1, state.armor.length)) ] };
        case 'TOG_EQUIP': return {...state, armor: [...state.armor.map((armor, i) => i === action.payload ? {...armor, equiped: !armor.equiped } : armor)]};
        //case 'REM_AMMO_ACTION': return {...state.ranged,}
        default: return state;
    }
}