import { IQualities } from '../../models/playerModels';

type AdjustQualityAction = { type: "ADJUST_QUALITY_ACTION", payload: { qName: string, karmaAdjust: number, rating: number, max: number, notes: string, type: string } };
type RemoveQualityAction = { type: 'REMOVE_QUALITY_ACTION', payload: { type: string, index: number} };
type SetQualitiesAction = { type: 'SET_QUALITIES_ACTION', payload: IQualities}

export type QualityAction = AdjustQualityAction | RemoveQualityAction | SetQualitiesAction;

export const adjustQuality = (qName: string, karmaAdjust: number, rating: number, max: number, notes: string, type: string): QualityAction => {
    return ({
        type: "ADJUST_QUALITY_ACTION",
        payload: {qName, karmaAdjust, rating, max, notes, type}
    });
}

export const removeQuality = (type: string, index: number): QualityAction => ({
    type: "REMOVE_QUALITY_ACTION",
    payload: {type, index}
});

export const setQualities = (qualities: IQualities): SetQualitiesAction => ({
    type: 'SET_QUALITIES_ACTION',
    payload: qualities
});