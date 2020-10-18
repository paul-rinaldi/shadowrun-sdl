import { ICharacter } from "../../models/playerModels";
import { setAttributes } from "./attributeAction";
import { setKarma } from "./karmaActions";
import { setLog } from './logActions';
import { setNuyen } from "./nuyenActions";
import { setSkills } from "./skillActions";

export const uploadCharacter = (character: ICharacter) => {
    setNuyen(character.money);
    setKarma(character.karma);
    setAttributes(character.attributes);
    setSkills(character.skills);
    setLog(character.log);
}