import * as InitialCharacter from '../InitialState/InitialCharacter.json';
import { ICharacter } from '../models/playerModels';

console.log("initial", InitialCharacter);

export const initialState: ICharacter = {
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
    ammo: InitialCharacter.ammo,
    log: Array.from(InitialCharacter.log, (log) => { return {...log, time: new Date(log.time)}})
};