import { IAttributes, ISkills } from "../../models/playerModels"

type BODAction = { type: 'BOD_ACTION', payload: number }
type AGIAction = { type: 'AGI_ACTION', payload: number }
type REAAction = { type: 'REA_ACTION', payload: number }
type STRAction = { type: 'STR_ACTION', payload: number }
type WILAction = { type: 'WIL_ACTION', payload: number }
type LOGAction = { type: 'LOG_ACTION', payload: number }
type INTAction = { type: 'INT_ACTION', payload: number }
type CHAAction = { type: 'CHA_ACTION', payload: number }
type EDGAction = { type: 'EDG_ACTION', payload: number }
type ESSAction = { type: 'ESS_ACTION', payload: number }
type MAGAction = { type: 'MAG_ACTION', payload: number }
type RESAction = { type: 'RES_ACTION', payload: number }
type SetActions = { type: 'SET_ACTIONS', payload: IAttributes }

export type AttributeAction = BODAction | AGIAction | REAAction | STRAction | WILAction | LOGAction |
    INTAction | CHAAction | EDGAction | ESSAction | MAGAction | RESAction | SetActions;

export const setAttributes = (value: IAttributes): AttributeAction => ({
    type: 'SET_ACTIONS',
    payload: value
});
