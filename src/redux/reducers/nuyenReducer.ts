import { NuyenAction } from "../actions/nuyenActions";
import { initialState } from '../store';

export const nuyenReducer = (state: number = initialState.money, action: NuyenAction): number => {
    switch (action.type) {
        case 'ADJUST_NUYEN_ACTION': {
            return state + action.payload;
        }
        default: {
            return state;
        }
    }
}