import { KnowledgeSkills } from "../../models/playerModels";
import { initialState } from "../initialState";
import { KnowledgeSkillsActions } from "../actions/knowledgeSkillsActions";

export const knowledgeSkillReducer = (state: KnowledgeSkills = initialState.knowledgeSkills, action: KnowledgeSkillsActions): KnowledgeSkills => {
    switch (action.type) {
        case 'INC_K_SKILL_ACTION': {
            return changeSkill(action.payload.type, action.payload.index, 1, state);
        }
        case 'DEC_K_SKILL_ACTION': {
            return changeSkill(action.payload.type, action.payload.index, -1, state);
        }
        case 'SET_K_SKILLS_ACTION': {
            return action.payload;
        }
        case 'ADD_K_SKILL': {
            return
        }
        default: {
            return state;
        }
    }
}

const changeSkill = (type: string, index: number, delta: number, oldSkills: KnowledgeSkills): KnowledgeSkills => {
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