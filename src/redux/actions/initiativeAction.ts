import { Initiative } from "../../models/playerModels";
import { initialState } from "../initialState";

type SetInitiativeAction = { type: 'SET_INITIATIVE_ACTION', payload: Initiative }

export type InitiativeAction = SetInitiativeAction;

export const setInitiative = (state: Initiative = initialState.initiative): InitiativeAction => {
    return ({
        type: 'SET_INITIATIVE_ACTION',
        payload: state
    });
}
