import {KnowledgeSkills} from "../../models/playerModels";

type IncreaseKSkillAction = { type: 'INC_KSKILL_ACTION', payload: { type: string, index: number } }
type DecreaseKSkillAction = { type: 'DEC_KSKILL_ACTION', payload: { type: string, index: number } }
type AddKSkillAction = {type: 'ADD_KSKILL', payload: {type: string, att: string, index: number, name: string, specialization: string,}}
type SetKSkillsAction = { type: 'SET_KSKILLS_ACTION', payload: KnowledgeSkills}


export type KnowledgeSkillsActions = IncreaseKSkillAction | DecreaseKSkillAction | AddKSkillAction | SetKSkillsAction;

export const increaseKSkill = (type: string, index: number): KnowledgeSkillsActions => ({
    type: 'INC_KSKILL_ACTION',
    payload: {type, index}
});

export const decreaseKSkill = (type: string, index: number): KnowledgeSkillsActions => ({
    type: 'DEC_KSKILL_ACTION',
    payload: {type, index}
});

export const addKSkill = (type: string, att: string, index: number, name: string, specialization: string): KnowledgeSkillsActions => ({
    type: 'ADD_KSKILL',
    payload: {type, att, index, name, specialization}
});

export const setKSkill = (skills: KnowledgeSkills): KnowledgeSkillsActions => ({
    type: 'SET_KSKILLS_ACTION',
    payload: skills
});