import { ICharacter } from "../../models/playerModels";
import { setAttributes } from "./attributeAction";
import { setKarma } from "./karmaActions";
import { setLog } from './logActions';
import { setNuyen } from "./nuyenActions";
import { setSkills } from "./skillActions";
import { setName } from './nameActions';
import { setCyberDeck } from "./cyberDeckActions";

export const uploadCharacter = (character: ICharacter) => {
    setName(character.name);
    setNuyen(character.money);
    setKarma(character.karma);
    setAttributes(character.attributes);
    setSkills(character.skills);
    setCyberDeck(character.cyberdeck);
    setLog(character.log);
}