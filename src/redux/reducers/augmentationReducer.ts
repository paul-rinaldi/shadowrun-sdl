import { Augmentation } from '../../models/playerModels';
import { AugmentationAction } from '../actions/augmentationAction';
import { initialState } from '../initialState';

export const augmentationReducer = (state: Augmentation[] = initialState.augmentations, action: AugmentationAction): Augmentation[] => {
    switch(action.type) {
        case 'SET_AUGMENTATIONS_ACTION': return [...action.payload];
        default: return state;
    }
}