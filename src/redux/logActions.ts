type NewLogAction = { type: 'New_Log_Action', payload: { adjustment: number, reason: string, reasonType: string, time: Date } } 

export type LogAction = NewLogAction;

export const makeLog = (adjustment: number, reason: string, reasonType: string): NewLogAction => {
    const time = new Date();
    return ({
        type: 'New_Log_Action',
        payload: { adjustment, reason, reasonType, time }
    });
}
