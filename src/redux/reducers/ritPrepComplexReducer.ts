import { RitPrepRitComplex } from '../../models/playerModels';
import { RitPrepPitComplexAction } from '../actions/ritPrepPitComplexActions';
import { initialState } from '../initialState';

export const ritPrepComplexReducer = (state: RitPrepRitComplex = initialState.RitPrepRitComplex, action: RitPrepPitComplexAction): RitPrepRitComplex => {
    switch(action.type) {
        case 'SET_RITPREPPITCOMPLEX_ACTION': return action.payload;
        case 'SET_RITPREPPITCOMPLEX_SPELL_ACTION': return { ...state, spells: action.payload };
        case 'SET_RITPREPPITCOMPLEX_SPRITES_ACTION': return { ...state, sprites: action.payload };
        default: return state;
    }
}