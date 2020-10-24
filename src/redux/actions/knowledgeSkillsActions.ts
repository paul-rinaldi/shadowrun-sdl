import {ISkills, KnowledgeSkills} from "../../models/playerModels";

type IncreaseKSkillAction = { type: 'INC_K_SKILL_ACTION', payload: { type: string, index: number } }
type DecreaseKSkillAction = { type: 'DEC_K_SKILL_ACTION', payload: { type: string, index: number } }
type SetKSkillsAction = { type: 'SET_K_SKILLS_ACTION', payload: KnowledgeSkills}
type AddKSkill = { type: 'ADD_K_SKILL', payload: {type: string, att: string}}

export type KnowledgeSkillsActions = IncreaseKSkillAction | DecreaseKSkillAction | SetKSkillsAction | AddSkill;

export const increaseKSkill = (type: string, index: number): KnowledgeSkillsActions => ({
    type: 'INC_K_SKILL_ACTION',
    payload: {type, index}
})

export const decreaseKSkill = (type: string, index: number): KnowledgeSkillsActions => ({
    type: 'DEC_K_SKILL_ACTION',
    payload: {type, index}
});

export const setKSkills = (skills: KnowledgeSkills): KnowledgeSkillsActions => ({
    type: 'SET_K_SKILLS_ACTION',
    payload: skills
});

export const addKSkill = (type: string, att: string): KnowledgeSkillsActions => ({
    type: 'ADD_K_SKILL',
    payload: {type, att}
});