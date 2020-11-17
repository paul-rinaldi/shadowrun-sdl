import { NameAction } from '../actions/nameActions';
import { initialState } from '../initialState';

export const nameReducer = (state: string = initialState.name, action: NameAction): string => {
    switch(action.type) {
        case 'SET_NAME_ACTION':
            return action.payload;
        default:
            return state;
    }
}
