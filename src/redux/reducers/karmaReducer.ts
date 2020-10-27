import { ICharacter } from "../../models/playerModels";
import { KarmaAction } from "../actions/karmaActions";
import { initialState } from '../initialState';

export const karmaReducer = (state: ICharacter = initialState, action: KarmaAction) => {
    switch (action.type) {
        case 'ADJUST_KARMA_ACTION': return state.karma + action.payload;
        case 'SET_KARMA_ACTION': return action.payload;
        default: return state.karma;
    }
}
