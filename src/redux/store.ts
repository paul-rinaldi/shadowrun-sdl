import {applyMiddleware, combineReducers, createStore} from 'redux';
import {createLogger} from "redux-logger";
import { ICharacter } from '../models/playerModels';
import { IUploadModel } from '../models/uploadModels';
import { karmaReducer } from './reducers/karmaReducer';
import {knowledgeSkillsReducer} from './reducers/knowledgeSkillsReducer';
import { logReducer } from './reducers/logReducer';
import { nuyenReducer } from './reducers/nuyenReducer';
import { skillReducer } from './reducers/skillReducer';
import { uploadReducer } from "./reducers/uploadReducer";
import { attributesReducer } from './reducers/attributesReducer';
import { nameReducer } from './reducers/nameReducer';
import { initiativeReducer } from './reducers/initiativeReducer';
import { cyberDeckReducer } from './reducers/cyberDeckReducer';
import { augmentationReducer } from './reducers/augmentationReducer';
import { ritPrepComplexReducer } from './reducers/ritPrepComplexReducer';
import { gearReducer } from './reducers/gearReducer';
import { metaTypeReducer } from './reducers/metaTypeReducer';
import { idReducer } from './reducers/idReducer';

const logger = createLogger();

export interface IShadowRunState {
    player: ICharacter;
    uploading: IUploadModel;
}

export const rootReducer = combineReducers({
    player: combineReducers({
        name: nameReducer,
        metatype: metaTypeReducer,
        money: nuyenReducer,
        karma: karmaReducer,

        // currentEdge: edgeReducer,
        // conditionMonitor: conditionReducer,
        // personal: personalReducer,
        attributes: attributesReducer,
        // img: imageReducer,
        initiative: initiativeReducer,
        // armor: armorReducer,
        // lifeStyle: lifestyleReducer,
        ID: idReducer,
        skills: skillReducer,
        knowledgeSkills: knowledgeSkillsReducer,
        // qualities: qualitiesReducer,
        augmentations: augmentationReducer,
        RitPrepRitComplex: ritPrepComplexReducer,
        cyberdeck: cyberDeckReducer,
        gear: gearReducer,
        log: logReducer,
    }),
    uploading: uploadReducer
});
//applyMiddleWare will be great for when we are trying to debug, it shows what states are being changed.
//look in dev tools on browser to see it in action.
export const store = createStore(rootReducer, applyMiddleware(logger));