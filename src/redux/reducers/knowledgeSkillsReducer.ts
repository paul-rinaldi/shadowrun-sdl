import {KnowledgeSkills} from "../../models/playerModels";
import {initialState} from "../initialState";
import {KnowledgeSkillsActions} from "../actions/knowledgeSkillsActions";

export const knowledgeSkillReducer = (state: KnowledgeSkills = initialState.knowledgeSkills, action: KnowledgeSkillsActions): KnowledgeSkills => {
    switch (action.type) {
        case "INC_KSKILL_ACTION": {
            return changeSkill(action.payload.type, action.payload.index, 1, state);
        }
        case "DEC_KSKILL_ACTION": {
            return changeSkill(action.payload.type, action.payload.index, 1, state);
        }
        case "ADD_KSKILL": {
            return updateKnowledgeSkill(action.payload.type,  action.payload.index, action.payload.att, action.payload.name, action.payload.specialization,state);
        }
        case "SET_KSKILLS_ACTION": {
            return action.payload;
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
        case "street":
            skills.street[index].rating += delta;
            break;
        case "academic":
            skills.academic[index].rating += delta;
            break;
        case 'professional':
            skills.professional[index].rating += delta;
            break;
        case 'interests':
            skills.interests[index].rating += delta;
            break;
    }
    return skills;
};


const updateKnowledgeSkill = (type: string, index: number, att: string, name: string, specialization: string, oldSkills: KnowledgeSkills): KnowledgeSkills => {
    //Create a deep copy of the knowledgeSkills object
    const updatedKnowledgeSkills = {
        ...oldSkills
    };

    //Adjust the desired skill of the copy
    switch (type.toLowerCase()) {
        case "street":
            updatedKnowledgeSkills.street.push({
                name: name,
                rating: 1,
                attribute: att,
                specialization: specialization
            });
            break;
        case "academic":
            updatedKnowledgeSkills.academic.push({
                name: name,
                rating: 1,
                attribute: att,
                specialization: specialization
            });
            break;
        case 'professional':
            updatedKnowledgeSkills.professional.push({
                name: name,
                rating: 1,
                attribute: att,
                specialization: specialization
            });
            break;
        case 'interests':
            updatedKnowledgeSkills.interests.push({
                name: name,
                rating: 1,
                attribute: att,
                specialization: specialization
            });
            break;
    }
//Replace the current knowledgeSkills object with the updated copy
return updatedKnowledgeSkills;
}


