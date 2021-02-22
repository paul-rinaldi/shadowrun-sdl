import { applyMiddleware, combineReducers, createStore } from 'redux';
import { createLogger } from "redux-logger";
import { composeWithDevTools } from 'redux-devtools-extension';
import { ICharacter } from '../models/playerModels';
import { IUploadModel } from '../models/uploadModels';
import { karmaReducer } from './reducers/karmaReducer';
import { knowledgeSkillReducer } from './reducers/knowledgeSkillsReducer';
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
import { ammoReducer } from './reducers/ammoReducer';
import { metaTypeReducer } from './reducers/metaTypeReducer';
import { idReducer } from './reducers/idReducer';
import { imageReducer } from './reducers/imageReducer';
import { qualityReducer } from './reducers/qualityReducer';
import { conditionReducer } from './reducers/conditionReducer';
import { edgeReducer } from './reducers/edgeReducer';
import { personalReducer } from './reducers/personalReducer';
import { armorReducer } from './reducers/armorReducer';
import { lifestyleReducer } from './reducers/lifestyleReducer';

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
        currentEdge: edgeReducer,
        conditionMonitor: conditionReducer,
        personal: personalReducer,
        attributes: attributesReducer,
        img: imageReducer,
        initiative: initiativeReducer,
        armor: armorReducer,
        lifestyle: lifestyleReducer,
        ID: idReducer,
        skills: skillReducer,
        knowledgeSkills: knowledgeSkillReducer,
        qualities: qualityReducer,
        augmentations: augmentationReducer,
        RitPrepRitComplex: ritPrepComplexReducer,
        cyberdeck: cyberDeckReducer,
        gear: gearReducer,
        ammo: ammoReducer,
        log: logReducer,
    }),
    uploading: uploadReducer
});

// /* eslint-disable no-underscore-dangle */
// const composeEnhancers =
//   typeof window === 'object' &&
//   (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
//   (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
//       // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
//     }) : compose;

// const enhancer = composeEnhancers(
//   applyMiddleware(logger),
//   // other store enhancers if any
// );
// /* eslint-enable */

//applyMiddleWare will be great for when we are trying to debug, it shows what states are being changed.
//look in dev tools on browser to see it in action.
export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(logger)));