import { Initiative } from '../../models/playerModels';
import { InitiativeAction } from '../actions/initiativeAction';
import { NameAction } from '../actions/nameActions';
import { initialState } from '../initialState';

export const initiativeReducer = (state: Initiative = initialState.initiative, action: InitiativeAction): Initiative => {
    switch(action.type) {
        case 'SET_INITIATIVE_ACTION':
            return action.payload;
        default:
            return state;
    }
}
