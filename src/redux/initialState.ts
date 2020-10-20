import * as InitialCharacter from '../InitialState/InitialCharacter.json';
import { ICharacter } from '../models/playerModels';

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