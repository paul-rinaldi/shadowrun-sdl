import { ICharacter, ILog } from "../../models/playerModels";
import { LogAction } from "../actions/logActions";
import { initialState } from '../store';

export const logReducer = (state: ILog[] = initialState.log, action: LogAction): ILog[] => {
    switch (action.type) {
        case 'New_Log_Action': {
           return [
            ...state,
            action.payload
           ]
        }
        default: {
            return state;
        }
    }
}
