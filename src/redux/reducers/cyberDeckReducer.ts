import { Cyberdeck } from '../../models/playerModels';
import { CyberDeckAction } from '../actions/cyberDeckActions';
import { initialState } from '../initialState';

export const cyberDeckReducer = (state: Cyberdeck = initialState.cyberdeck, action: CyberDeckAction): Cyberdeck => {
    switch(action.type) {
        case 'SET_CYBERDECK_ACTION':
            return action.payload;
        case 'SET_CYBERDECK_MODEL_ACTION':
            return { ...state, model: action.payload };
        case 'SET_CYBERDECK_ATTACK_ACTION':
            return { ...state, attack: action.payload };
        case 'SET_CYBERDECK_SLEAZE_ACTION':
            return { ...state, sleaze: action.payload };
        case 'SET_CYBERDECK_DEVICE_RATING_ACTION':
            return { ...state, deviceRating: action.payload };
        case 'SET_CYBERDECK_DATA_PROCESSING_ACTION':
            return { ...state, dataProcessing: action.payload };
        // case 'SET_CYBERDECK_DEVICE_RATING_ACTION':
        //     return { ...state, deviceRating: action.payload };
        case 'SET_CYBERDECK_PROGRAMS_ACTION':
            return { ...state, programs: action.payload };
        case 'SET_CYBERDECK_CONDITION_ACTION':
            return { ...state, condition: action.payload };
        default:
            return state;
    }
}
