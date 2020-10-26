import { IQualities } from "../../models/playerModels";
import { initialState } from "../initialState";
import { QualityAction } from "../actions/qualityActions";

export const qualityReducer = (state: IQualities = initialState.qualities, action: QualityAction): IQualities => {
    switch (action.type) {
        case "ADJUST_QUALITY_ACTION": {
            switch (action.payload.type.toLocaleLowerCase()) {
                case 'positive': 
                    return { ...state, 
                        positive: [...state.positive, {
                            qName: action.payload.qName,
                            karma: action.payload.karmaAdjust,
                            rating: action.payload.rating,
                            max: action.payload.max,
                            notes: action.payload.notes
                        }]};
                case 'negative':
                    return { ...state,
                        negative: [...state.negative, {
                            qName: action.payload.qName,
                            karma: action.payload.karmaAdjust,
                            rating: action.payload.rating,
                            max: action.payload.max,
                            notes: action.payload.notes
                        }]};
                default:
                    return state;
            }
        }
        case 'REMOVE_QUALITY_ACTION': {
            return removeQualities(action.payload.type, action.payload.index, state);
        }
        case 'SET_QUALITIES_ACTION': {
            return action.payload;
        }
        default: {
            return state;
        }
    }
}

const removeQualities = (type: string, index: number, oldQualities: IQualities) => {
    let qualities = {
        ...oldQualities
    };

    switch(type.toLowerCase()){
        case "positive": 
            qualities.positive.splice(index, 1);
            break;
        case "negative": 
            qualities.negative.splice(index, 1);
            break;
    }
    return qualities;
}