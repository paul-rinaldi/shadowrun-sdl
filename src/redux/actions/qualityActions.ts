import { makeLog } from './logActions';

type AdjustQualityAction = { type: "ADJUST_QUALITY_ACTION", payload: { qName: string, karmaAdjust: number, rating: number, max: number, notes: string, type: string } };
type RemoveQualityAction = { type: 'REMOVE_QUALITY_ACTION', payload: { type: string, index: number} };

export type QualityAction = AdjustQualityAction | RemoveQualityAction;

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