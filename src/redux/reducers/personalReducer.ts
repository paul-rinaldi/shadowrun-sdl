import { ICharacter } from "../../models/playerModels";
import { PersonalAction } from "../actions/personalActions";
import { initialState } from "../initialState";

export const personalReducer = (state: ICharacter = initialState, action: PersonalAction) => {
    switch (action.type) {
        case 'SET_PERSONAL_ACTION': return {...state, personal: action.payload};
        default: return state;
    }
}