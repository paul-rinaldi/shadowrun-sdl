import { ICharacter } from "../../models/playerModels";
import { SetImageURL } from "../actions/imageActions";
import { initialState } from "../initialState";


export const imageReducer = (state: ICharacter = initialState, action: SetImageURL): ICharacter => {
    switch (action.type) {
        case 'SET_IMAGE': return {...state, img: action.payload };
        default: return state;
    }
};