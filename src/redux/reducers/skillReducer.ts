import { Skills } from "../../models/playerModels";
import { initialState } from "../store";
import { SkillAction } from "../actions/skillActions";

export const skillReducer = (state: Skills = initialState.skills, action: SkillAction): Skills => {
    switch (action.type) {
        case 'INC_SKILL_ACTION': {
            return changeSkill(action.payload.type, action.payload.index, 1, state);
        }
        case 'DEC_SKILL_ACTION': {
            return changeSkill(action.payload.type, action.payload.index, -1, state);
        }
        default: {
            return state;
        }
    }
}

const changeSkill = (type: string, index: number, delta: number, oldSkills: Skills): Skills => {
    let skills = {
        ...oldSkills
    };
    switch (type.toLowerCase()) {
        case 'combat':
            skills.combat[index].rating += delta;
            break;
        case 'physical':
            skills.physical[index].rating += delta;
            break;
        case 'social':
            skills.social[index].rating += delta;
            break;
        case 'magical':
            skills.magical[index].rating += delta;
            break;
        case 'resonance':
            skills.resonance[index].rating += delta;
            break;
        case 'technical':
            skills.technical[index].rating += delta;
            break;
        case 'vehicle':
            skills.vehicle[index].rating += delta;
            break;
    }
    return skills;
}