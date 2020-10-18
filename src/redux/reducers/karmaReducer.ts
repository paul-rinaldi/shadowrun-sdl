import { ICharacter } from "../../models/playerModels";
import { KarmaAction } from "../actions/karmaActions";
import { initialState } from '../store';

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
