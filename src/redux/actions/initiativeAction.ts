import { Initiative } from "../../models/playerModels";

type SetInitiativeAction = { type: 'SET_INITIATIVE_ACTION', payload: Initiative }

export type InitiativeAction = SetInitiativeAction;

export const setInitiative = (initiative: Initiative): InitiativeAction => {
    return ({
        type: 'SET_INITIATIVE_ACTION',
        payload: initiative
    });
}
