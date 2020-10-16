import { ICharacter } from "../models/playerModels";
import { LogAction } from "./logActions";
import { initialState } from './PlayerReducer';

export const logReducer = (state: ICharacter = initialState, action: LogAction): ICharacter => {
    switch (action.type) {
        case 'New_Log_Action': {
            return ({
                ...state,
                log: [
                    ...state.log, 
                    {
                        adjustment: action.payload.adjustment,
                        reason: action.payload.reason,
                        reasonType: action.payload.reasonType,
                        time: action.payload.time
                    }
                ]
            });
        }
        default: {
            return state;
        }
    }
}
