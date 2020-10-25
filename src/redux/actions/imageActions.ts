
export type SetImageURL = { type: "SET_IMAGE", payload: string}

export const setImage = (url: string): SetImageURL => ({
    type: 'SET_IMAGE',
    payload: url
});