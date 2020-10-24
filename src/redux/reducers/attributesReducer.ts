import { IAttributes } from '../../models/playerModels';
import { initialState } from '../initialState';
import {AttributeAction, IActionPayload} from '../actions/attributeAction';

export const attributesReducer = (state: IAttributes = initialState.attributes, action: AttributeAction): IAttributes => {
    const { min, max, delta } = isIActionPayload(action) ? action.payload as IActionPayload : {min: 0, max: 0, delta: 0};
    switch (action.type) {
        case 'BOD_ACTION':
            return min <= state.BOD + delta && max >= state.BOD + delta? {...state, BOD: state.BOD + delta} : state;
        case 'AGI_ACTION':
            return min <= state.AGI + delta && max >= state.AGI + delta? {...state, AGI: state.AGI + delta} : state;
        case 'REA_ACTION':
            return min <= state.REA + delta && max >= state.REA + delta? {...state, REA: state.REA + delta} : state;
        case 'STR_ACTION':
            return min <= state.STR + delta && max >= state.REA + delta? {...state, REA: state.REA + delta} : state;
        case 'WIL_ACTION':
            return min <= state.WIL + delta && max >= state.WIL + delta? {...state, WIL: state.WIL + delta} : state;
        case 'LOG_ACTION':
            return min <= state.LOG + delta && max >= state.LOG + delta? {...state, LOG: state.LOG + delta} : state;
        case 'INT_ACTION':
            return min <= state.INT + delta && max >= state.INT + delta? {...state, INT: state.INT + delta} : state;
        case 'CHA_ACTION':
            return min <= state.CHA + delta && max >= state.CHA + delta? {...state, CHA: state.CHA + delta} : state;
        case 'EDG_ACTION':
            return min <= state.EDG + delta && max >= state.EDG + delta? {...state, EDG: state.EDG + delta} : state;
        case 'MAG_ACTION':
            return min <= state.MAG + delta && max >= state.MAG + delta? {...state, MAG: state.MAG + delta} : state;
        case 'RES_ACTION':
            return min <= state.RES + delta && max >= state.RES + delta? {...state, RES: state.RES + delta} : state;
        case 'SET_ACTIONS': return action.payload;
        case 'ESS_ACTION':{
            let newESS = state.ESS + action.payload.delta;
            if (newESS < action.payload.min || newESS > action.payload.max) {
                return state;
            } else { return {...state, ESS: newESS}}
        }
        case 'EMPTY_ACTION':
        default: return state;
    }
}

function isIActionPayload(obj: any | IActionPayload): obj is IActionPayload {
    return (obj as IActionPayload).delta !== undefined;
}