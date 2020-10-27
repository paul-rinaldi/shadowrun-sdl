import { ICharacter } from "../../models/playerModels";
import { EdgeAction } from "../actions/edgeActions";
import { initialState } from "../initialState";

export const edgeReducer = (state: ICharacter = initialState, action: EdgeAction) => {
    switch (action.type) {
        case 'SET_EDGE_ACTION': return {...state, edge: action.payload};
        default: return state;
    }
}