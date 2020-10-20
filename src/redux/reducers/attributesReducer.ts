import { IAttributes } from '../../models/playerModels';
import { initialState } from '../initialState';
import { AttributeAction } from '../actions/attributeAction';

const { attributes: {
    BOD, AGI, REA, STR, WIL, LOG, INT, CHA, EDG, ESS, MAG, RES
} } = initialState;

export const attributesReducer = (state: IAttributes = initialState.attributes, action: AttributeAction): IAttributes => {
    switch (action.type) {
        case 'BOD_ACTION': return {...state, BOD: state.BOD + action.payload};
        case 'AGI_ACTION': return {...state, BOD: state.AGI + action.payload};
        case 'REA_ACTION': return {...state, BOD: state.REA + action.payload};
        case 'STR_ACTION': return {...state, BOD: state.STR + action.payload};
        case 'WIL_ACTION': return {...state, BOD: state.WIL + action.payload};
        case 'LOG_ACTION': return {...state, BOD: state.LOG + action.payload};
        case 'INT_ACTION': return {...state, BOD: state.INT + action.payload};
        case 'CHA_ACTION': return {...state, BOD: state.CHA + action.payload};
        case 'EDG_ACTION': return {...state, BOD: state.EDG + action.payload};
        case 'ESS_ACTION': return {...state, BOD: state.ESS + action.payload};
        case 'MAG_ACTION': return {...state, BOD: state.MAG + action.payload};
        case 'RES_ACTION': return {...state, BOD: state.RES + action.payload};
        case 'SET_ACTIONS': return action.payload;
        default: return state;
    }
}