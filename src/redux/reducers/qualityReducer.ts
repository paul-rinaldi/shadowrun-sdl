import { IQualities } from "../../models/playerModels";
import { initialState } from "../initialState";
import { QualityAction } from "../actions/qualityActions";

export const qualityReducer = (state: IQualities = initialState.qualities, action: QualityAction): IQualities => {
    switch (action.type) {
        case "ADJUST_QUALITY_ACTION": {
            switch (action.payload.type.toLocaleLowerCase()) {
                case 'positive':  
                    const posIndex = state.positive.findIndex(
                        element => element.qName === action.payload.qName);
                    if (posIndex < 0 || posIndex >= state.positive.length)
                        return state;
                    return { 
                        ...state, 
                        positive: [
                            ...state.positive.slice(0, posIndex)
                            .concat({
                                qName: action.payload.qName,
                                karma: action.payload.karmaAdjust,
                                rating: action.payload.rating,
                                max: action.payload.max,
                                notes: action.payload.notes
                            })
                            .concat(state.positive.slice(posIndex + 1, state.positive.length))]
                        };
                case 'negative':
                    const negIndex = state.negative.findIndex(
                        element => element.qName === action.payload.qName);
                    if (negIndex < 0 || negIndex >= state.negative.length)
                        return state;
                    return { 
                        ...state,
                        negative: [
                            ...state.negative.slice(0, negIndex)
                            .concat({
                                qName: action.payload.qName,
                                karma: action.payload.karmaAdjust,
                                rating: action.payload.rating,
                                max: action.payload.max,
                                notes: action.payload.notes
                            })
                            .concat(state.positive.slice(negIndex + 1, state.negative.length))
                        ]
                        };
                default:
                    return state;
            }
        }
        case 'ADD_QUALITY_ACTION':
            if (action.payload.isPositive) {
                return {
                    ...state,
                    positive: [...state.positive, action.payload.quality]
                }
            } else {
                return {
                    ...state,
                    negative: [...state.negative, action.payload.quality]
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