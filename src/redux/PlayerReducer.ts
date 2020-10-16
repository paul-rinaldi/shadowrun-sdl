
import { ICharacter } from "../models/playerModels";
import { PlayerAction } from "./playerActions";
import * as InitialCharacter from '../InitialState/InitialCharacter.json';

export const playerReducer = (state: ICharacter = initialState, action: PlayerAction): ICharacter => {
    switch(action.type) {
        case 'SET_PLAYER_NAME': {
            return {
                ...state,
                name: action.payload
            }
        }
        case "UPLOAD_CHARACTER": {
            return {
                ...action.payload
            }
        }
        default:
            return state;
    }
}

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