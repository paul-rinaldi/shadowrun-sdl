import { IDAction } from '../actions/idAction';
import { initialState } from '../initialState';

export const idReducer = (state: string = initialState.ID, action: IDAction): string => {
    switch(action.type) {
        case 'SET_ID_ACTION':
            return action.payload;
        default:
            return state;
    }
}
