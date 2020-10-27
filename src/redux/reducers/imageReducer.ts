import { ICharacter } from "../../models/playerModels";
import { SetImageURL } from "../actions/imageActions";
import { initialState } from "../initialState";


export const imageReducer = (state: ICharacter = initialState, action: SetImageURL) => {
    switch (action.type) {
        case 'SET_IMAGE': return action.payload;
        default: return state.img;
    }
};