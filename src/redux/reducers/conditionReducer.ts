import { ConditionMonitor } from "../../models/playerModels";
import { ConditionAction } from "../actions/conditionActions";
import { initialState } from "../initialState";

export const conditionReducer = (state: ConditionMonitor = initialState.conditionMonitor, action: ConditionAction) => {
    switch (action.type) {
        case 'SET_CONDITION_ACTION': return action.payload;
        default: return state;
    }
}