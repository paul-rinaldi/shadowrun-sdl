import { ICharacter } from "../models/playerModels";

type FileUploadAction = {type: "UPLOAD_PLAYER_JSON", payload: string}
type ShowUploadAction = { type: "SHOW_UPLOAD", payload: boolean }

export type UploadAction = FileUploadAction | ShowUploadAction;

export const uploadPlayerJSON = (document: string): FileUploadAction => ({
    type: "UPLOAD_PLAYER_JSON",
    payload: document
});

export const showFileChooser = (): ShowUploadAction => ({
    type: "SHOW_UPLOAD",
    payload: true
});

export const hideFileChooser = (): ShowUploadAction => ({
    type: "SHOW_UPLOAD",
    payload: false
});
