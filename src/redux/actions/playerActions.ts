import { ICharacter } from "../models/playerModels";

export type CharacterAction = ChangePlayerNameAction;

type ChangePlayerNameAction = {type: "SET_PLAYER_NAME", payload: string}
type CharacterUploadAction = {type: "UPLOAD_CHARACTER", payload: ICharacter}

export type PlayerAction = ChangePlayerNameAction | CharacterUploadAction;

export const changeName = (newName: string): ChangePlayerNameAction => ({
    type: "SET_PLAYER_NAME",
    payload: newName
});

export const uploadCharacter = (character: ICharacter): CharacterUploadAction => ({
    type: "UPLOAD_CHARACTER",
    payload: character
});