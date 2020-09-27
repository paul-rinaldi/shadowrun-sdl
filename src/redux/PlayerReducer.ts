import { ICharacter } from "../models/playerModels";
import { Action } from "./actions";

export interface IShadowRunState {
    player: ICharacter | null;
}


export const playerReducer = (state: IShadowRunState = initialState, action: Action) => {
    switch(action.type) {
        case 'SET_PLAYER_NAME': {
            return {
                ...state,
                player: {
                    name: action.payload
                }
            };
        }
        default:
            return state;
    }
}

const initialState = {
    player: null
}