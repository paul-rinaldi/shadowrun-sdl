import { Augmentation } from "../../models/playerModels";

type SetAugmentationsAction = { type: 'SET_AUGMENTATIONS_ACTION', payload: Augmentation[] };
export type AugmentationAction = SetAugmentationsAction;

export const setAugmentationDeck = (newDeck: Augmentation[]): AugmentationAction => ({
    type: 'SET_AUGMENTATIONS_ACTION',
    payload: newDeck
});