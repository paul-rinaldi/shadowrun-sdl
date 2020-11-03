import { MetaTypeAction } from "../actions/metatypeActions";
import { initialState } from "../initialState";

export const metaTypeReducer = (state: string = initialState.metatype, action: MetaTypeAction) => {
    switch (action.type) {
        case 'SET_METATYPE_ACTION': return action.payload;
        default: return state;
    }
}