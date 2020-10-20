import { Gear } from "../../models/playerModels";
import { GearAction } from "../actions/gearAction";
import { initialState } from "../initialState";

export const gearReducer = (state: Gear = initialState.gear, action: GearAction) => {
    switch (action.type) {
        case 'SET_ARMOR_ACTION': return { ...state, armor: action.payload };
        case 'SET_MELEE_ACTION': return { ...state, melee: action.payload };
        case 'SET_RANGED_ACTION': return { ...state, ranged: action.payload }
        default: return state;
    }
}