import { ICharacter } from "../../models/playerModels";
import { setAttributes } from "./attributeAction";
import { setKarma } from "./karmaActions";
import { setLog } from './logActions';
import { setNuyen } from "./nuyenActions";
import { setSkills } from "./skillActions";
import { setName } from './nameActions';
import { setCyberDeck } from "./cyberDeckActions";
import { setRitPrepPitComplexAction } from "./ritPrepPitComplexActions";

export const uploadCharacter = (character: ICharacter) => {
    setName(character.name);
    setNuyen(character.money);
    setKarma(character.karma);
    setAttributes(character.attributes);
    setSkills(character.skills);
    setRitPrepPitComplexAction(character.RitPrepRitComplex);
    setCyberDeck(character.cyberdeck);
    setLog(character.log);
}