type FileUploadAction = {type: "UPLOAD_PLAYER", payload: string}
type ShowUploadAction = { type: "SHOW_UPLOAD", payload: boolean }

export type UploadAction = FileUploadAction | ShowUploadAction;

export const uploadPlayerJSON = (document: string): FileUploadAction => ({
    type: "UPLOAD_PLAYER",
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