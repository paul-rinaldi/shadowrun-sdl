import { ILog } from "../../models/playerModels";

type NewLogAction = { type: 'New_Log_Action', payload: ILog }
type SetLogAction = { type: 'SET_LOG_ACTION', payload: ILog[] }

export type LogAction = NewLogAction | SetLogAction;

export const makeLog = (adjustment: number, reason: string, reasonType: string, time: Date): LogAction => {
    return ({
        type: 'New_Log_Action',
        payload: { adjustment, reason, reasonType, time }
    });
}

export const setLog = (collection: ILog[]): LogAction => ({
    type: 'SET_LOG_ACTION',
    payload: collection
})
