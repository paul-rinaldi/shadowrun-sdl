import { LifeStyleAction } from "../actions/lifestyleActions";
import { initialState } from "../initialState";

export const lifestyleReducer = (state: string = initialState.lifestyle, action: LifeStyleAction) => {
    switch (action.type) {
        case 'SET_LIFESTYLE_ACTION': return action.payload;
        default: return state;
    }
}