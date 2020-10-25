import {Qualities} from "../../models/playerModels";
import {initialState} from "../initialState";
import {adjustQuality, QualityAction} from "../actions/qualityActions";

export const qualityReducer = (state: Qualities = initialState.qualities, action: QualityAction): Qualities => {
    switch (action.type) {
        case "ADJUST_QUALITY_ACTION": {
            return adjustQualities(action.payload.qName, action.payload.karmaAdjust, action.payload.rating, action.payload.max, action.payload.notes, 
                action.payload.type, state);
        }
        case 'REMOVE_QUALITY_ACTION': {
            return removeQualities(action.payload.type, action.payload.index, state);
        }
        default: {
            return state;
        }
    }
}

const adjustQualities = (qName: string, karmaAdjust: number, rating: number, max: number, notes: string, type: string, oldQualities: Qualities) => {
    let qualities = {
        ...oldQualities
    };

    switch(type.toLowerCase()){
        case "positive":
            qualities.positive.push({
                qName: qName,
                karma: karmaAdjust,
                rating: rating,
                max: max,
                notes: notes
            })
        case "negative": 
            qualities.negative.push({
                qName: qName,
                karma: karmaAdjust,
                rating: rating,
                max: max,
                notes: notes
            })
    }
    return qualities;
}

const removeQualities = (type: string, index: number, oldQualities: Qualities) => {
    let qualities = {
        ...oldQualities
    };

    switch(type.toLowerCase()){
        case "positive": 
            qualities.positive.splice(index, 1);
        case "negative": 
            qualities.negative.splice(index, 1);
    }
    return qualities;
}