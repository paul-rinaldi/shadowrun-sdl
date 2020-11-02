import { IQualities, IQuality } from '../../models/playerModels';

type AdjustQualityAction = { type: "ADJUST_QUALITY_ACTION", payload: { qName: string, karmaAdjust: number, rating: number, max: number, notes: string, type: string } };
type RemoveQualityAction = { type: 'REMOVE_QUALITY_ACTION', payload: { type: string, index: number} };
type SetQualitiesAction = { type: 'SET_QUALITIES_ACTION', payload: IQualities};
type AddQualityAction = { type: 'ADD_QUALITY_ACTION', payload: {quality: IQuality, isPositive: boolean } };

export type QualityAction = AdjustQualityAction | RemoveQualityAction | SetQualitiesAction | AddQualityAction;

export const adjustQuality = (qName: string, karmaAdjust: number, rating: number, max: number, notes: string, type: string): QualityAction => {
    return ({
        type: "ADJUST_QUALITY_ACTION",
        payload: {qName, karmaAdjust, rating, max, notes, type}
    });
}

export const addQuality = (qName: string, karma: number, rating: number, max: number, notes: string, positive: boolean): AddQualityAction => ({
    type: 'ADD_QUALITY_ACTION',
    payload: {
        quality: {
            qName: qName,
            karma: karma,
            rating: rating,
            max: max,
            notes: notes
        },
        isPositive: positive
    }
});

export const removeQuality = (type: string, index: number): QualityAction => ({
    type: "REMOVE_QUALITY_ACTION",
    payload: {type, index}
});

export const setQualities = (qualities: IQualities): SetQualitiesAction => ({
    type: 'SET_QUALITIES_ACTION',
    payload: qualities
});