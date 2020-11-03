import { EdgeAction } from "../actions/edgeActions";
import { initialState } from "../initialState";

export const edgeReducer = (state: number = initialState.currentEdge, action: EdgeAction) => {
    switch (action.type) {
        case 'SET_EDGE_ACTION': return action.payload;
        default: return state;
    }
}