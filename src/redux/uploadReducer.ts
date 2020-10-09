import { IUploadModel } from "../models/uploadModels";
import { UploadAction } from "./uploadActions";

export const uploadReducer = (state: IUploadModel = initialState, action: UploadAction): IUploadModel => {
    switch(action.type) {
        case "SHOW_UPLOAD":
            return {
                ...state,
                choosingFile: action.payload
            }
        case "UPLOAD_PLAYER_JSON":
            return {
                ...state,
                playerJSON: action.payload
            }
        default:
            return state;
    }
}

const initialState = {
    choosingFile: false,
    playerJSON: ""
}