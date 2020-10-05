import { combineReducers, createStore } from 'redux';
import { ICharacter } from '../models/playerModels';
import { IUploadModel } from '../models/uploadModels';
import { playerReducer } from "./PlayerReducer";
import { uploadReducer } from "./uploadReducer";

export interface IShadowRunState {
    player: ICharacter;
    uploading: IUploadModel;
}

export const rootReducer = combineReducers({
    player: playerReducer,
    uploading: uploadReducer
});

export const store = createStore(rootReducer);