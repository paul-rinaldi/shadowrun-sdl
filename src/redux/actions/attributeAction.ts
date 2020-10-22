import { IAttributes, ISkills } from "../../models/playerModels"

export interface IActionPayload {
    delta: number,
    min: number,
    max: number
}

type BODAction = { type: 'BOD_ACTION', payload: IActionPayload }
type AGIAction = { type: 'AGI_ACTION', payload: IActionPayload }
type REAAction = { type: 'REA_ACTION', payload: IActionPayload }
type STRAction = { type: 'STR_ACTION', payload: IActionPayload }
type WILAction = { type: 'WIL_ACTION', payload: IActionPayload }
type LOGAction = { type: 'LOG_ACTION', payload: IActionPayload }
type INTAction = { type: 'INT_ACTION', payload: IActionPayload }
type CHAAction = { type: 'CHA_ACTION', payload: IActionPayload }
type EDGAction = { type: 'EDG_ACTION', payload: IActionPayload }
type ESSAction = { type: 'ESS_ACTION', payload: IActionPayload }
type MAGAction = { type: 'MAG_ACTION', payload: IActionPayload }
type RESAction = { type: 'RES_ACTION', payload: IActionPayload }
type EmptyAction = {type: "EMPTY_ACTION", payload: IActionPayload}
type SetActions = { type: 'SET_ACTIONS', payload: IAttributes }
type GenericAttributeAction = BODAction | AGIAction | REAAction | STRAction | WILAction | LOGAction |
    INTAction | CHAAction | EDGAction | MAGAction | RESAction | SetActions | EmptyAction;

export type AttributeAction = GenericAttributeAction | ESSAction;

export const setAttributes = (value: IAttributes): AttributeAction => ({
    type: 'SET_ACTIONS',
    payload: value
});

export const setESS = (increment: number, min: number, max: number): ESSAction => {
    let newESS = increment;
    newESS = newESS * 10;
    newESS = Math.round(newESS);
    newESS = newESS / 10;
    return {
        type: "ESS_ACTION",
        payload: { delta: newESS, min, max }
    };
};

export const setAttribute = (attrStr: string, delta: number, min: number, max: number): GenericAttributeAction => {
    switch (attrStr.toUpperCase()) {
        case 'BOD': return { type: "BOD_ACTION", payload: { delta, min, max } };
        case 'AGI': return { type: "AGI_ACTION", payload: { delta, min, max } };
        case 'REA': return { type: "REA_ACTION", payload: { delta, min, max } };
        case 'STR': return { type: "STR_ACTION", payload: { delta, min, max } };
        case 'WIL': return { type: "WIL_ACTION", payload: { delta, min, max } };
        case 'LOG': return { type: "LOG_ACTION", payload: { delta, min, max } };
        case 'INT': return { type: "INT_ACTION", payload: { delta, min, max } };
        case 'CHA': return { type: "CHA_ACTION", payload: { delta, min, max } };
        case 'EDG': return { type: "EDG_ACTION", payload: { delta, min, max } };
        case 'MAG': return { type: "MAG_ACTION", payload: { delta, min, max } };
        case 'RES': return { type: "RES_ACTION", payload: { delta, min, max } };
        default: return { type: "EMPTY_ACTION", payload: { delta: 0, min: 0, max: 0} };
    }
}
