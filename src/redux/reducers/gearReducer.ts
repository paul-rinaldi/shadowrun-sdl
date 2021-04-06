import { Gear, Ranged } from "../../models/playerModels";
import {GearAction} from "../actions/gearAction";
import { initialState } from "../initialState";


export const gearReducer = (state: Gear = initialState.gear, action: GearAction): Gear => {
    switch (action.type) {
        case 'SET_ARMOR_ACTION': return { ...state, armor: action.payload };
        case 'SET_MELEE_ACTION': return { ...state, melee: action.payload };
        case 'SET_RANGED_ACTION': return { ...state, ranged: action.payload };
        case 'SET_GEAR_ACTION': return action.payload;
        case 'ADD_ARMOR_ACTION': return {...state, armor: [...state.armor, action.payload]};
        case 'ADD_MELEE_ACTION': return {...state, melee: [...state.melee, action.payload]};
        case 'ADD_RANGED_ACTION': return {...state, ranged: [...state.ranged, action.payload]};
        case 'REM_MELEE_ACTION': return {...state, melee: [ ...state.melee.slice(0, action.payload).concat(state.melee.slice(action.payload + 1, state.melee.length)) ] };
        case 'REM_RANGED_ACTION': return {...state, ranged: [ ...state.ranged.slice(0, action.payload).concat(state.ranged.slice(action.payload + 1, state.ranged.length)) ] };
        case 'REM_ARMOR_ACTION': return {...state, armor: [ ...state.armor.slice(0, action.payload).concat(state.armor.slice(action.payload + 1, state.armor.length)) ] };
        case 'ADD_ATTACHMENT_ACTION': return {...state, ranged: addAttachment(action.payload.index, action.payload.attachment, state.ranged)};
        case 'REM_ATTACHMENT_ACTION': return {...state, ranged: remAttachment(action.payload.index, action.payload.attachment, state.ranged)};
        case 'TOG_EQUIP': return {...state, armor: [...state.armor.map((armor, i) => i === action.payload ? {...armor, equiped: !armor.equiped } : armor)]};
        default: return state;
    }
}

const addAttachment  = (index: number, attachment: any, ranged: Ranged[]): Ranged[] => {
    let type = attachment.type;
    if(type.toLowerCase() === "top") {
        ranged[index].equippedMount.topAttachment = attachment;
    }
    else if(type.toLowerCase() === "under") {
        ranged[index].equippedMount.underAttachment = attachment;
    }
    else if(type.toLowerCase() === "barrel") {
        ranged[index].equippedMount.barrelAttachment = attachment;
    }

    ranged[index].RC += attachment.effect;
    return ranged;
}
const remAttachment = (index: number, attachment: any, ranged: Ranged[]): Ranged[] => {
    let type = attachment.type;
    if(type.toLowerCase() === "top") {
        ranged[index].equippedMount.topAttachment = null;
    }
    else if(type.toLowerCase() === "under") {
        ranged[index].equippedMount.underAttachment = null;
    }
    else if(type.toLowerCase() === "barrel") {
        ranged[index].equippedMount.barrelAttachment = null;
    }

    ranged[index].RC -= attachment.effect;
    return ranged;
}