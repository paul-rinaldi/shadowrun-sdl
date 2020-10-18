import { combineReducers, createStore } from 'redux';
import { ICharacter } from '../models/playerModels';
import { IUploadModel } from '../models/uploadModels';
import { karmaReducer } from './reducers/karmaReducer';
import { logReducer } from './reducers/logReducer';
import { nuyenReducer } from './reducers/nuyenReducer';
import { skillReducer } from './reducers/skillReducer';
import { uploadReducer } from "./reducers/uploadReducer";
import { attributesReducer } from './reducers/attributesReducer';
import { nameReducer } from './reducers/nameReducer';
import { initiativeReducer } from './reducers/initiativeReducer';
import { cyberDeckReducer } from './reducers/cyberDeckReducer';
import { augmentationReducer } from './reducers/augmentationReducer';

export interface IShadowRunState {
    player: ICharacter;
    uploading: IUploadModel;
}

export const rootReducer = combineReducers({
    player: combineReducers({
        name: nameReducer,
        // metatype: metaTypeReducer,
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
        // ID: idReducer,
        skills: skillReducer,
        // knowledgeSkills, knowledgeSkillsReducer,
        // qualities: qualitiesReducer,
        augmentations: augmentationReducer,
        // RitPrepRitComplex: ritPrepRitComplexReducer,
        cyberdeck: cyberDeckReducer,
        // gear: gearReducer,
        log: logReducer,
    }),
    uploading: uploadReducer
});

export const store = createStore(rootReducer);