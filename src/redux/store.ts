import { combineReducers, createStore } from 'redux';
import { ICharacter } from '../models/playerModels';
import { IUploadModel } from '../models/uploadModels';
import { karmaReducer } from './reducers/karmaReducer';
import { logReducer } from './reducers/logReducer';
import { nuyenReducer } from './reducers/nuyenReducer';
import { skillReducer } from './reducers/skillReducer';
import { uploadReducer } from "./reducers/uploadReducer";
import * as InitialCharacter from '../InitialState/InitialCharacter.json';

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
        currentEdge: edgeReducer,
        conditionMonitor: conditionReducer,
        personal: personalReducer,
        attributes: attributeReducer,
        img: imageReducer,
        initiative: initiativeReducer,
        armor: armorReducer,
        lifeStyle: lifestyleReducer,
        ID: idReducer,
        skills: skillReducer,
        knowledgeSkills, knowledgeSkillsReducer,
        qualities: qualitiesReducer,
        augmentations: augmentationReducer,
        RitPrepRitComplex: ritPrepRitComplexReducer,
        cyberdeck: cyberDeckReducer,
        gear: gearReducer,
        log: logReducer,
    }),
    uploading: uploadReducer
});

export const store = createStore(rootReducer);
export const initialState = {
    name: InitialCharacter.name,
    metatype: InitialCharacter.metatype,
    money: InitialCharacter.money,
    karma: InitialCharacter.karma,
    currentEdge: InitialCharacter.currentEdge,
    conditionMonitor: InitialCharacter.conditionMonitor,
    personal: InitialCharacter.personal,
    attributes: InitialCharacter.attributes,
    img: InitialCharacter.img,
    initiative: InitialCharacter.initiative,
    armor: InitialCharacter.armor,
    lifestyle: InitialCharacter.lifestyle,
    ID: InitialCharacter.ID,
    skills: InitialCharacter.skills,
    knowledgeSkills: InitialCharacter.knowledgeSkills,
    qualities: InitialCharacter.qualities,
    augmentations: InitialCharacter.augmentations,
    RitPrepRitComplex: InitialCharacter.RitPrepRitComplex,
    cyberdeck: InitialCharacter.cyberdeck,
    gear: InitialCharacter.gear,
    log: InitialCharacter.log
} as unknown as ICharacter;