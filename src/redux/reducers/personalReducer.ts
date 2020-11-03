import { PersonalAction } from "../actions/personalActions";
import { initialState } from "../initialState";

export const personalReducer = (state: string = initialState.personal, action: PersonalAction) => {
    switch (action.type) {
        case 'SET_PERSONAL_ACTION': return action.payload;
        default: return state;
    }
}