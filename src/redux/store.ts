import { combineReducers, createStore } from 'redux';
import { ICharacter } from '../models/playerModels';
import { IUploadModel } from '../models/uploadModels';
import { karmaReducer } from './karmaReducer';
import { LogAction } from './logActions';
import { logReducer } from './logReducer';
import { playerReducer } from "./PlayerReducer";
import { skillReducer } from './skillReducer';
import { uploadReducer } from "./uploadReducer";

export interface IShadowRunState {
    player: ICharacter;
    uploading: IUploadModel;
}

export const rootReducer = combineReducers({
    player: playerReducer,
    uploading: uploadReducer,
    karma: karmaReducer,
    log: logReducer,
    skill: skillReducer
});

export const store = createStore(rootReducer);
