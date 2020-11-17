import { KarmaAction } from "../actions/karmaActions";
import { initialState } from '../initialState';

export const karmaReducer = (state: number = initialState.karma, action: KarmaAction) => {
    switch (action.type) {
        case 'ADJUST_KARMA_ACTION': return state + action.payload;
        case 'SET_KARMA_ACTION': return action.payload;
        default: return state;
    }
}
