export type CharacterAction = ChangePlayerNameAction;

type ChangePlayerNameAction = {type: "SET_PLAYER_NAME", payload: string}

export const changeName = (newName: string): ChangePlayerNameAction => ({
    type: "SET_PLAYER_NAME",
    payload: newName
});