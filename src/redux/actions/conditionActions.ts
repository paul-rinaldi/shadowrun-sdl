import { ConditionMonitor } from "../../models/playerModels";

export type ConditionAction = { type: 'SET_CONDITION_ACTION', payload: ConditionMonitor};

export const SetConditionAction = (conditionMonitor: ConditionMonitor): ConditionAction => ({
    type: 'SET_CONDITION_ACTION',
    payload: conditionMonitor
});
