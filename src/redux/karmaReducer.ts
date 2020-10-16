import { ICharacter } from "../models/playerModels";
import { KarmaAction } from "./karmaActions";
import { initialState } from './PlayerReducer';

export const karmaReducer = (state: ICharacter = initialState, action: KarmaAction): ICharacter => {
    switch (action.type) {
        case 'ADJUST_KARMA_ACTION': {
            return {
                ...state,
                karma: state.karma + action.payload
            }
        }
        default: {
            return state;
        }
    }
}
