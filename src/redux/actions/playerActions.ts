import { ICharacter } from "../../models/playerModels";
import { setAttributes } from "./attributeAction";
import { setKarma } from "./karmaActions";
import { setLog } from './logActions';
import { setNuyen } from "./nuyenActions";
import { setKSkill} from "./knowledgeSkillsActions";
import { setSkills } from "./skillActions";
import { setName } from './nameActions';
import { setCyberDeck } from "./cyberDeckActions";
import { setRitPrepPitComplexAction } from "./ritPrepPitComplexActions";
import { setInitiative } from "./initiativeAction";
import { setAugmentationDeck } from "./augmentationAction";
import { setGear } from "./gearAction";
import { setID } from "./idAction";
import { setQualities } from "./qualityActions";

export const uploadCharacter = (character: ICharacter) => {
    setName(character.name);
    setNuyen(character.money);
    setKarma(character.karma);
    setAttributes(character.attributes);
    setInitiative(character.initiative);
    setID(character.ID);
    setSkills(character.skills);
    setKSkill(character.knowledgeSkills);
    setQualities(character.qualities);
    setAugmentationDeck(character.augmentations);
    setRitPrepPitComplexAction(character.RitPrepRitComplex);
    setCyberDeck(character.cyberdeck);
    setGear(character.gear);
    setLog(character.log);
}