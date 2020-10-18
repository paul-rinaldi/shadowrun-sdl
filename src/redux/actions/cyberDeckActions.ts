import { Cyberdeck, Program } from "../../models/playerModels";

type SetCyberDeckAction = { type: 'SET_CYBERDECK_ACTION', payload: Cyberdeck };
type SetCyberDeckModelAction = { type: 'SET_CYBERDECK_MODEL_ACTION', payload: string };
type SetCyberDeckAttackAction = { type: 'SET_CYBERDECK_ATTACK_ACTION', payload: number };
type SetCyberDeckSleazeAction = { type: 'SET_CYBERDECK_SLEAZE_ACTION', payload: number };
type SetCyberDeckDeviceRatingAction = { type: 'SET_CYBERDECK_DEVICE_RATING_ACTION', payload: number };
type SetCyberDeckDataProcessingAction = { type: 'SET_CYBERDECK_DATA_PROCESSING_ACTION', payload: string };
type SetCyberDeckFirewallAction = { type: 'SET_CYBERDECK_FIREWALL_ACTION', payload: number };
type SetCyberDeckProgramsAction = { type: 'SET_CYBERDECK_PROGRAMS_ACTION', payload: Program[] };
type SetCyberDeckConditionAction = { type: 'SET_CYBERDECK_CONDITION_ACTION', payload: number };

export type CyberDeckAction = SetCyberDeckAction | SetCyberDeckModelAction | SetCyberDeckAttackAction | SetCyberDeckSleazeAction
    | SetCyberDeckDeviceRatingAction | SetCyberDeckDataProcessingAction | SetCyberDeckFirewallAction | SetCyberDeckProgramsAction
    | SetCyberDeckConditionAction;

export const setCyberDeck = (newDeck: Cyberdeck): SetCyberDeckAction => ({
    type: 'SET_CYBERDECK_ACTION',
    payload: newDeck
});

export const setCyberDeckModel = (newModel: string): SetCyberDeckModelAction => ({
    type: 'SET_CYBERDECK_MODEL_ACTION',
    payload: newModel
});

export const setCyberDeckAttack = (newAttack: number): SetCyberDeckAttackAction => ({
    type: 'SET_CYBERDECK_ATTACK_ACTION',
    payload: newAttack
});

export const setCyberDeckSkeaze = (newSleaze: number): SetCyberDeckSleazeAction => ({
    type: 'SET_CYBERDECK_SLEAZE_ACTION',
    payload: newSleaze
});

export const setCyberDeckDeviceRating = (newRating: number): SetCyberDeckDeviceRatingAction => ({
    type: 'SET_CYBERDECK_DEVICE_RATING_ACTION',
    payload: newRating
});

export const setCyberDeckDataProcessing = (newDataProcessing: string): SetCyberDeckDataProcessingAction => ({
    type: 'SET_CYBERDECK_DATA_PROCESSING_ACTION',
    payload: newDataProcessing
});

export const setCyberDeckFirewallAction = (newFirewall: number): SetCyberDeckFirewallAction => ({
    type: 'SET_CYBERDECK_FIREWALL_ACTION',
    payload: newFirewall
});

export const setCyberDeckProgramsAction = (newPrograms: Program[]): SetCyberDeckProgramsAction => ({
    type: 'SET_CYBERDECK_PROGRAMS_ACTION',
    payload: newPrograms
});

export const setCyberDeckConditionAction = (newCondition: number): SetCyberDeckConditionAction => ({
    type: 'SET_CYBERDECK_CONDITION_ACTION',
    payload: newCondition
});
