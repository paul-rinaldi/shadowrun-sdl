import { ICharacter } from "../../models/playerModels";
import { LifeStyleAction } from "../actions/lifestyleActions";
import { initialState } from "../initialState";

export const lifestyleReducer = (state: ICharacter = initialState, action: LifeStyleAction) => {
    switch (action.type) {
        case 'SET_LIFESTYLE_ACTION': return action.payload;
        default: return state.lifestyle;
    }
}