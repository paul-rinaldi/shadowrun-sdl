import { ICharacter } from "../models/playerModels";
import { NuyenAction } from "./nuyenActions";
import { initialState } from './PlayerReducer';

export const nuyenReducer = (state: ICharacter = initialState, action: NuyenAction): ICharacter => {
    switch (action.type) {
        case 'ADJUST_NUYEN_ACTION': {
            return {
                ...state,
                money: state.money + action.payload
            }
        }
        default: {
            return state;
        }
    }
}