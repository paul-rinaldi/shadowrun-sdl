import { ICharacter } from "../../models/playerModels";
import { ArmorAction } from "../actions/armorActions";
import { initialState } from "../initialState";

export const armorReducer = (state: number = initialState.armor, action: ArmorAction) => {
    switch (action.type) {
        case 'SET_ARMOR_ACTION': return action.payload;
        default: return state;
    }
}