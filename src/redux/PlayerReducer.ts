import { IArmor, IAttributeList, IAugmentation, ICharacter, IConditionMonitor, ICyberDeck, IGear, IInitiative, ILog, IMele, IProgram, IQuality, IRanged, IRitPrepRitComplex, ISkill } from "../models/playerModels";
import { CharacterAction } from "./playerActions";

export const playerReducer = (state: ICharacter = initialState, action: CharacterAction): ICharacter => {
    switch(action.type) {
        case 'SET_PLAYER_NAME': {
            return {
                ...state,
                name: action.payload
            };
        }
        default:
            return state;
    }
}

const initialState = {
    name: "Luigi",
    metatype: "Human",
    money: 10000,
    karma: 25,
    currentEdge: 2,
    conditionMonitor: { stun: -1, physical: -1 } as IConditionMonitor,
    personal: "I am Luigi.",
    attributes: {
        BOD: 2,
        AGI: 2,
        REA: 2,
        STR: 2,
        WIL: 2,
        LOG: 2,
        INT: 2,
        CHA: 2,
        EDG: 2,
        ESS: 2,
        MAG: 2,
        RES: 2
    } as IAttributeList,
    img: "",
    initiative: { initDice: 1 } as IInitiative,
    armor: 0,
    lifestyle: "Low (Safehouse, 3 mths), Middle (5 mths)",
    ID: "10 fake SINs (rating 4), 10 fake licenses (gun license, rating 4)",
    coreCombat: {
        armor: { name: "Armor Jacket", rating: "12" } as IArmor,
        ranged: {
            name: "Ares Crusader II",
            dam: "7P",
            acc: 5,
            AP: "",
            mode: "SS/BF",
            RC: 2,
            ammo: 40
        } as IRanged,
        mele: {
            name: "Katana",
            reach: 0,
            dam: "5 hp",
            acc: 2,
            ap: 2
        } as IMele,
    },
    skills: {
        combat: [] as ISkill[],
        physical: [] as ISkill[],
        social: [] as ISkill[],
        magical: [] as ISkill[],
        resonance: [] as ISkill[],
        technical: []  as ISkill[],
        vehicle: [] as ISkill[],
    },
    qualities: [] as IQuality[],
    augmentations: [] as IAugmentation[],
    RitPrepRitComplex: {
        spells: "Clout, Blast, Lightning Bolt, Stunball, Analyze Truth, "
        + "Clairaudience, Influence, Mind Probe, Heal, Improved Invisibility",
        complexForms: "Cleaner, Editor, Res spike",
        sprites: "Crack sprite 6, Fault sprite 6"
    } as IRitPrepRitComplex,
    cyberdeck: {
        model: "Hermes Chariot cyberdeck",
        attack: 1,
        sleaze: 6,
        deviceRating: 2,
        dataProcesing: 0,
        firewall: 7,
        programs: [] as IProgram[],
        condition: 3
    } as ICyberDeck,
    gear: {
        armor: [],
        mele: [],
        ranged: []
    } as IGear,
    log: [] as ILog[],
}