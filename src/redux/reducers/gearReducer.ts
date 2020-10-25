import { Gear } from "../../models/playerModels";
import { GearAction } from "../actions/gearAction";
import { initialState } from "../initialState";

export const gearReducer = (action: GearAction, state: Gear = initialState.gear) => {
    switch (action.type) {
        case 'SET_ARMOR_ACTION': return { ...state, armor: action.payload };
        case 'SET_MELEE_ACTION': return { ...state, melee: action.payload };
        case 'SET_RANGED_ACTION': return { ...state, ranged: action.payload };
        case 'SET_GEAR_ACTION': return action.payload;
        case 'ADD_ARMOR_ACTION': return {...state, armor: [...state.armor, action.payload]};
        case 'ADD_MELEE_ACTION': return {...state, melee: [...state.melee, action.payload]};
        case 'ADD_RANGED_ACTION': return {...state, ranged: [...state.ranged, action.payload]};
        default: return state;
    }
}