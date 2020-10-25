import {KnowledgeSkills} from "../../models/playerModels";

// four types for increasing/descreasing/adding/setting knowledge skill actions
type IncreaseKSkillAction = { type: 'INC_KSKILL_ACTION', payload: { type: string, index: number } }
type DecreaseKSkillAction = { type: 'DEC_KSKILL_ACTION', payload: { type: string, index: number } }
type AddKSkillAction = {type: 'ADD_KSKILL', payload: {type: string, att: string, name: string, specialization: string}}
type SetKSkillsAction = { type: 'SET_KSKILLS_ACTION', payload: KnowledgeSkills}
type UpdateKSkillAction = { type: 'UPDATE_KSKILL_ACTION', payload: {type: string, index: number, adjustment: number}}

export type KnowledgeSkillsActions = IncreaseKSkillAction | DecreaseKSkillAction | AddKSkillAction | SetKSkillsAction | UpdateKSkillAction;

/**
 * Increases the knowledge skill
 * @param type - type of knowledge skill to update
 * @param index - index of the knowledge skill in the type array
 */
export const increaseKSkill = (type: string, index: number): KnowledgeSkillsActions => ({
    type: 'INC_KSKILL_ACTION',
    payload: {type, index}
});

/**
 * Decreases the knowledge skill
 * @param type - type of knowledge skill to update
 * @param index - index of the knowledge skill in the type array
 */
export const decreaseKSkill = (type: string, index: number): KnowledgeSkillsActions => ({
    type: 'DEC_KSKILL_ACTION',
    payload: {type, index}
});

/**
 * Adds the knowledge skill
 * @param type - type of the knowledge skill to update
 * @param att - attribute of the knowledge skill
 * @param name - name of the knowledge skill
 * @param specialization - specialization of the knowledge skill
 */
export const addKSkill = (type: string, att: string, name: string, specialization: string): KnowledgeSkillsActions => ({
    type: 'ADD_KSKILL',
    payload: {type, att, name, specialization}
});

export const updateKSkill = (type: string, index: number, adjustment: number): KnowledgeSkillsActions => ({
    type: 'UPDATE_KSKILL_ACTION',
    payload: {type, index, adjustment}
});

/**
 * Sets the knowledge skill
 * @param skills - skill to set
 */
export const setKSkill = (skills: KnowledgeSkills): KnowledgeSkillsActions => ({
    type: 'SET_KSKILLS_ACTION',
    payload: skills
});