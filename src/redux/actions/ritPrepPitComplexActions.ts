import { RitPrepRitComplex } from "../../models/playerModels";

type SetRitPrepPitComplexAction = { type: 'SET_RITPREPPITCOMPLEX_ACTION', payload: RitPrepRitComplex };
type SetRitPrepPitComplexSpellsAction = { type: 'SET_RITPREPPITCOMPLEX_SPELL_ACTION', payload: string };
type SetRitPrepPitComplexComplexFormsAction = { type: 'SET_RITPREPPITCOMPLEX_COMPLEX_FORMS_ACTION', payload: string };
type SetRitPrepPitComplexSpritesAction = { type: 'SET_RITPREPPITCOMPLEX_SPRITES_ACTION', payload: string }
export type RitPrepPitComplexAction = SetRitPrepPitComplexAction | SetRitPrepPitComplexSpellsAction
    | SetRitPrepPitComplexComplexFormsAction | SetRitPrepPitComplexSpritesAction;

export const setRitPrepPitComplexAction = (newRitPrepComplex: RitPrepRitComplex): SetRitPrepPitComplexAction => ({
    type: 'SET_RITPREPPITCOMPLEX_ACTION',
    payload: newRitPrepComplex
});

export const setRitPrepPitComplexSpellsAction = (newSpells: string): SetRitPrepPitComplexSpellsAction => ({
    type: 'SET_RITPREPPITCOMPLEX_SPELL_ACTION',
    payload: newSpells
});

export const setRitPrepPitComplexComplexFormsAction = (newForms: string): SetRitPrepPitComplexComplexFormsAction => ({
    type: 'SET_RITPREPPITCOMPLEX_COMPLEX_FORMS_ACTION',
    payload: newForms
});

export const setRitPrepPitComplexSpritesAction = (newSprites: string): SetRitPrepPitComplexSpritesAction => ({
    type: 'SET_RITPREPPITCOMPLEX_SPRITES_ACTION',
    payload: newSprites
});
